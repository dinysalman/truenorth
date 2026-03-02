import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

/**
 * Weekly Planning – set your heading for the upcoming week.
 * Reached from Review & Plan hub.
 *
 * Product note (docs/ui-product-notes.md): On phone use two lists, not kanban —
 * (1) Horizon (inbox/backlog), (2) Upcoming week. No column layout.
 *
 * Features (from PRD):
 * - Selection of 1–3 Weekly Headings (focus areas)
 * - Pulling tasks from Monthly Missions and Horizon
 * - Light Eisenhower filtering (Important vs Urgent)
 */
export default function WeeklyPlanningScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <ScrollView className="flex-1 p-safe">
        <Text style={{ color: colors.textPrimary }} className="text-3xl font-heading">
          Weekly Planning
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-sm mt-2">
          Two lists: Horizon and Upcoming week. (Placeholder – to be built.)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
