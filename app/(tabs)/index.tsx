import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';

/**
 * Today's Bearing - Home screen showing today's direction
 *
 * Displays:
 * - Today's date
 * - True Step (Priority 1 task)
 * - Priority 2 and 3 tasks for today
 * - Entry point to Focus Mode
 *
 * Design Philosophy:
 * - Show only tasks planned the night before
 * - No task creation or prioritization in the morning
 * - Calm, encouraging microcopy
 *
 * TODO: Fetch today's tasks from database
 * TODO: Display True Step prominently
 * TODO: Show remaining tasks for today
 * TODO: Add Focus Mode button for each task
 * TODO: Add calm, encouraging messages
 */
export default function TodaysBearingScreen() {
  return (
    <ScrollView className="flex-1 bg-softMist">
      <View className="p-section">
        <View className="bg-northBlue p-6 rounded-card shadow-card">
          <Text className="text-compassGold text-2xl font-heading">
            Today's Bearing
          </Text>
          <Text className="text-textSecondary text-base mt-2">
            Direction before speed
          </Text>
        </View>

        {/* Test Priority Colors */}
        <View className="mt-4 space-y-2">
          <View className="bg-priority1 p-4 rounded-button">
            <Text className="text-white">Priority 1 - High</Text>
          </View>
          <View className="bg-priority2 p-4 rounded-button">
            <Text className="text-white">Priority 2 - Medium</Text>
          </View>
          <View className="bg-priority3 p-4 rounded-button">
            <Text className="text-white">Priority 3 - Low</Text>
          </View>
        </View>

        <Text className="text-textSecondary text-base italic text-center mt-6">
          One meaningful win at a time.
        </Text>

        <Link href="/settings" className="mt-8 items-center">
          <Text className="text-compassGold text-base underline">
            Settings
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}
