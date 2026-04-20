'use client';

import { useState, createContext, useContext, type PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { useTheme } from '@hooks';

import { Navbar, Footer } from '@layout';
import GlobalStyles from '@styles/GlobalStyles';
import { SquircleMask } from '@common/SquircleMask';

import type { ThemeMode } from '@styles/theme';
import type { AccentColor } from '@styles/accents';

type TAppContextValue = {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
	setAccent: (accent: AccentColor) => void;
	selectedIcon: string;
	setSelectedIcon: (id: string) => void;
};

const AppContext = createContext<TAppContextValue>(null!);

export const useAppContext = () => useContext(AppContext);

export const AppShell = ({ children }: PropsWithChildren) => {
	const { mode, theme, toggleMode, setMode, setAccent } = useTheme();
	const [selectedIcon, setSelectedIcon] = useState('classic');

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
};
