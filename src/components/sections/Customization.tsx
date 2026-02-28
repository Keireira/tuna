'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../layout/Container';
import { Section, SectionTitle, SectionSubtitle } from '../layout/Section';
import { GlassCard } from '../common/GlassCard';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { APP_ICONS } from '@/components/AppShell';
import { ACCENT_COLORS } from '@/styles/accents';
import type { AccentColor } from '@/styles/accents';
import type { ThemeMode } from '@/styles/theme';

/* ── Tabs ── */

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 980px;
  border: 1.5px solid ${({ $active, theme }) =>
    $active ? theme.accent : theme.cardBorder};
  background: ${({ $active, theme }) =>
    $active ? theme.accentLight : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.accent : theme.textSecondary};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

/* ── Split layout: left demo + right description ── */

const SplitPane = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  min-height: 220px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
    min-height: auto;
  }
`;

const DemoSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescSide = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const DescTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const DescText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const splitVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/* ── Icon picker ── */

const IconsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const IconWrapper = styled(motion.button)<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 18px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.accentLight : 'transparent'};
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? theme.accent : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accentLight};
  }
`;

const IconImage = styled.img<{ $selected: boolean }>`
  width: 56px;
  height: 56px;
  clip-path: url(#squircle);
  transition: all 0.3s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? '0 0 24px var(--uha-accent-50)' : 'none'};

  @media (max-width: 560px) {
    width: 48px;
    height: 48px;
  }
`;

/* ── Theme picker ── */

const ThemePickerRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ThemeButton = styled(motion.button)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 14px;
  background: ${({ $active, theme }) =>
    $active ? theme.accentLight : 'transparent'};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.accent : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.accent : theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accentLight};
  }
`;

/* ── Accent piano ── */

const PianoKeys = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;

  @media (max-width: 560px) {
    gap: 4px;
  }
`;

const PianoKey = styled(motion.button)<{ $color: string; $active: boolean }>`
  width: 44px;
  height: 72px;
  border-radius: 0 0 12px 12px;
  background: ${({ $color }) => $color};
  border: 3px solid ${({ $active, theme }) =>
    $active ? theme.text : 'transparent'};
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 4px 20px rgba(0,0,0,0.3)'
      : '0 2px 8px rgba(0,0,0,0.15)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 560px) {
    width: 34px;
    height: 56px;
  }
`;

const ActiveDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

/* ── Currency demo ── */

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'JPY', symbol: '¥', rate: 150 },
  { code: 'RUB', symbol: '₽', rate: 87 },
  { code: 'KRW', symbol: '₩', rate: 1345 },
  { code: 'BRL', symbol: 'R$', rate: 4.97 },
  { code: 'GEL', symbol: '₾', rate: 2.73 },
] as const;

const DEMO_SERVICES = [
  { name: 'Netflix', logo: 'netflix', priceUsd: 15.49 },
  { name: 'Spotify', logo: 'spotify', priceUsd: 10.99 },
  { name: 'YouTube Premium', logo: 'youtube-premium', priceUsd: 13.99 },
] as const;

const ZERO_FRACTION_CURRENCIES = new Set(['JPY', 'KRW']);

function formatPrice(code: string, amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: ZERO_FRACTION_CURRENCIES.has(code) ? 0 : 2,
    maximumFractionDigits: ZERO_FRACTION_CURRENCIES.has(code) ? 0 : 2,
  }).format(amount);
}

const CurrencyDemo = styled.div`
  width: 100%;
`;

const CurrencyPills = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const CurrencyPill = styled(motion.button)<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 100px;
  border: 2px solid ${({ $active, theme }) =>
    $active ? theme.accent : theme.cardBorder};
  background: ${({ $active, theme }) =>
    $active ? theme.accentLight : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.accent : theme.textSecondary};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

const PriceCardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    max-width: 240px;
    margin: 0 auto;
  }
`;

const PriceCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  padding: 16px 12px;
`;

const ServiceLogo = styled.img`
  width: 40px;
  height: 40px;
  clip-path: url(#squircle);
`;

const ServiceName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const PriceAnimated = styled(motion.span)`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.accent};
  transition: color 0.3s;
`;

/* ── Theme options ── */

const THEME_OPTIONS: { mode: ThemeMode; labelKey: string; icon: React.ReactNode }[] = [
  {
    mode: 'light',
    labelKey: 'Light',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    mode: 'dark',
    labelKey: 'Dark',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
      </svg>
    ),
  },
  {
    mode: 'oled',
    labelKey: 'OLED',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
      </svg>
    ),
  },
];

/* ── Tab config ── */

type TabKey = 'icon' | 'theme' | 'accent' | 'currency';

const TAB_KEYS: TabKey[] = ['icon', 'theme', 'accent', 'currency'];

const TAB_LABEL_KEYS: Record<TabKey, string> = {
  icon: 'customization.iconLabel',
  theme: 'customization.themeLabel',
  accent: 'customization.accentLabel',
  currency: 'customization.currencyLabel',
};

