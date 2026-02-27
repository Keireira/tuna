import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../layout/Container';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* ── Layout ── */

const AIScreen = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 64px 0;
    min-height: auto;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const AIIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  margin: 0 auto 28px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--uha-accent), var(--uha-accent-hover, var(--uha-accent)));
  color: #fff;
  box-shadow: 0 12px 40px var(--uha-accent-40);
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 640px;
  margin: 0 auto;
`;

/* ── Tabs ── */

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 980px;
  border: 1.5px solid ${({ $active, theme }) =>
    $active ? theme.accent : theme.cardBorder};
  background: ${({ $active, theme }) =>
    $active ? theme.accentLight : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.accent : theme.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

/* ── Split layout ── */

const SplitPane = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  min-height: 280px;

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

/* ── Footer ── */

const Disclaimer = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textTertiary};
  line-height: 1.5;
  margin-top: 16px;
`;

/* ── Shared demo styles ── */

const DemoCard = styled.div`
  width: 100%;
  max-width: 340px;
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const DemoLabel = styled.div`
  font-size: 0.7rem;
  color: var(--uha-accent);
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const blinkKf = keyframes`
  50% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--uha-accent);
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: ${blinkKf} 1s step-end infinite;
`;

/* ═══════════════════════════════════════════
   Demo 1: Scan & Fill
   ═══════════════════════════════════════════ */

const scanLineKf = keyframes`
  0%   { top: 0; }
  70%  { top: calc(100% - 2px); }
  100% { top: calc(100% - 2px); opacity: 0; }
`;

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--uha-accent);
  box-shadow: 0 0 12px var(--uha-accent-50);
  animation: ${scanLineKf} 1.5s ease-out forwards;
  z-index: 2;
`;

const ReceiptLine = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  font-size: 0.85rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ReceiptLabel = styled.span`
  color: ${({ theme }) => theme.textTertiary};
`;

const ReceiptValue = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const RECEIPT_LINES = [
  { label: 'Service', value: 'Netflix Premium' },
  { label: 'Amount', value: '$22.99' },
  { label: 'Cycle', value: 'Monthly' },
  { label: 'Next renewal', value: 'Mar 15, 2026' },
];

function ScanFillDemo() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <DemoCard>
      {phase >= 1 && phase < 2 && <ScanLine />}
      <DemoLabel>Receipt</DemoLabel>
      {RECEIPT_LINES.map((line, i) => (
        <ReceiptLine
          key={line.label}
          initial={{ opacity: 0.3, filter: 'blur(3px)' }}
          animate={
            phase >= 2
              ? { opacity: 1, filter: 'blur(0px)' }
              : {}
          }
          transition={{ delay: i * 0.12, duration: 0.3 }}
        >
          <ReceiptLabel>{line.label}</ReceiptLabel>
          <ReceiptValue>{line.value}</ReceiptValue>
        </ReceiptLine>
      ))}
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Demo 2: Natural Language Input
   ═══════════════════════════════════════════ */

const FakeInput = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.surface};
  border: 1.5px solid ${({ theme }) => theme.cardBorder};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  min-height: 44px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ParsedChips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled(motion.div)`
  padding: 6px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.accentLight};
  font-size: 0.8rem;
  font-weight: 600;
`;

const ChipLabel = styled.span`
  color: ${({ theme }) => theme.textTertiary};
  margin-right: 6px;
`;

const ChipValue = styled.span`
  color: ${({ theme }) => theme.accent};
`;

const INPUT_TEXT = 'netflix 799 monthly';
const PARSED = [
  { label: 'Name', value: 'Netflix' },
  { label: 'Price', value: '$7.99' },
  { label: 'Cycle', value: 'Monthly' },
];

function NaturalInputDemo() {
  const [charIndex, setCharIndex] = useState(0);
  const [showChips, setShowChips] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        if (cancelled) {
          clearInterval(tick);
          return;
        }
        i++;
        setCharIndex(i);
        if (i >= INPUT_TEXT.length) {
          clearInterval(tick);
          setTimeout(() => {
            if (!cancelled) setShowChips(true);
          }, 500);
        }
      }, 70);
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 340 }}>
      <FakeInput>
        {INPUT_TEXT.slice(0, charIndex)}
        {charIndex < INPUT_TEXT.length && <Cursor />}
      </FakeInput>
      {showChips && (
        <ParsedChips>
          {PARSED.map((chip, i) => (
            <Chip
              key={chip.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <ChipLabel>{chip.label}</ChipLabel>
              <ChipValue>{chip.value}</ChipValue>
            </Chip>
          ))}
        </ParsedChips>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Demo 3: Smart Reminders
   ═══════════════════════════════════════════ */

const TimelineBox = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TimelineLabel = styled.div<{ $accent?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ $accent, theme }) => ($accent ? theme.accent : theme.textTertiary)};
  margin-bottom: 6px;
`;

