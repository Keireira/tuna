'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@styles/GlobalStyles';
import { useTheme } from '@hooks';
import { SquircleMask } from '@common/SquircleMask';
import { Navbar, Footer } from '@layout';
import type { ThemeMode } from '@styles/theme';
import type { AccentColor } from '@styles/accents';
import '@/i18n/config';
import { applyClientLanguage } from '@/i18n/config';

export const APP_ICONS = [
	{ id: 'classic', src: '/assets/icons/fish.png', key: 'classic' },
	{ id: 'default', src: '/assets/icons/default.png', key: 'default' },
	{ id: 'trans', src: '/assets/icons/trans.png', key: 'trans' },
	{ id: 'enby', src: '/assets/icons/enby.png', key: 'enby' },
	{ id: 'lesbi', src: '/assets/icons/lesbi.png', key: 'lesbi' },
	{ id: 'pan', src: '/assets/icons/pan.png', key: 'pan' }
] as const;

interface AppContextValue {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
	setAccent: (accent: AccentColor) => void;
	selectedIcon: string;
	setSelectedIcon: (id: string) => void;
}

const AppContext = createContext<AppContextValue>(null!);

export function useAppContext() {
	return useContext(AppContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
	const { mode, theme, toggleMode, setMode, setAccent } = useTheme();
	const [selectedIcon, setSelectedIcon] = useState('classic');

	// Apply user's saved language after hydration.
	useEffect(() => {
		applyClientLanguage();
	}, []);

	const currentIcon = APP_ICONS.find((i) => i.id === selectedIcon) ?? APP_ICONS[0];

	return (
		<AppContext.Provider
			value={{
				mode,
				setMode,
				toggleMode,
				setAccent,
				selectedIcon,
				setSelectedIcon
			}}
		>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<SquircleMask />
				<Navbar themeMode={mode} onToggleTheme={toggleMode} appIconSrc={currentIcon.src} />
				{children}
				<Footer />
			</ThemeProvider>
		</AppContext.Provider>
	);
}
