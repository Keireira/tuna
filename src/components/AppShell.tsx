'use client';

import { useState, createContext, useContext, type PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'styled-components';

import { useTheme } from '@hooks';

import { Navbar, Footer } from '@layout';
import GlobalStyles from '@styles/GlobalStyles';
import { SquircleMask } from '@common/SquircleMask';
import WebMcpTools from '@/components/agent/WebMcpTools';

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
	const pathname = usePathname();
	const hasEditorialLayout = /^\/(en|ru|kk|ja|es)(?:\/(mcp|support|security|terms|privacy))?\/?$/.test(pathname);
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
				<WebMcpTools />
				{!hasEditorialLayout && <Navbar themeMode={mode} onToggleTheme={toggleMode} />}
				{children}
				{!hasEditorialLayout && <Footer />}
			</ThemeProvider>
		</AppContext.Provider>
	);
};
