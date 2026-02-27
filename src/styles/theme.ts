import type { AccentColor } from './accents';

export type ThemeMode = 'light' | 'dark' | 'oled';

function makeLight() {
  return {
    bg: '#F9F9F9',
    bgAlt: '#f2f2f7',
    surface: 'rgba(255, 255, 255, 0.7)',
    surfaceSolid: '#ffffff',
    card: 'rgba(255, 255, 255, 0.6)',
    cardHover: 'rgba(255, 255, 255, 0.85)',
    cardBorder: 'rgba(0, 0, 0, 0.08)',
    text: '#1c1c1e',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: 'var(--uha-accent)',
    accentHover: 'var(--uha-accent-hover)',
    accentLight: 'var(--uha-accent-light)',
    navBg: 'rgba(249, 249, 249, 0.72)',
    navBorder: 'rgba(0, 0, 0, 0.06)',
    heroBg: 'radial-gradient(ellipse at 50% 0%, #EDE8E1 0%, #F9F9F9 70%)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    shadowLight: '0 2px 12px rgba(0, 0, 0, 0.06)',
    gradient: 'var(--uha-accent-gradient)',
    gradientText: 'var(--uha-accent-gradient)',
    footerBg: '#f2f2f7',
    mode: 'light' as const,
  };
}

function makeDark() {
  return {
    bg: '#1c1c1e',
    bgAlt: '#000000',
    surface: 'rgba(44, 44, 46, 0.7)',
    surfaceSolid: '#2c2c2e',
    card: 'rgba(44, 44, 46, 0.6)',
    cardHover: 'rgba(58, 58, 60, 0.85)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#f2f2f7',
    textSecondary: '#ababab',
    textTertiary: '#777777',
    accent: 'var(--uha-accent)',
    accentHover: 'var(--uha-accent-hover)',
    accentLight: 'var(--uha-accent-light)',
    navBg: 'rgba(28, 28, 30, 0.72)',
    navBorder: 'rgba(255, 255, 255, 0.06)',
    heroBg: 'radial-gradient(ellipse at 50% 0%, #2c2520 0%, #1c1c1e 70%)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.32)',
    shadowLight: '0 2px 12px rgba(0, 0, 0, 0.24)',
    gradient: 'var(--uha-accent-gradient)',
    gradientText: 'var(--uha-accent-gradient)',
    footerBg: '#000000',
    mode: 'dark' as const,
  };
}

function makeOled() {
  return {
    bg: '#000000',
    bgAlt: '#000000',
    surface: 'rgba(28, 28, 30, 0.7)',
    surfaceSolid: '#1c1c1e',
    card: 'rgba(28, 28, 30, 0.6)',
    cardHover: 'rgba(38, 38, 40, 0.85)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#f2f2f7',
    textSecondary: '#ababab',
    textTertiary: '#777777',
    accent: 'var(--uha-accent)',
    accentHover: 'var(--uha-accent-hover)',
    accentLight: 'var(--uha-accent-light)',
    navBg: 'rgba(0, 0, 0, 0.72)',
    navBorder: 'rgba(255, 255, 255, 0.06)',
    heroBg: 'radial-gradient(ellipse at 50% 0%, #1a1510 0%, #000000 70%)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.32)',
    shadowLight: '0 2px 12px rgba(0, 0, 0, 0.24)',
    gradient: 'var(--uha-accent-gradient)',
    gradientText: 'var(--uha-accent-gradient)',
    footerBg: '#000000',
    mode: 'oled' as const,
  };
}

export const lightTheme = makeLight();
export const darkTheme = makeDark();
export const oledTheme = makeOled();

export function buildTheme(mode: ThemeMode) {
  if (mode === 'light') return makeLight();
  if (mode === 'oled') return makeOled();
  return makeDark();
}

/** Sets accent CSS custom properties on :root. */
export function applyAccentVars(mode: ThemeMode, accent: AccentColor) {
  const root = document.documentElement;
  const useDark = mode === 'dark' || mode === 'oled';
  root.style.setProperty('--uha-accent', accent.color);
  root.style.setProperty('--uha-accent-hover', accent.hover);
  root.style.setProperty('--uha-accent-light', useDark ? accent.lightDark : accent.light);
  root.style.setProperty('--uha-accent-gradient', useDark ? accent.gradientDark : accent.gradient);
  root.style.setProperty('--uha-accent-40', accent.color + '40');
  root.style.setProperty('--uha-accent-50', accent.color + '50');
  root.style.setProperty('--uha-accent-20', accent.color + '20');
  root.style.setProperty('--uha-accent-10', accent.color + '10');
}

export type Theme = Omit<ReturnType<typeof makeLight>, 'mode'> & { mode: ThemeMode };
