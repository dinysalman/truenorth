import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAuth } from '@/lib/auth';

const mockGetSession = jest.fn();
const mockOnAuthStateChange = jest.fn();

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
        mockOnAuthStateChange(callback);
        return {
          data: {
            subscription: {
              unsubscribe: jest.fn(),
            },
          },
        };
      },
    },
  },
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return isLoading true initially then resolve to session null when getSession returns no session', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.session).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it('should return session and user when getSession returns a session', async () => {
    const mockUser = { id: 'user-1', email: 'test@example.com' };
    const mockSession = { user: mockUser, access_token: 'token' };
    mockGetSession.mockResolvedValue({ data: { session: mockSession }, error: null });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.session).toEqual(mockSession);
    expect(result.current.user).toEqual(mockUser);
  });

  it('should set error when getSession fails', async () => {
    mockGetSession.mockResolvedValue({
      data: { session: null },
      error: { message: 'Session error' },
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Session error');
    expect(result.current.session).toBeNull();
  });

  it('should update session when onAuthStateChange fires', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.session).toBeNull();

    const mockUser = { id: 'user-2', email: 'signed-in@example.com' };
    const newSession = { user: mockUser, access_token: 'new-token' };

    act(() => {
      const callback = mockOnAuthStateChange.mock.calls[0][0];
      callback('SIGNED_IN', newSession);
    });

    expect(result.current.session).toEqual(newSession);
    expect(result.current.user).toEqual(mockUser);
  });
});