const TimelineTrack = styled.div`
  position: relative;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  overflow: hidden;
`;

const TimelineMarker = styled(motion.div)<{ $accent?: boolean }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 36px;
  border-radius: 6px;
  background: ${({ $accent }) =>
    $accent ? 'var(--uha-accent)' : 'rgba(128,128,128,0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $accent }) => ($accent ? '#fff' : 'inherit')};
`;

const RenewalMark = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textTertiary};
`;

const TimelineTicks = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.textTertiary};
  padding: 2px 4px 0;
`;

const BellSvg = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

function SmartRemindersDemo() {
  return (
    <TimelineBox>
      <div>
        <TimelineLabel>Fixed reminder</TimelineLabel>
        <TimelineTrack>
          <TimelineMarker initial={{ left: '70%' }} animate={{ left: '70%' }}>
            <BellSvg />
          </TimelineMarker>
          <RenewalMark>Renewal</RenewalMark>
        </TimelineTrack>
        <TimelineTicks>
          <span>7d</span>
          <span>3d</span>
          <span>Due</span>
        </TimelineTicks>
      </div>

      <div>
        <TimelineLabel $accent>Smart timing</TimelineLabel>
        <TimelineTrack>
          <TimelineMarker
            $accent
            initial={{ left: '70%' }}
            animate={{ left: '42%' }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <BellSvg />
          </TimelineMarker>
          <RenewalMark>Renewal</RenewalMark>
        </TimelineTrack>
        <TimelineTicks>
          <span>7d</span>
          <span>3d</span>
          <span>Due</span>
        </TimelineTicks>
      </div>
    </TimelineBox>
  );
}

/* ═══════════════════════════════════════════
   Demo 4: Auto-Categorize
   ═══════════════════════════════════════════ */

const CatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const CatIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #e50914;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 0.7rem;
  flex-shrink: 0;
`;

const CatName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const AutoField = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.accentLight};
  font-size: 0.85rem;

  & + & {
    margin-top: 10px;
  }
`;

const FieldLabel = styled.span`
  color: ${({ theme }) => theme.textTertiary};
`;

const FieldValue = styled.span`
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
`;

const AUTO_FIELDS = [
  { label: 'Category', value: 'Entertainment', delay: 0.6 },
  { label: 'Icon', value: 'Matched', delay: 0.9 },
  { label: 'Typical price', value: '$15.49/mo', delay: 1.2 },
];

function AutoCategorizeDemo() {
  return (
    <DemoCard>
      <CatHeader>
        <CatIcon>N</CatIcon>
        <CatName>Netflix</CatName>
      </CatHeader>
      <div>
        {AUTO_FIELDS.map((f) => (
          <AutoField
            key={f.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: f.delay, duration: 0.3 }}
          >
            <FieldLabel>{f.label}</FieldLabel>
            <FieldValue>{f.value}</FieldValue>
          </AutoField>
        ))}
      </div>
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Demo 5: Duplicate Detection
   ═══════════════════════════════════════════ */

const DupBox = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubCard = styled.div<{ $warn?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid
    ${({ $warn, theme }) => ($warn ? '#ff6b35' : theme.cardBorder)};
  transition: border-color 0.3s;
`;

const SubIcon = styled.div<{ $bg: string }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.65rem;
  flex-shrink: 0;
`;

const SubName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const SubPrice = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const WarningBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(255, 107, 53, 0.12);
  border: 1px solid rgba(255, 107, 53, 0.25);
  font-size: 0.8rem;
  color: #ff6b35;
  font-weight: 600;
`;

