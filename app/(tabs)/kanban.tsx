import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

/**
 * Steps – manage tasks between Today, This week, and Horizon.
 *
 * Product note (docs/ui-product-notes.md): No kanban columns on phone.
 * Single "This week" view:
 * - Top: list of tasks for this week; each has actions "Move to Today" | "Move to Horizon".
 * - Bottom: list of tasks from the week that are Done; each has "Move back to Today".
 *
 * Columns (data model): Horizon, This week, Today, Done — but UI is two lists
 * (this week + done this week) with move actions, not column switcher.
 *
 * TODO: Fetch steps from database (this week + done this week)
 * TODO: Two-list layout: this week (top), done this week (bottom)
 * TODO: Per-task actions: Move to Today, Move to Horizon (top list); Move back to Today (bottom list)
 * TODO: Add step creation (e.g. into Horizon or This week)
 */
export default function KanbanScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <View className="flex-1 p-safe">
        <Text style={{ color: colors.textPrimary }} className="text-3xl font-heading">
          Personal Kanban
        </Text>
      </View>
    </SafeAreaView>
  );
}
