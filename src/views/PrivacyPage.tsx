'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PageWrapper = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: 60px 0 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 560px;
  margin: 0 auto;
`;

const Content = styled(motion.div)`
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const Section = styled(motion.section)`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
`;

const Paragraph = styled.p`
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BulletList = styled.ul`
  padding-left: 20px;
  margin-bottom: 12px;

  li {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 6px;
    padding-left: 4px;
  }
`;

export function PrivacyPage() {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation(0.05);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <Container>
        <HeroSection>
          <Title>{t('privacyPolicy.title')}</Title>
          <Subtitle>{t('privacyPolicy.updated')}</Subtitle>
        </HeroSection>

        <Content
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Section variants={fadeInUp}>
            <Paragraph>{t('privacyPolicy.intro')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.collect_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.collect_body')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.local_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.local_body')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.third_party_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.third_party_intro')}</Paragraph>
            <BulletList>
              <li><strong>RevenueCat</strong> — {t('privacyPolicy.third_party_revenuecat')}</li>
              <li><strong>Logo.dev</strong> — {t('privacyPolicy.third_party_logodev')}</li>
            </BulletList>
            <Paragraph>{t('privacyPolicy.third_party_outro')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.icloud_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.icloud_body')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.analytics_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.analytics_body')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.children_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.children_body')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.changes_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.changes_body')}</Paragraph>
          </Section>

          <Section variants={fadeInUp}>
            <SectionTitle>{t('privacyPolicy.contact_title')}</SectionTitle>
            <Paragraph>{t('privacyPolicy.contact_body')}</Paragraph>
          </Section>
        </Content>
      </Container>
    </PageWrapper>
  );
}
