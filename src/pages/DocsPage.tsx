import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* ───────────────────── styled ───────────────────── */

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

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  align-items: start;
  padding-bottom: 100px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

/* ── sidebar ── */

const Sidebar = styled.nav`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 900px) {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
    padding: 16px 0 32px;
    border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
    margin-bottom: 32px;
  }
`;

const SidebarLink = styled.a<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textSecondary)};
  background: ${({ theme, $active }) => ($active ? theme.accentLight : 'transparent')};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accentLight};
  }

  @media (max-width: 900px) {
    padding: 6px 12px;
    font-size: 0.8125rem;
  }
`;

/* ── content ── */

const Content = styled(motion.div)`
  min-width: 0;
`;

const DocSection = styled(motion.section)`
  margin-bottom: 56px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
  scroll-margin-top: 96px;
`;

const Paragraph = styled.p`
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepList = styled.ol`
  padding-left: 20px;
  margin-bottom: 16px;

  li {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 8px;
    padding-left: 4px;
  }
`;

const BulletList = styled.ul`
  padding-left: 20px;
  margin-bottom: 16px;

  li {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 6px;
    padding-left: 4px;
  }
`;

const Tip = styled.div`
  background: ${({ theme }) => theme.accentLight};
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
`;


/* ───────────────────── data ───────────────────── */

const SECTION_IDS = [
  'getting-started',
  'adding',
  'managing',
  'spending',
  'reminders',
  'privacy',
  'ai',
  'customization',
  'export',
  'icloud',
  'faq',
] as const;

/* ───────────────────── component ───────────────────── */

