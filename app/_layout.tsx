import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeOverrideProvider } from '@/lib/ThemeOverrideContext';
import { useTheme } from '@/lib/theme';

/**
 * Root layout for TrueNorth application
 * Manages top-level navigation stack with screen groups for auth, tabs, focus, and settings
 */
function RootLayoutContent() {
  const { colors, isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
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
      <RootLayoutContent />
    </ThemeOverrideProvider>
  );
}
