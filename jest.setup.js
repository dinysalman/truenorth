/**
 * Jest setup file - runs before all tests
 * Configures global test environment, mocks, and MSW server
 */

// Set up globals for Expo's winter runtime
global.import = { meta: { url: '' } };
global.__ExpoImportMetaRegistry = new Map();

// Polyfill structuredClone if not available (Node < 17)
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// Import built-in matchers from React Native Testing Library (v12.4+)
// Note: In v12.4+, matchers are included by default, no need to import extend-expect
// If using older version, use: import '@testing-library/jest-native/extend-expect';

// MSW server lifecycle
let server;
try {
  const mswServer = require('./__tests__/setup/mocks/server');
  server = mswServer.server;
  
  beforeAll(() => {
    // Start MSW server before all tests
    server.listen({ onUnhandledRequest: 'warn' });
  });
  
  afterEach(() => {
    // Reset handlers after each test to ensure test isolation
    server.resetHandlers();
  });
  
  afterAll(() => {
    // Clean up and close server after all tests
    server.close();
  });
} catch (error) {
  console.warn('MSW server could not be loaded:', error.message);
}

// Mock react-native-reanimated to avoid "Reanimated 2 failed to create a worklet" errors
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo-router navigation functions
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
  useSegments: () => [],
  usePathname: () => '/',
  Link: 'Link',
  Redirect: 'Redirect',
  Stack: {
    Screen: 'Screen',
  },
}));

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true, isInternetReachable: true })),
}));

// Mock expo modules to avoid import.meta issues
jest.mock('expo', () => ({
  ...jest.requireActual('expo'),
}));

// Mock NativeWind's CSS interop to avoid SafeAreaContext wrapping issues
jest.mock('react-native-css-interop');

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
}));

// Mock theme hooks
jest.mock('@/lib/theme', () => ({
  useTheme: () => ({
    colors: {
      northBlue: '#2D3F52',
      compassGold: '#D4A017',
      softMist: '#F5F7FA',
      evergreen: '#2E7D32',
      priority1: '#E53935',
      priority2: '#FB8C00',
      priority3: '#43A047',
      primary: '#2D3F52',
      secondary: '#D4A017',
      background: '#F5F7FA',
      surface: '#FFFFFF',
      textPrimary: '#2D3F52',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      tabBarBorder: '#374151',
    },
    isDark: false,
  }),
  themeLight: {
    colors: {
      northBlue: '#2D3F52',
      compassGold: '#D4A017',
      softMist: '#F5F7FA',
      evergreen: '#2E7D32',
      priority1: '#E53935',
      priority2: '#FB8C00',
      priority3: '#43A047',
      primary: '#2D3F52',
      secondary: '#D4A017',
      background: '#F5F7FA',
      surface: '#FFFFFF',
      textPrimary: '#2D3F52',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      tabBarBorder: '#374151',
    },
  },
  themeDark: {
    colors: {
      northBlue: '#5B7A9E',
      compassGold: '#E4B84A',
      softMist: '#1A1D21',
      evergreen: '#4CAF50',
      priority1: '#EF5350',
      priority2: '#FFB74D',
      priority3: '#66BB6A',
      primary: '#5B7A9E',
      secondary: '#E4B84A',
      background: '#121418',
      surface: '#1A1D21',
      textPrimary: '#F5F7FA',
      textSecondary: '#9CA3AF',
      textMuted: '#6B7280',
      tabBarBorder: '#374151',
    },
  },
  getTheme: (colorScheme) => colorScheme === 'dark' ? require('@/lib/theme').themeDark : require('@/lib/theme').themeLight,
}));

jest.mock('@/lib/ThemeOverrideContext', () => ({
  useThemeOverride: () => ({ override: null, setOverride: jest.fn() }),
  ThemeOverrideProvider: ({ children }) => children,
}));

// Suppress specific console warnings that are expected in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    // Suppress known React Native test warnings
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    // Suppress known warnings
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Animated: `useNativeDriver`')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
