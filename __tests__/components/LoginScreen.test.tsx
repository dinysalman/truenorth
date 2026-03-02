/**
 * Component tests for LoginScreen
 * Covers: UI rendering, email validation, button disabled state, error display
 */
import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const mockSignInWithPassword = jest.fn();
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: (...args: unknown[]) => mockSignInWithPassword(...args),
    },
  },
}));

jest.mock('react-native-svg', () => {
  const RN = require('react-native');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) =>
      RN.createElement ? RN.createElement('View', props) : null,
    Svg: 'Svg',
    Path: 'Path',
    Rect: 'Rect',
    Defs: 'Defs',
    LinearGradient: 'LinearGradient',
    Stop: 'Stop',
  };
});

jest.mock('lucide-react-native', () => ({
  Eye: 'Eye',
  EyeOff: 'EyeOff',
}));

import LoginScreen from '@/app/(auth)/login';

// Grab the stable mock created by jest.setup.js
const mockRouter = jest.requireMock('expo-router').useRouter();

describe('LoginScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockSignInWithPassword.mockResolvedValue({ error: null });
  });

  it('should render the hero title and subtitle', () => {
    const { getByText } = render(<LoginScreen />);

    expect(getByText('TrueNorth')).toBeTruthy();
    expect(getByText('Direction before speed.')).toBeTruthy();
  });

  it('should render email and password inputs', () => {
    const { getByLabelText } = render(<LoginScreen />);

    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
  });

  it('should render Sign In, Apple, and Google buttons', () => {
    const { getByLabelText } = render(<LoginScreen />);

    expect(getByLabelText('Sign in')).toBeTruthy();
    expect(getByLabelText('Sign in with Apple')).toBeTruthy();
    expect(getByLabelText('Sign in with Google')).toBeTruthy();
  });

  it('should render Forgot password and Create one links', () => {
    const { getByText } = render(<LoginScreen />);

    expect(getByText('Forgot password?')).toBeTruthy();
    expect(getByText('Create one')).toBeTruthy();
  });

  it('should render Terms of Use and Privacy Policy', () => {
    const { getByText } = render(<LoginScreen />);

    expect(getByText('Terms of Use')).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();
  });

  it('should disable Sign In button until email and password are valid', () => {
    const { getByLabelText } = render(<LoginScreen />);

    const signInButton = getByLabelText('Sign in');
    expect(signInButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('should enable Sign In button when valid email and password are entered', () => {
    const { getByLabelText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');

    const signInButton = getByLabelText('Sign in');
    expect(signInButton.props.accessibilityState?.disabled).toBe(false);
  });

  it('should show email validation error on blur with invalid email', () => {
    const { getByLabelText, getByText } = render(<LoginScreen />);

    const emailInput = getByLabelText('Email');
    fireEvent.changeText(emailInput, 'notanemail');
    fireEvent(emailInput, 'blur');

    expect(getByText('Enter a valid email address')).toBeTruthy();
  });

  it('should not show email error when email is empty on blur', () => {
    const { getByLabelText, queryByText } = render(<LoginScreen />);

    const emailInput = getByLabelText('Email');
    fireEvent.changeText(emailInput, '');
    fireEvent(emailInput, 'blur');

    expect(queryByText('Enter a valid email address')).toBeNull();
  });

  it('should call supabase signInWithPassword on submit', async () => {
    const { getByLabelText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.press(getByLabelText('Sign in'));

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });

  it('should navigate to tabs on successful sign in', async () => {
    const { getByLabelText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.press(getByLabelText('Sign in'));

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('should display error message on auth failure', async () => {
    mockSignInWithPassword.mockResolvedValue({
      error: { message: 'Invalid login credentials' },
    });

    const { getByLabelText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'wrongpass');
    fireEvent.press(getByLabelText('Sign in'));

    await waitFor(() => {
      expect(getByText('Invalid login credentials')).toBeTruthy();
    });
  });

  it('should display generic error on unexpected exception', async () => {
    mockSignInWithPassword.mockRejectedValue(new Error('Network error'));

    const { getByLabelText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.press(getByLabelText('Sign in'));

    await waitFor(() => {
      expect(getByText('Something went wrong. Please try again.')).toBeTruthy();
    });
  });
});
