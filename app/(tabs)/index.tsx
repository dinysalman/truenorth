import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
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
 * Product note (docs/ui-product-notes.md): Add defer actions per task —
 * "Move to This week" and "Move to Horizon" so user can defer from today without going to Steps.
 *
 * TODO: Fetch today's tasks from database
 * TODO: Display True Step prominently
 * TODO: Show remaining tasks for today
 * TODO: Add defer to This week / Horizon on each task
 * TODO: Add Focus Mode button for each task
 * TODO: Add calm, encouraging messages
 */
export default function TodaysBearingScreen() {
  const { colors } = useTheme();
  const router = useRouter();

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
          {/* Date and title – primary text in Deep North Blue */}
          <Text style={{ color: colors.deepNorthBlue }} className="text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Text style={{ color: colors.deepNorthBlue }} className="text-2xl font-heading mt-1">
            Today's Bearing
          </Text>

          {/* True Step card – Robe Blue background (calm, guiding) */}
          <View
            className="mt-6 p-6 rounded-card shadow-card relative"
            style={{ backgroundColor: colors.robeBlue }}
          >
            <View
              className="absolute top-4 right-4 w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.compassGold }}
            />
            <Text
              style={{ color: colors.deepNorthBlue }}
              className="text-xs uppercase tracking-wide opacity-80"
            >
              True Step
            </Text>
            <Text
              style={{ color: colors.deepNorthBlue }}
              className="text-xl font-heading mt-2"
            >
              Finalize Q4 Strategy Deck
            </Text>
            <Text
              style={{ color: colors.deepNorthBlue }}
              className="text-sm mt-1 opacity-80"
            >
              60 min · Strategic Growth
            </Text>
          </View>

          {/* Secondary Steps */}
          <Text
            style={{ color: colors.deepNorthBlue }}
            className="text-base font-heading mt-8 mb-2"
          >
            Secondary Steps
          </Text>
          <View className="gap-2">
            <View
              className="p-4 rounded-card shadow-card flex-row items-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Text style={{ color: colors.textSecondary }} className="text-xs mr-2">
                P2
              </Text>
              <Text style={{ color: colors.deepNorthBlue }} className="text-base flex-1">
                Review Team Feedback
              </Text>
            </View>
            <View
              className="p-4 rounded-card shadow-card flex-row items-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Text style={{ color: colors.textSecondary }} className="text-xs mr-2">
                P3
              </Text>
              <Text style={{ color: colors.deepNorthBlue }} className="text-base flex-1">
                Update Weekly Roadmap
              </Text>
            </View>
          </View>

          {/* Start Focus – Deep North Blue primary button */}
          <Pressable
            onPress={() => router.push('/focus/placeholder')}
            className="mt-8 py-4 rounded-button items-center justify-center"
            style={{ backgroundColor: colors.deepNorthBlue }}
          >
            <Text className="text-white text-base font-heading">Start Focus</Text>
          </Pressable>
          <Text
            style={{ color: colors.deepNorthBlue }}
            className="text-sm text-center mt-3 opacity-80"
          >
            Focus on the direction, not the speed.
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
