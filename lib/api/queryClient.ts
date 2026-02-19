import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { onlineManager } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

/**
 * Default query configuration constants for TrueNorth
 * Aligned with TASK-008 requirements and offline-first philosophy
 */
export const QUERY_DEFAULTS = {
  /** Time before data is considered stale and eligible for refetch (5 minutes) */
  STALE_TIME_MS: 5 * 60 * 1000,
  /** Time before unused data is garbage collected (24 hours) */
  GC_TIME_MS: 24 * 60 * 60 * 1000,
  /** Number of retry attempts for failed queries */
  RETRY_COUNT: 3,
} as const;

/**
 * Creates a configured QueryClient instance with TrueNorth defaults
 * @returns QueryClient configured for offline-first operation
 */
export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_DEFAULTS.STALE_TIME_MS,
        gcTime: QUERY_DEFAULTS.GC_TIME_MS,
        retry: QUERY_DEFAULTS.RETRY_COUNT,
        networkMode: 'offlineFirst',
      },
      mutations: {
        retry: QUERY_DEFAULTS.RETRY_COUNT,
        networkMode: 'offlineFirst',
      },
    },
  });
}

/**
 * Creates an AsyncStorage-based persister for React Query cache
 * @returns Persister instance for use with PersistQueryClientProvider
 */
export function createPersister() {
  return createAsyncStoragePersister({
    storage: AsyncStorage,
  });
}

/**
 * Persistence configuration for React Query
 * Includes cache versioning (buster) to invalidate on schema changes
 */
export const persistOptions = {
  maxAge: QUERY_DEFAULTS.GC_TIME_MS,
  buster: 'v1',
};

/**
 * Initializes network status monitoring for React Query
 * Wires NetInfo to TanStack Query's onlineManager
 */
export function initializeOnlineManager(): void {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(Boolean(state.isConnected));
    });
  });
}
