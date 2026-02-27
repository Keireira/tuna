import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/GlobalStyles';
import { useTheme } from '@/hooks/useTheme';

import { SquircleMask } from '@/components/common/SquircleMask';
import { FloatingLogos } from '@/components/common/FloatingLogos';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Privacy } from '@/components/sections/Privacy';
import { AIFeature } from '@/components/sections/AIFeature';
import { Customization } from '@/components/sections/Customization';
import { Stats } from '@/components/sections/Stats';
import { Download } from '@/components/sections/Download';

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
      <FloatingLogos />
      <Navbar themeMode={mode} onToggleTheme={toggleMode} appIconSrc={currentIcon.src} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero appIconSrc={currentIcon.src} />
        <Features />
        <Privacy />
        <AIFeature />
        <Customization
          selectedIcon={selectedIcon}
          onSelectIcon={setSelectedIcon}
          onAccentChange={setAccent}
          themeMode={mode}
          onThemeChange={setMode}
        />
        <Stats />
        <Download />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
