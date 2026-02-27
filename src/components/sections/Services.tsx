import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Section, SectionTitle, SectionSubtitle } from '../layout/Section';
import { fadeInUp } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const allLogos = [
  'netflix', 'spotify', 'youtube-premium', 'disney-plus', 'chatgpt', 'claude',
  'github', 'apple-music', 'apple-one', 'apple-tv-plus', 'amazon-prime',
  'telegram', 'discord', 'hbo-max', 'crunchyroll', 'nord-vpn', 'proton',
  'adobe', 'aws', 'deezer', 'twitch', 'patreon', 'medium', 'mega',
  'surfshark', 'express-vpn', 'google-one', 'hulu', 'paramount-plus',
  'digital-ocean', 'vercel', 'heroku', 'render', 'tailscale', 'warp',
  'kagi', 'sketch', 'tidal', 'boosty', 'psn', 'xbox',
  'kinopoisk', 'ivi', 'okko', 'yandex-plus', 'discovery-plus',
  'adguard', 'namecheap', 'porkbun', 'hostinger', 'vultr', 'linode',
  'gitkraken', 'maxon', 'onlyfans', 'curiosity-stream', 'wolt', 'glovo',
  'cyberghost', 'ip-vanish', 'tunnel-bear', 'private-internet-access',
  'now-tv', 'subscribe-star', 'opensubtitles', 'aeza', 'hostkey',
  'knownhost', 'scala-hosting', 'nexcess', 'nixihost', 'anime365',
  'teso', 'zume', 'inferno-solutions', 'coursehunter', 'coursetrain', 'dev',
];

const row1 = allLogos.slice(0, 39);
const row2 = allLogos.slice(39);

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const MarqueeWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 120px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.bg}, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.bg}, transparent);
  }
`;

const MarqueeRow = styled.div<{ $direction: 'left' | 'right' }>`
  display: flex;
  gap: 16px;
  padding: 8px 0;
  width: max-content;
  animation: ${({ $direction }) => ($direction === 'left' ? scrollLeft : scrollRight)}
    60s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoItem = styled.div`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  clip-path: url(#squircle);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

function MarqueeLogos({ logos, direction }: { logos: string[]; direction: 'left' | 'right' }) {
  const doubled = [...logos, ...logos];
  return (
    <MarqueeRow $direction={direction}>
      {doubled.map((logo, i) => (
        <LogoItem key={`${logo}-${i}`}>
          <img src={`/assets/logos/${logo}.webp`} alt={logo} loading="lazy" />
        </LogoItem>
      ))}
    </MarqueeRow>
  );
}

export function Services() {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();

  return (
    <Section>
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <SectionTitle>{t('services.title')}</SectionTitle>
          <SectionSubtitle>{t('services.subtitle')}</SectionSubtitle>
        </motion.div>
      </Container>
      <MarqueeWrapper>
        <MarqueeLogos logos={row1} direction="left" />
        <MarqueeLogos logos={row2} direction="right" />
      </MarqueeWrapper>
    </Section>
  );
}
