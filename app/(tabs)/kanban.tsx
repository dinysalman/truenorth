import { View, Text, ScrollView } from 'react-native';

/**
 * Personal Kanban - Task management board
 *
 * Columns:
 * - Horizon (Inbox / GTD capture)
 * - This Week
 * - Today (prepared the night before)
 * - Done
 *
 * Each Step includes:
 * - Title
 * - Priority (1 / 2 / 3)
 * - Max time (Parkinson's Law)
 * - Linked North Star / Goal
 * - Tag (Work, Family, Health, Learning, YouTube)
 *
 * Rules:
 * - Max 1 Priority-1 per day
 * - Soft limits on Today and This Week
 * - Drag & drop between columns
 *
 * TODO: Implement horizontal scrolling for columns
 * TODO: Fetch steps from database grouped by status
 * TODO: Add drag & drop functionality
 * TODO: Add step creation button
 * TODO: Implement step detail modal
 * TODO: Add filters by tag
 */
export default function KanbanScreen() {
  return (
    <View className="flex-1 bg-softMist p-safe">
      <Text className="text-3xl font-heading text-textPrimary">
        Personal Kanban
      </Text>
    </View>
  );
}