export function DocsPage() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);
  const { ref, isInView } = useScrollAnimation(0.05);

  // track scroll position to highlight sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <Container>
        <HeroSection>
          <Title>{t('docs.title')}</Title>
          <Subtitle>{t('docs.subtitle')}</Subtitle>
        </HeroSection>

        <Layout>
          <Sidebar>
            {SECTION_IDS.map((id) => (
              <SidebarLink
                key={id}
                href={`#${id}`}
                $active={activeId === id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(id);
                }}
              >
                {t(`docs.nav.${id}`)}
              </SidebarLink>
            ))}
          </Sidebar>

          <Content
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Getting Started */}
            <DocSection id="getting-started" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.getting-started')}</SectionTitle>
              <Paragraph>{t('docs.gettingStarted.intro')}</Paragraph>
              <StepList>
                <li>{t('docs.gettingStarted.step1')}</li>
                <li>{t('docs.gettingStarted.step2')}</li>
                <li>{t('docs.gettingStarted.step3')}</li>
              </StepList>
              <Tip>{t('docs.gettingStarted.tip')}</Tip>
            </DocSection>

            {/* Adding Subscriptions */}
            <DocSection id="adding" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.adding')}</SectionTitle>
              <Paragraph>{t('docs.adding.intro')}</Paragraph>
              <BulletList>
                <li><strong>{t('docs.adding.manual')}</strong> — {t('docs.adding.manualDesc')}</li>
                <li><strong>{t('docs.adding.receipt')}</strong> — {t('docs.adding.receiptDesc')}</li>
                <li><strong>{t('docs.adding.screenshot')}</strong> — {t('docs.adding.screenshotDesc')}</li>
                <li><strong>{t('docs.adding.natural')}</strong> — {t('docs.adding.naturalDesc')}</li>
              </BulletList>
              <Tip>{t('docs.adding.tip')}</Tip>
            </DocSection>

            {/* Managing */}
            <DocSection id="managing" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.managing')}</SectionTitle>
              <Paragraph>{t('docs.managing.intro')}</Paragraph>
              <BulletList>
                <li><strong>{t('docs.managing.calendar')}</strong> — {t('docs.managing.calendarDesc')}</li>
                <li><strong>{t('docs.managing.list')}</strong> — {t('docs.managing.listDesc')}</li>
                <li><strong>{t('docs.managing.categories')}</strong> — {t('docs.managing.categoriesDesc')}</li>
                <li><strong>{t('docs.managing.edit')}</strong> — {t('docs.managing.editDesc')}</li>
              </BulletList>
            </DocSection>

            {/* Spending */}
            <DocSection id="spending" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.spending')}</SectionTitle>
              <Paragraph>{t('docs.spending.intro')}</Paragraph>
              <BulletList>
                <li>{t('docs.spending.monthly')}</li>
                <li>{t('docs.spending.annual')}</li>
                <li>{t('docs.spending.category')}</li>
                <li>{t('docs.spending.forecast')}</li>
              </BulletList>
            </DocSection>

            {/* Reminders */}
            <DocSection id="reminders" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.reminders')}</SectionTitle>
              <Paragraph>{t('docs.reminders.intro')}</Paragraph>
              <StepList>
                <li>{t('docs.reminders.step1')}</li>
                <li>{t('docs.reminders.step2')}</li>
                <li>{t('docs.reminders.step3')}</li>
              </StepList>
              <Tip>{t('docs.reminders.tip')}</Tip>
            </DocSection>

            {/* Privacy */}
            <DocSection id="privacy" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.privacy')}</SectionTitle>
              <Paragraph>{t('docs.privacy.intro')}</Paragraph>
              <BulletList>
                <li>{t('docs.privacy.noAccount')}</li>
                <li>{t('docs.privacy.noTracking')}</li>
                <li>{t('docs.privacy.faceId')}</li>
                <li>{t('docs.privacy.network')}</li>
              </BulletList>
              <Paragraph>{t('docs.privacy.statement')}</Paragraph>
            </DocSection>

            {/* AI */}
            <DocSection id="ai" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.ai')}</SectionTitle>
              <Paragraph>{t('docs.ai.intro')}</Paragraph>
              <BulletList>
                <li><strong>{t('docs.ai.scan')}</strong> — {t('docs.ai.scanDesc')}</li>
                <li><strong>{t('docs.ai.nlp')}</strong> — {t('docs.ai.nlpDesc')}</li>
                <li><strong>{t('docs.ai.categorize')}</strong> — {t('docs.ai.categorizeDesc')}</li>
                <li><strong>{t('docs.ai.duplicates')}</strong> — {t('docs.ai.duplicatesDesc')}</li>
                <li><strong>{t('docs.ai.summary')}</strong> — {t('docs.ai.summaryDesc')}</li>
              </BulletList>
              <Tip>{t('docs.ai.tip')}</Tip>
            </DocSection>

            {/* Customization */}
            <DocSection id="customization" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.customization')}</SectionTitle>
              <Paragraph>{t('docs.customization.intro')}</Paragraph>
              <BulletList>
                <li><strong>{t('docs.customization.icons')}</strong> — {t('docs.customization.iconsDesc')}</li>
                <li><strong>{t('docs.customization.themes')}</strong> — {t('docs.customization.themesDesc')}</li>
                <li><strong>{t('docs.customization.accent')}</strong> — {t('docs.customization.accentDesc')}</li>
                <li><strong>{t('docs.customization.currency')}</strong> — {t('docs.customization.currencyDesc')}</li>
              </BulletList>
            </DocSection>

            {/* Export */}
            <DocSection id="export" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.export')}</SectionTitle>
              <Paragraph>{t('docs.export.intro')}</Paragraph>
              <BulletList>
                <li><strong>CSV</strong> — {t('docs.export.csv')}</li>
                <li><strong>SQL</strong> — {t('docs.export.sql')}</li>
              </BulletList>
              <StepList>
                <li>{t('docs.export.step1')}</li>
                <li>{t('docs.export.step2')}</li>
                <li>{t('docs.export.step3')}</li>
              </StepList>
            </DocSection>

            {/* iCloud */}
            <DocSection id="icloud" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.icloud')}</SectionTitle>
              <Paragraph>{t('docs.icloud.intro')}</Paragraph>
              <StepList>
                <li>{t('docs.icloud.step1')}</li>
                <li>{t('docs.icloud.step2')}</li>
                <li>{t('docs.icloud.step3')}</li>
              </StepList>
              <Tip>{t('docs.icloud.tip')}</Tip>
            </DocSection>

            {/* FAQ */}
            <DocSection id="faq" variants={fadeInUp}>
              <SectionTitle>{t('docs.nav.faq')}</SectionTitle>

              <Paragraph><strong>{t('docs.faq.q1')}</strong></Paragraph>
              <Paragraph>{t('docs.faq.a1')}</Paragraph>

              <Paragraph><strong>{t('docs.faq.q2')}</strong></Paragraph>
              <Paragraph>{t('docs.faq.a2')}</Paragraph>

              <Paragraph><strong>{t('docs.faq.q3')}</strong></Paragraph>
              <Paragraph>{t('docs.faq.a3')}</Paragraph>

              <Paragraph><strong>{t('docs.faq.q4')}</strong></Paragraph>
              <Paragraph>{t('docs.faq.a4')}</Paragraph>

              <Paragraph><strong>{t('docs.faq.q5')}</strong></Paragraph>
              <Paragraph>{t('docs.faq.a5')}</Paragraph>
            </DocSection>
          </Content>
        </Layout>
      </Container>
    </PageWrapper>
  );
}
