'use client';

import { random } from '@lib';
import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';

import { ACCENT_COLORS } from '@styles/accents';
import { buildTheme, applyAccentVars } from '@styles/theme';

import type { ThemeMode } from '@styles/theme';
import type { AccentColor } from '@styles/accents';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const readSavedAccent = (): AccentColor => {
	const saved = localStorage.getItem('uha-accent');
	const defaultAccent = ACCENT_COLORS[random(0, ACCENT_COLORS.length - 1)];

	return ACCENT_COLORS.find((a) => a.id === saved) ?? defaultAccent;
};

const readSavedMode = (): ThemeMode => {
	const saved = localStorage.getItem('uha-theme');

	if (saved === 'light' || saved === 'dark' || saved === 'oled') {
		return saved;
	}

	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const useTheme = () => {
	// Start with a stable default so server & client first-render match.
	const [mode, setMode] = useState<ThemeMode>('light');
	const accentRef = useRef<AccentColor>(ACCENT_COLORS[0]);
	const [mounted, setMounted] = useState(false);

	// After hydration, read the real values from localStorage / matchMedia.
	useIsomorphicLayoutEffect(() => {
		const savedMode = readSavedMode();
		const savedAccent = readSavedAccent();
		accentRef.current = savedAccent;
		setMode(savedMode);
		applyAccentVars(savedMode, savedAccent);
		setMounted(true);
	}, []);

	const theme = useMemo(() => buildTheme(mode), [mode]);

	// Keep accent CSS vars in sync when mode changes (after mount).
	useIsomorphicLayoutEffect(() => {
		if (mounted) {
			applyAccentVars(mode, accentRef.current);
		}
	}, [mode, mounted]);

	useEffect(() => {
		if (!mounted) return;
		localStorage.setItem('uha-theme', mode);
		document.documentElement.setAttribute('data-theme', mode);
	}, [mode, mounted]);

	const toggleMode = useCallback(() => {
		setMode((prev) => {
			if (prev === 'light') return 'dark';
			if (prev === 'dark') return 'oled';
			return 'light';
		});
	}, []);

	const setAccent = useCallback(
		(a: AccentColor) => {
			accentRef.current = a;
			applyAccentVars(mode, a);
			localStorage.setItem('uha-accent', a.id);
		},
		[mode]
	);

	return { mode, theme, toggleMode, setMode, setAccent };
};

export default useTheme;
