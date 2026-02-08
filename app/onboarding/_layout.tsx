import { Stack } from 'expo-router';

/**
 * Layout for onboarding flow
 * Guides new users through initial setup
 */
export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F5F7FA' },
      }}
    />
  );
}
