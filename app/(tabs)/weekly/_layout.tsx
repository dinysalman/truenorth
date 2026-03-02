import { Stack } from 'expo-router';
import { useTheme } from '@/lib/theme';

/**
 * Weekly stack: Hub (index) → Review, Planning.
 * Matches Figma design: /weekly = Hub with cards to Review and Planning.
 */
export default function WeeklyLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Weekly',
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ title: 'Weekly Review' }} />
      <Stack.Screen name="planning" options={{ title: 'Weekly Planning' }} />
    </Stack>
  );
}
