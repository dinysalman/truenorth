import { Stack } from 'expo-router';
import { useTheme } from '@/lib/theme';

/**
 * Layout for authentication flow
 * Groups login, signup, and password recovery screens
 */
export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