function DuplicatesDemo() {
  const [showWarn, setShowWarn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowWarn(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <DupBox>
      <SubCard>
        <SubIcon $bg="#333">A1</SubIcon>
        <div>
          <SubName>Apple One</SubName>
          <SubPrice>$19.95/mo</SubPrice>
        </div>
      </SubCard>
      <SubCard $warn={showWarn}>
        <SubIcon $bg="#fc3c44">AM</SubIcon>
        <div>
          <SubName>Apple Music</SubName>
          <SubPrice>$10.99/mo</SubPrice>
        </div>
      </SubCard>
      <AnimatePresence>
        {showWarn && (
          <WarningBadge
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Included in Apple One
          </WarningBadge>
        )}
      </AnimatePresence>
    </DupBox>
  );
}

/* ═══════════════════════════════════════════
   Demo 6: Spending Summary
   ═══════════════════════════════════════════ */

const SummaryText = styled.div`
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
`;

const AccentSpan = styled.span`
  color: var(--uha-accent);
  font-weight: 700;
`;

const SUMMARY_PARTS = [
  { text: 'This month you\u2019ll spend ', accent: false },
  { text: '12% more', accent: true },
  { text: ' because of the annual ', accent: false },
  { text: 'Figma', accent: true },
  { text: ' renewal.', accent: false },
];

const SUMMARY_FULL = SUMMARY_PARTS.map((p) => p.text).join('');

function SpendingSummaryDemo() {
  const [charIndex, setCharIndex] = useState(0);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        if (cancelled) {
          clearInterval(tick);
          return;
        }
        i++;
        setCharIndex(i);
        if (i >= SUMMARY_FULL.length) {
          clearInterval(tick);
          setTimeout(() => {
            if (!cancelled) setHighlight(true);
          }, 300);
        }
      }, 35);
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  const rendered: React.ReactNode[] = [];
  let offset = 0;
  for (let idx = 0; idx < SUMMARY_PARTS.length; idx++) {
    const part = SUMMARY_PARTS[idx];
    const end = Math.min(charIndex, offset + part.text.length);
    if (end > offset) {
      const slice = part.text.slice(0, end - offset);
      if (part.accent && highlight) {
        rendered.push(<AccentSpan key={idx}>{slice}</AccentSpan>);
      } else {
        rendered.push(<span key={idx}>{slice}</span>);
      }
    }
    offset += part.text.length;
  }

  return (
    <DemoCard>
      <DemoLabel>AI Summary</DemoLabel>
      <SummaryText>
        {rendered}
        {charIndex < SUMMARY_FULL.length && <Cursor />}
      </SummaryText>
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Tab config
   ═══════════════════════════════════════════ */

type AITabKey =
  | 'scanFill'
  | 'naturalInput'
  | 'smartReminders'
  | 'autoCategorize'
  | 'duplicates'
  | 'spendingSummary';

const AI_TABS: AITabKey[] = [
  'scanFill',
  'naturalInput',
  'smartReminders',
  'autoCategorize',
  'duplicates',
  'spendingSummary',
];

const DEMO_MAP: Record<AITabKey, React.FC> = {
  scanFill: ScanFillDemo,
  naturalInput: NaturalInputDemo,
  smartReminders: SmartRemindersDemo,
  autoCategorize: AutoCategorizeDemo,
  duplicates: DuplicatesDemo,
  spendingSummary: SpendingSummaryDemo,
};

/* ═══════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════ */

export function AIFeature() {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<AITabKey>('scanFill');

  const Demo = DEMO_MAP[activeTab];

  return (
    <AIScreen>
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Header>
            <motion.div variants={fadeInUp}>
              <AIIcon>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </AIIcon>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Title>{t('aiFeature.title')}</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Subtitle>{t('aiFeature.subtitle')}</Subtitle>
            </motion.div>
          </Header>

          <motion.div variants={fadeInUp}>
            <TabBar>
              {AI_TABS.map((key) => (
                <Tab
                  key={key}
                  $active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                >
                  {t(`aiFeature.cards.${key}.title`)}
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
                  <Demo />
                </DemoSide>

                <DescSide>
                  <DescTitle>
                    {t(`aiFeature.cards.${activeTab}.title`)}
                  </DescTitle>
                  <DescText>
                    {t(`aiFeature.cards.${activeTab}.description`)}
                  </DescText>
                  <Disclaimer>
                    {t('aiFeature.premium')}
                    {' \u00b7 '}
                    {t('aiFeature.onDeviceNote')}
                  </Disclaimer>
                </DescSide>
              </SplitPane>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>
    </AIScreen>
  );
}
