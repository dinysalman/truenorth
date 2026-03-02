import * as React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle, View } from 'react-native';
import { useTheme } from '@/lib/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'apple' | 'google';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  /** Optional container style (e.g. { width: '100%' }) so the button fills its parent. */
  style?: ViewStyle;
  /** Optional left icon (e.g. Apple, GoogleLogo) for social sign-in buttons. */
  leftIcon?: React.ReactNode;
}

const minHeight = 44;
const paddingVertical = 12;
const paddingHorizontal = 24;

/**
 * Accessible button with primary, secondary, and outline variants.
 * Min 44pt touch target; uses theme tokens only.
 */
export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  accessibilityLabel = title,
  style: customStyle,
  leftIcon,
}: ButtonProps) {
  const { colors } = useTheme();

  const getBg = (): string => {
    if (variant === 'primary') return colors.deepNorthBlue;
    if (variant === 'secondary') return colors.compassGold;
    if (variant === 'apple') return '#000000'; // Apple HIG
    if (variant === 'google') return colors.surface;
    return 'transparent';
  };
  const getFg = (): string => {
    if (variant === 'primary') return colors.softMist;
    if (variant === 'secondary') return colors.deepNorthBlue;
    if (variant === 'apple') return '#FFFFFF'; // Apple HIG
    if (variant === 'google') return colors.textPrimary;
    return colors.deepNorthBlue;
  };
  const getBorder = (): string => {
    if (variant === 'outline' || variant === 'google') return colors.textMuted + '99';
    if (variant === 'primary') return colors.northBlue;
    if (variant === 'secondary') return '#C4910F';
    if (variant === 'apple') return '#333333';
    return colors.textMuted + '99';
  };

  const bg = getBg();
  const fg = getFg();
  const borderColor = getBorder();

  return (
    <Pressable
      cssInterop={false}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed && !disabled && !loading ? `${bg}E6` : bg,
          borderWidth: 2,
          borderColor,
          opacity: disabled || loading ? 0.65 : 1,
        },
        customStyle,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'apple' ? colors.softMist : colors.deepNorthBlue}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon ? (
            <View style={[styles.leftIcon, { width: 24, height: 24 }]}>
              {leftIcon}
            </View>
          ) : null}
          <Text style={[styles.label, { color: fg }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight,
    paddingVertical,
    paddingHorizontal,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
