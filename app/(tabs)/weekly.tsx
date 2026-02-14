import { View, Text, ScrollView } from 'react-native';

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
  return (
    <ScrollView className="flex-1 bg-softMist p-safe">
      <Text className="text-3xl font-heading text-textPrimary">
        Weekly Planning
      </Text>
    </ScrollView>
  );
}
