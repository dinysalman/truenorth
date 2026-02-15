/**
 * Theme constants for TrueNorth (light and dark).
 * Single source of truth for colors used in style objects where className
 * cannot be used (e.g. Stack contentStyle, headerStyle).
 * Use useTheme() for scheme-aware colors; values stay in sync with
 * tailwind.config.js and PRD Section 7.
 */
import { useColorScheme } from 'react-native';
import { useThemeOverride } from './ThemeOverrideContext';

/** System or resolved color scheme. */
export type ColorScheme = 'light' | 'dark' | null | undefined;

/** Light theme palette (calm, readable). */
export const themeLight = {
  colors: {
    northBlue: '#2D3F52',
    compassGold: '#D4A017',
    softMist: '#F5F7FA',
    evergreen: '#2E7D32',
    priority1: '#E53935',
    priority2: '#FB8C00',
    priority3: '#43A047',
    primary: '#2D3F52',
    secondary: '#D4A017',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    textPrimary: '#2D3F52',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    tabBarBorder: '#374151',
  },
} as const;

/** Dark theme palette (reduced contrast, calm). */
export const themeDark = {
  colors: {
    northBlue: '#5B7A9E',
    compassGold: '#E4B84A',
    softMist: '#1A1D21',
    evergreen: '#4CAF50',
    priority1: '#EF5350',
    priority2: '#FFB74D',
    priority3: '#66BB6A',
    primary: '#5B7A9E',
    secondary: '#E4B84A',
    background: '#121418',
    surface: '#1A1D21',
    textPrimary: '#F5F7FA',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    tabBarBorder: '#374151',
  },
} as const;

/** Theme shape (light and dark palettes share the same keys). */
export type Theme = { colors: { [K in keyof typeof themeLight.colors]: string } };

/** Returns the active theme (light or dark) based on system color scheme. */
export function getTheme(colorScheme: 'light' | 'dark' | null | undefined): Theme {
  return colorScheme === 'dark' ? themeDark : themeLight;
}

/**
 * Hook that returns the current theme and whether the app is in dark mode.
 * Respects user override from Settings (ThemeOverrideProvider); otherwise uses system.
 * Use for inline styles (Stack contentStyle, headerStyle, etc.).
 */
export function useTheme(): Theme & { isDark: boolean } {
  const systemScheme = useColorScheme();
  const { override } = useThemeOverride();
  const effectiveScheme = override ?? systemScheme ?? 'light';
  const theme = getTheme(effectiveScheme);
  return { ...theme, isDark: effectiveScheme === 'dark' };
}

/** @deprecated Use useTheme() or getTheme() for scheme-aware styling. */
export const theme = themeLight;
