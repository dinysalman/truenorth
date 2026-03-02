/**
 * Component tests for SignupScreen
 * Covers: UI rendering, validation, disabled state, success and error feedback.
 */
import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const mockSignUp = jest.fn();
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: (...args: unknown[]) => mockSignUp(...args),
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

import SignupScreen from '@/app/(auth)/signup';

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSignUp.mockResolvedValue({ error: null });
  });

  it('should render signup form fields and actions', () => {
    const { getByText, getByLabelText } = render(<SignupScreen />);

    expect(getByText('Create account')).toBeTruthy();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByLabelText('Confirm password')).toBeTruthy();
    expect(getByLabelText('Create account button')).toBeTruthy();
    expect(getByText('Password requirements:')).toBeTruthy();
    expect(getByText('Log in')).toBeTruthy();
  });

  it('should disable create account button by default', () => {
    const { getByLabelText } = render(<SignupScreen />);
    const createAccountButton = getByLabelText('Create account button');
    expect(createAccountButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('should show mismatch error when passwords differ', () => {
    const { getByLabelText, getByText } = render(<SignupScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'Password1');
    fireEvent.changeText(getByLabelText('Confirm password'), 'Password2');
    fireEvent(getByLabelText('Confirm password'), 'blur');

    expect(getByText('Passwords do not match')).toBeTruthy();
  });

  it('should keep create account button disabled for weak password', () => {
    const { getByLabelText } = render(<SignupScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'weak');
    fireEvent.changeText(getByLabelText('Confirm password'), 'weak');

    const createAccountButton = getByLabelText('Create account button');
    expect(createAccountButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('should call supabase signUp and show success message', async () => {
    const { getByLabelText, getByText } = render(<SignupScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'Password1');
    fireEvent.changeText(getByLabelText('Confirm password'), 'Password1');
    fireEvent.press(getByLabelText('Create account button'));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Password1',
      });
      expect(getByText('Check your email to confirm')).toBeTruthy();
    });
  });

  it('should show mapped error when account already exists', async () => {
    mockSignUp.mockResolvedValue({
      error: { message: 'User already registered' },
    });

    const { getByLabelText, getByText } = render(<SignupScreen />);

    fireEvent.changeText(getByLabelText('Email'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'Password1');
    fireEvent.changeText(getByLabelText('Confirm password'), 'Password1');
    fireEvent.press(getByLabelText('Create account button'));

    await waitFor(() => {
      expect(getByText('An account with this email already exists.')).toBeTruthy();
    });
  });
});
