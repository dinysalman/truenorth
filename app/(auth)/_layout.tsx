import { Stack } from 'expo-router';

/**
 * Layout for authentication flow
 * Groups login, signup, and password recovery screens
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F5F7FA' },
      }}
    />
  );
}
