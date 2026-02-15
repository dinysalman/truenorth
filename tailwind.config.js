/**
 * Tailwind CSS configuration for TrueNorth
 * Uses NativeWind v4 preset for React Native. Custom tokens align with PRD Section 7 (Design Specification).
 * Use dark: prefix for dark-mode variants (e.g. dark:bg-surfaceDark). System appearance drives dark mode.
 */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Brand (light) – northBlue slightly brighter for readability
        northBlue: '#2D3F52',
        compassGold: '#D4A017',
        softMist: '#F5F7FA',
        evergreen: '#2E7D32',

        // Brand (dark mode) – use with dark: prefix
        northBlueDark: '#5B7A9E',
        compassGoldDark: '#E4B84A',
        softMistDark: '#1A1D21',
        evergreenDark: '#4CAF50',

        // Priority Colors
        priority1: '#E53935',
        priority2: '#FB8C00',
        priority3: '#43A047',

        // Semantic (light)
        primary: '#2D3F52',
        secondary: '#D4A017',
        background: '#F5F7FA',
        surface: '#FFFFFF',
        error: '#E53935',
        success: '#2E7D32',
        textPrimary: '#2D3F52',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',

        // Semantic (dark) – use with dark: prefix
        primaryDark: '#5B7A9E',
        secondaryDark: '#E4B84A',
        backgroundDark: '#121418',
        surfaceDark: '#1A1D21',
        textPrimaryDark: '#F5F7FA',
        textSecondaryDark: '#9CA3AF',
        textMutedDark: '#6B7280',
      },
      fontFamily: {
        heading: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        body: ['SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      spacing: {
        safe: '20px',
        card: '16px',
        section: '24px',
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        elevated: '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
