'use client';

import { FloatingLogos } from '@/components/common/FloatingLogos';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Privacy } from '@/components/sections/Privacy';
import { AIFeature } from '@/components/sections/AIFeature';
import { Customization } from '@/components/sections/Customization';
import { Stats } from '@/components/sections/Stats';
import { Download } from '@/components/sections/Download';
import { APP_ICONS, useAppContext } from '@/components/AppShell';

export function LandingPage() {
  const { selectedIcon, setSelectedIcon, setAccent, mode, setMode } = useAppContext();
  const currentIcon = APP_ICONS.find((i) => i.id === selectedIcon) ?? APP_ICONS[0];

  return (
    <>
      <FloatingLogos />
      <main style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
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
    </>
  );
}
