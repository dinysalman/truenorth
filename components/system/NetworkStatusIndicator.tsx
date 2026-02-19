import { View, Text } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';
import { useTheme } from '@/lib/theme';

/**
 * Calm, non-blocking network status indicator
 * Shows a subtle banner when offline, hidden when online
 * Follows TrueNorth's respectful UX philosophy (PRD §2, §7)
 */
export function NetworkStatusIndicator() {
  const { isOnline } = useNetworkStatus();
  const { colors } = useTheme();

  if (isOnline) {
    return null;
  }

  return (
    <View
      className="px-4 py-3 mx-4 mt-2 mb-1 rounded-lg bg-surface dark:bg-surfaceDark border border-textMuted/20 dark:border-textMutedDark/20"
      accessibilityLabel="Offline mode: showing saved data"
      accessibilityRole="alert"
      style={{ maxWidth: 768 }}
    >
      <View className="flex-row items-center gap-2">
        <WifiOff
          size={16}
          color={colors.textSecondary}
          accessibilityLabel=""
        />
        <Text className="text-sm text-textSecondary dark:text-textSecondaryDark font-body">
          Offline — showing saved data
        </Text>
      </View>
    </View>
  );
}
