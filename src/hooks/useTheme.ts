import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { buildTheme, applyAccentVars } from '@/styles/theme';
import type { ThemeMode } from '@/styles/theme';
import { ACCENT_COLORS } from '@/styles/accents';
import type { AccentColor } from '@/styles/accents';

function getInitialAccent(): AccentColor {
  const saved = localStorage.getItem('uha-accent');
  return ACCENT_COLORS.find((a) => a.id === saved) ?? ACCENT_COLORS[0];
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('uha-theme');
    if (saved === 'light' || saved === 'dark' || saved === 'oled') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Accent lives in a ref — changing it never triggers React re-renders.
  // CSS vars handle the visual update imperatively.
  const accentRef = useRef<AccentColor>(getInitialAccent());

  const theme = useMemo(() => buildTheme(mode), [mode]);

  // Apply accent CSS vars on mount and when mode changes
  // (accentLight and gradient values differ by mode)
  useLayoutEffect(() => {
    applyAccentVars(mode, accentRef.current);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('uha-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'oled';
      return 'light';
    });
  }, []);

  // Imperative accent setter — updates CSS vars + localStorage, no re-render
  const setAccent = useCallback((a: AccentColor) => {
    accentRef.current = a;
    applyAccentVars(mode, a);
    localStorage.setItem('uha-accent', a.id);
  }, [mode]);

  return { mode, theme, toggleMode, setMode, setAccent };
}
