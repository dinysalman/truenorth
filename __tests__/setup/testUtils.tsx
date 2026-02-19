/**
 * Custom test utilities for TrueNorth
 * Provides renderWithProviders that wraps components with necessary providers
 */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Creates a test-specific QueryClient with optimized settings for testing
 * - Disables retries to make tests fail fast
 * - Sets staleTime to Infinity to prevent automatic refetching
 * - Disables refetchOnWindowFocus for predictable test behavior
 * - Suppresses error logging to keep test output clean
 * 
 * @returns A configured QueryClient instance for testing
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
  });
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

/**
 * Custom render function that wraps components with necessary providers
 * - Automatically wraps in QueryClientProvider with test-optimized client
 * - Returns both the render result and the queryClient for assertions
 * 
 * @param ui - The React component to render
 * @param options - Optional render options and custom queryClient
 * @returns Render result plus the queryClient instance
 * 
 * @example
 * const { getByText, queryClient } = renderWithProviders(<MyComponent />);
 * expect(getByText('Hello')).toBeTruthy();
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: RenderWithProvidersOptions
) {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options || {};

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

// Re-export everything from React Native Testing Library
export * from '@testing-library/react-native';
