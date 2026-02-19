import { useNetInfo } from '@react-native-community/netinfo';

export interface NetworkStatus {
  /** Whether the device is connected to a network */
  isOnline: boolean;
  /** Whether internet is actually reachable (may be null during initial check) */
  isInternetReachable: boolean | null;
  /** Network connection type (wifi, cellular, etc.) */
  type: string | null;
}

/**
 * Hook that provides normalized network status information
 * Wraps @react-native-community/netinfo with a stable, typed interface
 * 
 * @returns Network status object with online state and connection details
 * 
 * @example
 * const { isOnline, isInternetReachable } = useNetworkStatus();
 * if (!isOnline) {
 *   // Show offline indicator
 * }
 */
export function useNetworkStatus(): NetworkStatus {
  const netInfo = useNetInfo();

  return {
    isOnline: netInfo.isConnected ?? true,
    isInternetReachable: netInfo.isInternetReachable,
    type: netInfo.type,
  };
}
