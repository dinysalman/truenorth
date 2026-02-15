/**
 * Theme constants for TrueNorth.
 * Single source of truth for colors (and other tokens) used in style objects
 * where className cannot be used (e.g. Stack contentStyle, headerStyle).
 * Values must stay in sync with tailwind.config.js and PRD Section 7.
 */
export const theme = {
  colors: {
    northBlue: '#1E2A38',
    compassGold: '#D4A017',
    softMist: '#F5F7FA',
    evergreen: '#2E7D32',
    primary: '#1E2A38',
    secondary: '#D4A017',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    textPrimary: '#1E2A38',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    tabBarBorder: '#374151',
  },
} as const;

export type Theme = typeof theme;
