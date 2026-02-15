/**
 * Brand and semantic color hex values for TrueNorth (light and dark).
 * Single source for non–Tailwind usage (e.g. inline styles, native modules).
 * Aligned with .cursor/reference/design-tokens.md and PRD Section 7.
 * Use getColors(scheme) or theme from @/lib/theme for runtime scheme-aware colors.
 */
import type { ColorScheme } from '@/lib/theme';

/** Light palette. */
export const colorsLight = {
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
  error: '#E53935',
  success: '#2E7D32',
  textPrimary: '#2D3F52',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
} as const;

/** Dark palette. */
export const colorsDark = {
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
  error: '#EF5350',
  success: '#66BB6A',
  textPrimary: '#F5F7FA',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
} as const;

export type Colors = typeof colorsLight;

/** Returns the color set for the given scheme. */
export function getColors(scheme: ColorScheme): Colors {
  return scheme === 'dark' ? colorsDark : colorsLight;
}

/** Light colors (default export for non–scheme-aware usage). */
export const colors = colorsLight;
