import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

/**
 * Weekly Review – guided reflection on progress, wins, and failures.
 * Reached from Weekly Hub. (Figma design: /weekly/review)
 */
export default function WeeklyReviewScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <ScrollView className="flex-1 p-safe">
        <Text style={{ color: colors.textPrimary }} className="text-3xl font-heading">
          Weekly Review
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-sm mt-2">
          Contemplate your progress, wins, and failures. (Placeholder – to be built.)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
