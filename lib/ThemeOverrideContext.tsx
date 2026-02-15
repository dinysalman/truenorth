'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

/** User override for color scheme; null = follow system. */
export type ColorSchemeOverride = 'light' | 'dark' | null;

type ThemeOverrideContextValue = {
  override: ColorSchemeOverride;
  setOverride: (value: ColorSchemeOverride) => void;
};

const ThemeOverrideContext = createContext<ThemeOverrideContextValue>({
  override: null,
  setOverride: () => {},
});

export function ThemeOverrideProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverride] = useState<ColorSchemeOverride>(null);
  const setOverrideStable = useCallback((value: ColorSchemeOverride) => setOverride(value), []);
  return (
    <ThemeOverrideContext.Provider value={{ override, setOverride: setOverrideStable }}>
      {children}
    </ThemeOverrideContext.Provider>
  );
}

export function useThemeOverride(): ThemeOverrideContextValue {
  return useContext(ThemeOverrideContext);
}
