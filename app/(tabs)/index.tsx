import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { supabase } from '@/lib/supabase';

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
  const { colors } = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error && __DEV__) console.warn('Supabase session check:', error.message);
      if (__DEV__ && !error) console.log('Supabase connected, session:', session ? 'signed in' : 'anonymous');
    });
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <ScrollView className="flex-1">
        <View className="p-section">
          <View
            className="p-6 rounded-card shadow-card"
            style={{ backgroundColor: colors.primary }}
          >
            <Text style={{ color: colors.secondary }} className="text-2xl font-heading">
              Today's Bearing
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-base mt-2">
              Direction before speed
            </Text>
          </View>

          {/* Test Priority Colors */}
          <View className="mt-4 space-y-2">
            <View
              className="p-4 rounded-button"
              style={{ backgroundColor: colors.priority1 }}
            >
              <Text className="text-white">Priority 1 - High</Text>
            </View>
            <View
              className="p-4 rounded-button"
              style={{ backgroundColor: colors.priority2 }}
            >
              <Text className="text-white">Priority 2 - Medium</Text>
            </View>
            <View
              className="p-4 rounded-button"
              style={{ backgroundColor: colors.priority3 }}
            >
              <Text className="text-white">Priority 3 - Low</Text>
            </View>
          </View>

          <Text
            style={{ color: colors.textSecondary }}
            className="text-base italic text-center mt-6"
          >
            One meaningful win at a time.
          </Text>

          <Link href="/settings" className="mt-8 items-center">
            <Text style={{ color: colors.secondary }} className="text-base underline">
              Settings
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
