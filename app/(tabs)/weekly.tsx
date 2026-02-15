import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

/**
 * Weekly Planning - Weekly review and heading selection
 *
 * Purpose: Decide what matters this week
 *
 * Features:
 * - Guided Weekly Review
 * - Selection of 1–3 Weekly Headings (focus areas)
 * - Pulling tasks from Monthly Missions and Horizon
 * - Light Eisenhower filtering (Important vs Urgent)
 *
 * TODO: Implement Weekly Review checklist
 * TODO: Add Weekly Headings selection interface
 * TODO: Show tasks from Monthly Missions
 * TODO: Show tasks from Horizon for triage
 * TODO: Add Eisenhower matrix filter
 * TODO: Add "Plan This Week" button to populate This Week column
 */
export default function WeeklyPlanningScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <ScrollView className="flex-1 p-safe">
        <Text style={{ color: colors.textPrimary }} className="text-3xl font-heading">
          Weekly Planning
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
