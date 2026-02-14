/**
 * Tailwind CSS configuration for TrueNorth
 * Uses NativeWind v4 preset for React Native. Custom tokens align with PRD Section 7 (Design Specification).
 */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Brand Colors (PRD)
        northBlue: '#1E2A38',
        compassGold: '#D4A017',
        softMist: '#F5F7FA',
        evergreen: '#2E7D32',

        // Priority Colors
        priority1: '#E53935', // Red (High)
        priority2: '#FB8C00', // Orange (Medium)
        priority3: '#43A047', // Green (Low)

        // Semantic Colors
        primary: '#1E2A38',
        secondary: '#D4A017',
        background: '#F5F7FA',
        surface: '#FFFFFF',
        error: '#E53935',
        success: '#2E7D32',

        // Text Colors
        textPrimary: '#1E2A38',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',
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
