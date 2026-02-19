import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ThemeOverrideProvider } from '@/lib/ThemeOverrideContext';
import { useTheme } from '@/lib/theme';
import {
  createAppQueryClient,
  createPersister,
  persistOptions,
  initializeOnlineManager,
} from '@/lib/api/queryClient';
import { NetworkStatusIndicator } from '@/components/system/NetworkStatusIndicator';

const queryClient = createAppQueryClient();
const persister = createPersister();

/**
 * Root layout for TrueNorth application
 * Manages top-level navigation stack with screen groups for auth, tabs, focus, and settings
 */
function RootLayoutContent() {
  const { colors, isDark } = useTheme();

  useEffect(() => {
    initializeOnlineManager();
  }, []);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NetworkStatusIndicator />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="focus" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Settings',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.softMist,
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeOverrideProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ ...persistOptions, persister }}
        onSuccess={() => {
          queryClient.resumePausedMutations();
        }}
      >
        <RootLayoutContent />
      </PersistQueryClientProvider>
    </ThemeOverrideProvider>
  );
}
