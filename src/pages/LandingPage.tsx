import { FloatingLogos } from '@/components/common/FloatingLogos';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Privacy } from '@/components/sections/Privacy';
import { AIFeature } from '@/components/sections/AIFeature';
import { Customization } from '@/components/sections/Customization';
import { Stats } from '@/components/sections/Stats';
import { Download } from '@/components/sections/Download';
import { APP_ICONS } from '@/App';
import type { ThemeMode } from '@/styles/theme';
import type { AccentColor } from '@/styles/accents';

interface LandingPageProps {
  selectedIcon: string;
  onSelectIcon: (id: string) => void;
  onAccentChange: (accent: AccentColor) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function LandingPage({
  selectedIcon,
  onSelectIcon,
  onAccentChange,
  themeMode,
  onThemeChange,
}: LandingPageProps) {
  const currentIcon = APP_ICONS.find((i) => i.id === selectedIcon) ?? APP_ICONS[0];

  return (
    <>
      <FloatingLogos />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero appIconSrc={currentIcon.src} />
        <Features />
        <Privacy />
        <AIFeature />
        <Customization
          selectedIcon={selectedIcon}
          onSelectIcon={onSelectIcon}
          onAccentChange={onAccentChange}
          themeMode={themeMode}
          onThemeChange={onThemeChange}
        />
        <Stats />
        <Download />
      </main>
    </>
  );
}
