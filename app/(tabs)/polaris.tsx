import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme';

/**
 * Polaris - Goals & Missions hierarchy
 *
 * Purpose: Maintain direction and alignment
 *
 * Features:
 * - Life Areas (North Stars)
 * - Quarterly Polaris Goals
 * - Monthly Missions
 * - Visual hierarchy and drill-down
 * - Clear linkage from daily steps upward
 *
 * Hierarchy:
 * North Star (Life Area)
 * → Polaris Goal (Quarterly Direction)
 * → Monthly Mission (Theme)
 * → Weekly Heading (Focus)
 * → Daily Steps (Tasks)
 *
 * TODO: Fetch North Stars and Goals from database
 * TODO: Implement drill-down navigation
 * TODO: Add goal creation flow
 * TODO: Add progress visualization
 * TODO: Show linked steps for each goal
 */
export default function PolarisScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <ScrollView className="flex-1 p-safe">
        <Text style={{ color: colors.textPrimary }} className="text-3xl font-heading">
          Polaris
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
