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
				<Navbar themeMode={mode} onToggleTheme={toggleMode} />
				{children}
				<Footer />
			</ThemeProvider>
		</AppContext.Provider>
	);
}
