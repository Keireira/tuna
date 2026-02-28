'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../common/Button';
import { fadeInUp, staggerContainer } from '@/styles/animations';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.heroBg};
  padding-top: 80px;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const AppIcon = styled(motion.img)`
  width: 120px;
  height: 120px;
  clip-path: url(#squircle);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 96px;
    height: 96px;
  }
`;

const Headline = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4.2rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  white-space: pre-line;
  max-width: 700px;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 520px;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

interface HeroProps {
  appIconSrc: string;
}

export function Hero({ appIconSrc }: HeroProps) {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <Container>
        <HeroContent
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <AppIcon
            key={appIconSrc}
            src={appIconSrc}
            alt="Uha"
            variants={fadeInUp}
          />
          <Headline variants={fadeInUp}>
            {t('hero.headline')}
          </Headline>
          <Subtitle variants={fadeInUp}>
            {t('hero.subtitle')}
          </Subtitle>
          <ButtonGroup variants={fadeInUp}>
            <Button
              href="https://apps.apple.com/app/uha"
              target="_blank"
              rel="noopener"
              $variant="primary"
              $size="lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t('hero.appStore')}
            </Button>
          </ButtonGroup>
        </HeroContent>
      </Container>
    </HeroSection>
  );
}