const TAB_DETAIL: Record<TabKey, { titleKey: string; descKey: string }> = {
  icon: { titleKey: 'customization.appIcon.title', descKey: 'customization.appIcon.description' },
  theme: { titleKey: 'customization.themes.title', descKey: 'customization.themes.description' },
  accent: { titleKey: 'customization.accentColor.title', descKey: 'customization.accentColor.description' },
  currency: { titleKey: 'customization.baseCurrency.title', descKey: 'customization.baseCurrency.description' },
};

/* ── Component ── */

interface CustomizationProps {
  selectedIcon: string;
  onSelectIcon: (id: string) => void;
  onAccentChange: (accent: AccentColor) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

export function Customization({ selectedIcon, onSelectIcon, onAccentChange, themeMode, onThemeChange }: CustomizationProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();

  const [activeTab, setActiveTab] = useState<TabKey>('icon');

  const [activeAccentId, setActiveAccentId] = useState('blue');

  useEffect(() => {
    const saved = localStorage.getItem('uha-accent');
    if (saved) setActiveAccentId(saved);
  }, []);

  const [activeCurrency, setActiveCurrency] = useState('USD');

  const handleAccent = (a: AccentColor) => {
    setActiveAccentId(a.id);
    onAccentChange(a);
  };

  const detail = TAB_DETAIL[activeTab];

  return (
    <Section>
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp}>
            <SectionTitle>{t('customization.title')}</SectionTitle>
            <SectionSubtitle>{t('customization.subtitle')}</SectionSubtitle>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TabBar>
              {TAB_KEYS.map((key) => (
                <Tab
                  key={key}
                  $active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                >
                  {t(TAB_LABEL_KEYS[key])}
                </Tab>
              ))}
            </TabBar>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AnimatePresence mode="wait">
              <SplitPane
                key={activeTab}
                variants={splitVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <DemoSide>
                  {activeTab === 'icon' && (
                    <IconsRow>
                      {APP_ICONS.map((icon) => (
                        <IconWrapper
                          key={icon.id}
                          $selected={selectedIcon === icon.id}
                          onClick={() => onSelectIcon(icon.id)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconImage
                            src={icon.src}
                            alt={t(`customization.icons.${icon.key}`)}
                            $selected={selectedIcon === icon.id}
                          />
                        </IconWrapper>
                      ))}
                    </IconsRow>
                  )}

                  {activeTab === 'theme' && (
                    <ThemePickerRow>
                      {THEME_OPTIONS.map((opt) => (
                        <ThemeButton
                          key={opt.mode}
                          $active={themeMode === opt.mode}
                          onClick={() => onThemeChange(opt.mode)}
                          whileTap={{ scale: 0.95 }}
                        >
                          {opt.icon}
                          {opt.labelKey}
                        </ThemeButton>
                      ))}
                    </ThemePickerRow>
                  )}

                  {activeTab === 'accent' && (
                    <PianoKeys>
                      {ACCENT_COLORS.map((a) => (
                        <PianoKey
                          key={a.id}
                          $color={a.color}
                          $active={activeAccentId === a.id}
                          onClick={() => handleAccent(a)}
                          whileTap={{ scaleY: 0.92 }}
                          whileHover={{ scaleY: 1.05 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          {activeAccentId === a.id && (
                            <ActiveDot
                              layoutId="accent-dot"
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            />
                          )}
                        </PianoKey>
                      ))}
                    </PianoKeys>
                  )}

                  {activeTab === 'currency' && (
                    <CurrencyDemo>
                      <CurrencyPills>
                        {CURRENCIES.map((c) => (
                          <CurrencyPill
                            key={c.code}
                            $active={activeCurrency === c.code}
                            onClick={() => setActiveCurrency(c.code)}
                            whileTap={{ scale: 0.95 }}
                          >
                            {c.code}&nbsp;{c.symbol}
                          </CurrencyPill>
                        ))}
                      </CurrencyPills>
                      <PriceCardsRow>
                        {DEMO_SERVICES.map((svc) => {
                          const curr = CURRENCIES.find((c) => c.code === activeCurrency)!;
                          const converted = svc.priceUsd * curr.rate;
                          return (
                            <PriceCard key={svc.logo}>
                              <ServiceLogo
                                src={`/assets/logos/${svc.logo}.webp`}
                                alt={svc.name}
                              />
                              <ServiceName>{svc.name}</ServiceName>
                              <AnimatePresence mode="wait">
                                <PriceAnimated
                                  key={activeCurrency}
                                  initial={{ opacity: 0, y: -8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {formatPrice(curr.code, converted)}
                                </PriceAnimated>
                              </AnimatePresence>
                            </PriceCard>
                          );
                        })}
                      </PriceCardsRow>
                    </CurrencyDemo>
                  )}
                </DemoSide>

                <DescSide>
                  <DescTitle>{t(detail.titleKey)}</DescTitle>
                  <DescText>{t(detail.descKey)}</DescText>
                </DescSide>
              </SplitPane>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
