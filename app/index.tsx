import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';

/**
 * Entry point for TrueNorth app.
 * Redirects users based on authentication state: authenticated → tabs, unauthenticated → login.
 * Shows a loading state while the initial session is resolved.
 */
export default function Index() {
  const { session, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.background }}
        edges={['top', 'bottom']}
        accessibilityLabel="Loading"
        accessibilityRole="progressbar"
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text
          style={{ color: colors.textSecondary }}
          className="text-base mt-4"
        >
          Loading…
        </Text>
      </SafeAreaView>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
