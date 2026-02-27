import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../common/Button';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DownloadSection = styled(Section)`
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  white-space: pre-line;
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const MacNote = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textTertiary};
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export function Download() {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();

  return (
    <DownloadSection id="download">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp}>
            <Title>{t('download.title')}</Title>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Subtitle>{t('download.subtitle')}</Subtitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ButtonGroup>
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
                {t('download.appStore')}
              </Button>
            </ButtonGroup>
            <MacNote>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              {t('pricing.macos')}
            </MacNote>
          </motion.div>
        </motion.div>
      </Container>
    </DownloadSection>
  );
}
