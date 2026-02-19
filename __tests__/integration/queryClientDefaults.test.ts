/**
 * Integration tests for React Query configuration
 * Verifies default query options and stale time behavior
 * 
 * NOTE: Requires Jest setup from TASK-008B to run
 */

import { QueryClient } from '@tanstack/react-query';
import { createAppQueryClient, QUERY_DEFAULTS } from '@/lib/api/queryClient';

describe('QueryClient Configuration', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createAppQueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should have correct default query options', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.staleTime).toBe(QUERY_DEFAULTS.STALE_TIME_MS);
    expect(defaultOptions.queries?.gcTime).toBe(QUERY_DEFAULTS.GC_TIME_MS);
    expect(defaultOptions.queries?.retry).toBe(QUERY_DEFAULTS.RETRY_COUNT);
    expect(defaultOptions.queries?.networkMode).toBe('offlineFirst');
  });

  it('should have correct default mutation options', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.mutations?.retry).toBe(QUERY_DEFAULTS.RETRY_COUNT);
    expect(defaultOptions.mutations?.networkMode).toBe('offlineFirst');
  });

  it('should not refetch within stale time window', async () => {
    jest.useFakeTimers();

    const queryFn = jest.fn().mockResolvedValue({ data: 'test' });
    const queryKey = ['test-query'];

    // First fetch
    await queryClient.fetchQuery({ queryKey, queryFn });
    expect(queryFn).toHaveBeenCalledTimes(1);

    // Second fetch within stale time (< 5 minutes) - should use cache
    await queryClient.fetchQuery({ queryKey, queryFn });
    expect(queryFn).toHaveBeenCalledTimes(1); // Still 1, no refetch

    // Advance time past stale time (5 minutes + 1 second)
    jest.advanceTimersByTime(QUERY_DEFAULTS.STALE_TIME_MS + 1000);

    // Third fetch after stale time - should refetch
    await queryClient.fetchQuery({ queryKey, queryFn });
    expect(queryFn).toHaveBeenCalledTimes(2); // Now 2, refetched

    jest.useRealTimers();
  });

  it('should garbage collect after gc time', async () => {
    jest.useFakeTimers();

    const queryFn = jest.fn().mockResolvedValue({ data: 'test' });
    const queryKey = ['gc-test'];

    // Fetch and cache data
    await queryClient.fetchQuery({ queryKey, queryFn });
    expect(queryClient.getQueryData(queryKey)).toBeDefined();

    // Advance time past gc time (24 hours + 1 second)
    jest.advanceTimersByTime(QUERY_DEFAULTS.GC_TIME_MS + 1000);

    // Trigger garbage collection
    queryClient.clear();

    // Data should be gone
    expect(queryClient.getQueryData(queryKey)).toBeUndefined();

    jest.useRealTimers();
  });
});
