import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/GlobalStyles';
import { useTheme } from '@/hooks/useTheme';

import { SquircleMask } from '@/components/common/SquircleMask';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LandingPage } from '@/pages/LandingPage';
import { DocsPage } from '@/pages/DocsPage';

export const APP_ICONS = [
  { id: 'classic', src: '/assets/icons/ios-light.png', key: 'classic' },
  { id: 'dark', src: '/assets/icons/ios-dark.png', key: 'dark' },
  { id: 'trans', src: '/assets/icons/trans-icon.png', key: 'trans' },
  { id: 'enby', src: '/assets/icons/enby-icon.png', key: 'enby' },
  { id: 'lesbi', src: '/assets/icons/lesbi-icon.png', key: 'lesbi' },
  { id: 'pan', src: '/assets/icons/pan-icon.png', key: 'pan' },
] as const;

export default function App() {
  const { mode, theme, toggleMode, setMode, setAccent } = useTheme();
  const [selectedIcon, setSelectedIcon] = useState('classic');

  const currentIcon = APP_ICONS.find((i) => i.id === selectedIcon) ?? APP_ICONS[0];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SquircleMask />
      <Navbar themeMode={mode} onToggleTheme={toggleMode} appIconSrc={currentIcon.src} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              selectedIcon={selectedIcon}
              onSelectIcon={setSelectedIcon}
              onAccentChange={setAccent}
              themeMode={mode}
              onThemeChange={setMode}
            />
          }
        />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}
