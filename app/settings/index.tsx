import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useTheme } from '@/lib/theme';
import { useThemeOverride, type ColorSchemeOverride } from '@/lib/ThemeOverrideContext';

const OVERRIDE_LABELS: Record<ColorSchemeOverride, string> = {
  light: 'Light',
  dark: 'Dark',
  null: 'System',
};

/**
 * Settings screen
 * Includes theme toggle (Light / Dark / System) so you can preview both modes.
 */
export default function SettingsScreen() {
  const { colors, isDark } = useTheme();
  const { override, setOverride } = useThemeOverride();

  const cycleTheme = () => {
    if (override === null) setOverride('light');
    else if (override === 'light') setOverride('dark');
    else setOverride(null);
  };

  const containerBg = { backgroundColor: colors.background };
  const surfaceBg = { backgroundColor: colors.surface };
  const sectionTitleColor = { color: colors.textSecondary };
  const settingTextColor = { color: colors.textPrimary };
  const themeValueColor = { color: colors.compassGold };

  return (
    <ScrollView style={[styles.container, containerBg]}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, sectionTitleColor]}>Preferences</Text>
          <Pressable
            style={({ pressed }) => [
              styles.settingItem,
              surfaceBg,
              pressed && styles.settingItemPressed,
            ]}
            onPress={cycleTheme}
            accessibilityRole="button"
            accessibilityLabel={`Appearance: ${OVERRIDE_LABELS[override]}. Tap to switch.`}
          >
            <Text style={[styles.settingText, settingTextColor]}>Appearance</Text>
            <Text style={[styles.settingValue, themeValueColor]}>
              {OVERRIDE_LABELS[override]}
            </Text>
          </Pressable>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Notifications</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Default Focus Duration</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, sectionTitleColor]}>Account</Text>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Profile</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Email & Password</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Logout</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, sectionTitleColor]}>Data</Text>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Export Data</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Import Data</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Clear Cache</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, sectionTitleColor]}>About</Text>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Version 1.0.0</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Help & Documentation</Text>
          </View>
          <View style={[styles.settingItem, surfaceBg]}>
            <Text style={[styles.settingText, settingTextColor]}>Privacy Policy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingItemPressed: {
    opacity: 0.8,
  },
  settingText: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
