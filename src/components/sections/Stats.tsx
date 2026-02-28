'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Section, SectionTitle, SectionSubtitle } from '../layout/Section';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* ── Layout ── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 720px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    max-width: 360px;
  }
`;

const Card = styled(motion.div)<{ $accent?: boolean }>`
  padding: 32px 28px;
  border-radius: 20px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid
    ${({ $accent, theme }) => ($accent ? theme.accent : theme.cardBorder)};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${({ $accent }) =>
    $accent &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--uha-accent-gradient);
    }
  `}
`;

const CardHeader = styled.div`
  margin-bottom: 24px;
`;

const CardTitle = styled.h3<{ $accent?: boolean }>`
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ $accent, theme }) => ($accent ? theme.accent : theme.text)};
`;

const Includes = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Feature = styled.li<{ $accent?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.4;
`;

const Check = styled.span<{ $accent?: boolean }>`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  background: ${({ $accent }) =>
    $accent ? 'var(--uha-accent-20)' : 'rgba(128,128,128,0.15)'};
  color: ${({ $accent }) =>
    $accent ? 'var(--uha-accent)' : 'rgba(128,128,128,0.6)'};
`;

const Plans = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textTertiary};
  font-weight: 500;
`;

/* ── Check SVG ── */

const CheckSvg = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Data ── */

const FREE_FEATURES = [
  'pricing.free.subscriptions',
  'pricing.free.currencies',
  'pricing.free.horizon',
  'pricing.free.ai',
  'pricing.free.export',
];

const UNLIMITED_FEATURES = [
  'pricing.unlimited.subscriptions',
  'pricing.unlimited.currencies',
  'pricing.unlimited.horizon',
  'pricing.unlimited.ai',
  'pricing.unlimited.icloud',
];

/* ── Component ── */

export function Stats() {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();

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
            <SectionTitle>{t('pricing.title')}</SectionTitle>
            <SectionSubtitle>{t('pricing.subtitle')}</SectionSubtitle>
          </motion.div>

          <Grid>
            <Card variants={fadeInUp}>
              <CardHeader>
                <CardTitle>{t('pricing.free.title')}</CardTitle>
              </CardHeader>
              <FeatureList>
                {FREE_FEATURES.map((key) => (
                  <Feature key={key}>
                    <Check><CheckSvg /></Check>
                    {t(key)}
                  </Feature>
                ))}
              </FeatureList>
            </Card>

            <Card $accent variants={fadeInUp}>
              <CardHeader>
                <CardTitle $accent>{t('pricing.unlimited.title')}</CardTitle>
                <Includes>{t('pricing.unlimited.includes')}</Includes>
              </CardHeader>
              <FeatureList>
                {UNLIMITED_FEATURES.map((key) => (
                  <Feature key={key} $accent>
                    <Check $accent><CheckSvg /></Check>
                    {t(key)}
                  </Feature>
                ))}
              </FeatureList>
              <Plans>{t('pricing.unlimited.plans')}</Plans>
            </Card>
          </Grid>

        </motion.div>
      </Container>
    </Section>
  );
}
