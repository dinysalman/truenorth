import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Root layout for TrueNorth application
 * Manages top-level navigation stack with screen groups for auth, tabs, focus, and settings
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F7FA' }, // Soft Mist from design tokens
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
            headerStyle: { backgroundColor: '#1E2A38' },
            headerTintColor: '#F5F7FA',
          }} 
        />
      </Stack>
    </>
  );
}
