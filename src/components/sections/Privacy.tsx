import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../layout/Container';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* ── Layout ── */

const PrivacyScreen = styled.section`
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

const ShieldIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  margin: 0 auto 28px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #34C759 0%, #30D158 100%);
  color: #fff;
  box-shadow: 0 12px 40px rgba(52, 199, 89, 0.3);
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
  border: 1.5px solid ${({ $active }) =>
    $active ? '#34C759' : 'rgba(128,128,128,0.2)'};
  background: ${({ $active }) =>
    $active ? 'rgba(52, 199, 89, 0.12)' : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#34C759' : theme.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: #34C759;
    color: #34C759;
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

/* ── Statement ── */

const Statement = styled(motion.div)`
  text-align: center;
  padding: 32px 24px;
  border-radius: 20px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  margin-top: 40px;
`;

const StatementText = styled.p`
  font-size: clamp(1rem, 2vw, 1.15rem);
  font-weight: 600;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};

  span {
    color: #34C759;
  }
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
  color: #34C759;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

/* ═══════════════════════════════════════════
   Demo 1: No Accounts
   ═══════════════════════════════════════════ */

const FormField = styled(motion.div)<{ $struck?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textTertiary};
  position: relative;

  & + & {
    margin-top: 8px;
  }

  ${({ $struck }) =>
    $struck &&
    `
    &::after {
      content: '';
      position: absolute;
      left: 10px;
      right: 10px;
      top: 50%;
      height: 2px;
      background: #FF3B30;
    }
  `}
`;

const OpenBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(52, 199, 89, 0.12);
  color: #34C759;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 16px;
`;

function NoAccountsDemo() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <DemoCard>
      <DemoLabel>Registration</DemoLabel>
      <FormField
        $struck={phase >= 1}
        animate={{ opacity: phase >= 2 ? 0.4 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Email address
      </FormField>
      <FormField
        $struck={phase >= 1}
        animate={{ opacity: phase >= 2 ? 0.4 : 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Password
      </FormField>
      <FormField
        $struck={phase >= 1}
        animate={{ opacity: phase >= 2 ? 0.4 : 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Confirm password
      </FormField>
      {phase >= 2 && (
        <OpenBadge
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Just open and use
        </OpenBadge>
      )}
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Demo 2: No Tracking
   ═══════════════════════════════════════════ */

const SdkRow = styled(motion.div)<{ $struck?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  font-size: 0.85rem;

  &:last-child {
    border-bottom: none;
  }

  ${({ $struck }) =>
    $struck &&
    `
    text-decoration: line-through;
    opacity: 0.4;
  `}
`;

const SdkName = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const SdkStatus = styled.span<{ $removed?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $removed }) => ($removed ? '#FF3B30' : '#34C759')};
`;

const SDKS = [
  'Firebase Analytics',
  'Amplitude',
  'Crashlytics',
  'Facebook SDK',
  'Mixpanel',
];

function NoTrackingDemo() {
  const [struckCount, setStruckCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      i++;
      setStruckCount(i);
      if (i < SDKS.length) setTimeout(tick, 350);
    };
    const start = setTimeout(tick, 500);
    return () => { cancelled = true; clearTimeout(start); };
  }, []);

  return (
    <DemoCard>
      <DemoLabel>Third-party SDKs</DemoLabel>
      {SDKS.map((sdk, i) => (
        <SdkRow key={sdk} $struck={i < struckCount}>
          <SdkName>{sdk}</SdkName>
          <SdkStatus $removed={i < struckCount}>
            {i < struckCount ? 'Removed' : 'Active'}
          </SdkStatus>
        </SdkRow>
      ))}
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Demo 3: Face ID
   ═══════════════════════════════════════════ */

const scanPulse = keyframes`
  0%   { transform: scale(0.8); opacity: 0.6; }
  50%  { transform: scale(1.2); opacity: 0.2; }
  100% { transform: scale(0.8); opacity: 0.6; }
`;

const FaceIdBox = styled.div`
  width: 100%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ScanCircle = styled.div<{ $done?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid ${({ $done }) => ($done ? '#34C759' : 'rgba(128,128,128,0.3)')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: border-color 0.4s;
  color: ${({ $done }) => ($done ? '#34C759' : 'rgba(128,128,128,0.4)')};

  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid ${({ $done }) => ($done ? '#34C759' : 'rgba(128,128,128,0.15)')};
    animation: ${({ $done }) => ($done ? 'none' : scanPulse)} 1.5s ease-in-out infinite;
    transition: border-color 0.4s;
  }
`;

const LockLabel = styled(motion.div)<{ $unlocked?: boolean }>`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $unlocked }) => ($unlocked ? '#34C759' : 'rgba(128,128,128,0.5)')};
`;

function FaceIdDemo() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setUnlocked(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <FaceIdBox>
      <ScanCircle $done={unlocked}>
        {unlocked ? (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            <rect x="6" y="9" width="12" height="11" rx="2" />
          </svg>
        )}
      </ScanCircle>
      <AnimatePresence mode="wait">
        <LockLabel
          key={unlocked ? 'ok' : 'scan'}
          $unlocked={unlocked}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {unlocked ? 'Unlocked' : 'Scanning...'}
        </LockLabel>
      </AnimatePresence>
    </FaceIdBox>
  );
}

/* ═══════════════════════════════════════════
   Demo 4: Exchange Rates — the Only Request
   ═══════════════════════════════════════════ */

const LogRow = styled(motion.div)<{ $empty?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  font-size: 0.8rem;
  font-family: monospace;

  &:last-child {
    border-bottom: none;
  }

  ${({ $empty }) =>
    $empty &&
    `
    opacity: 0.25;
    font-style: italic;
  `}
`;

const LogDot = styled.span<{ $green?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $green }) => ($green ? '#34C759' : 'rgba(128,128,128,0.2)')};
  flex-shrink: 0;
`;

const LogText = styled.span`
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function RatesDemo() {
  const [showReq, setShowReq] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowReq(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <DemoCard>
      <DemoLabel>Network log</DemoLabel>
      {showReq && (
        <LogRow
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <LogDot $green />
          <LogText>GET /rates?date=2026-02-28</LogText>
        </LogRow>
      )}
      {[1, 2, 3, 4].map((i) => (
        <LogRow key={i} $empty>
          <LogDot />
          <LogText>—</LogText>
        </LogRow>
      ))}
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Demo 5: iCloud Backup
   ═══════════════════════════════════════════ */

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ToggleTrack = styled.button<{ $on: boolean }>`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  background: ${({ $on }) => ($on ? '#34C759' : 'rgba(128,128,128,0.25)')};
  position: relative;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
`;

const ToggleThumb = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const BackupInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(52, 199, 89, 0.1);
  font-size: 0.8rem;
  color: #34C759;
  font-weight: 500;
  margin-top: 12px;
`;

function ICloudDemo() {
  const [on, setOn] = useState(false);

  return (
    <DemoCard>
      <DemoLabel>Settings</DemoLabel>
      <ToggleRow>
        <ToggleLabel>iCloud Backup</ToggleLabel>
        <ToggleTrack $on={on} onClick={() => setOn(!on)}>
          <ToggleThumb
            animate={{ left: on ? 24 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </ToggleTrack>
      </ToggleRow>
      <AnimatePresence>
        {on && (
          <BackupInfo
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Encrypted by Apple, controlled by you
          </BackupInfo>
        )}
      </AnimatePresence>
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Demo 6: Export
   ═══════════════════════════════════════════ */

const FormatButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const FormatBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1.5px solid ${({ $active }) => ($active ? '#34C759' : 'rgba(128,128,128,0.2)')};
  background: ${({ $active }) => ($active ? 'rgba(52, 199, 89, 0.1)' : 'transparent')};
  color: ${({ $active, theme }) => ($active ? '#34C759' : theme.textSecondary)};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const FilePreview = styled(motion.div)`
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.surface};
  font-family: monospace;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  white-space: pre;
  overflow: hidden;
`;

const CSV_PREVIEW = `name,price,currency,cycle
Netflix,22.99,USD,monthly
Spotify,10.99,USD,monthly
iCloud+,2.99,USD,monthly`;

const SQL_PREVIEW = `INSERT INTO subscriptions
  (name, price, currency, cycle)
VALUES
  ('Netflix', 22.99, 'USD', 'monthly'),
  ('Spotify', 10.99, 'USD', 'monthly');`;

function ExportDemo() {
  const [format, setFormat] = useState<'csv' | 'sql'>('csv');

  return (
    <DemoCard>
      <DemoLabel>Export</DemoLabel>
      <FormatButtons>
        <FormatBtn $active={format === 'csv'} onClick={() => setFormat('csv')}>
          CSV
        </FormatBtn>
        <FormatBtn $active={format === 'sql'} onClick={() => setFormat('sql')}>
          SQL
        </FormatBtn>
      </FormatButtons>
      <AnimatePresence mode="wait">
        <FilePreview
          key={format}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {format === 'csv' ? CSV_PREVIEW : SQL_PREVIEW}
        </FilePreview>
      </AnimatePresence>
    </DemoCard>
  );
}

/* ═══════════════════════════════════════════
   Tab config
   ═══════════════════════════════════════════ */

type PrivacyTabKey =
  | 'noAccounts'
  | 'noTracking'
  | 'faceId'
  | 'rates'
  | 'icloud'
  | 'export';

const TABS: PrivacyTabKey[] = [
  'noAccounts',
  'noTracking',
  'faceId',
  'rates',
  'icloud',
  'export',
];

const DEMO_MAP: Record<PrivacyTabKey, React.FC> = {
  noAccounts: NoAccountsDemo,
  noTracking: NoTrackingDemo,
  faceId: FaceIdDemo,
  rates: RatesDemo,
  icloud: ICloudDemo,
  export: ExportDemo,
};

/* ═══════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════ */

export function Privacy() {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<PrivacyTabKey>('noAccounts');

  const Demo = DEMO_MAP[activeTab];

  return (
    <PrivacyScreen>
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Header>
            <motion.div variants={fadeInUp}>
              <ShieldIcon>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </ShieldIcon>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Title>{t('privacy.title')}</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Subtitle>{t('privacy.subtitle')}</Subtitle>
            </motion.div>
          </Header>

          <motion.div variants={fadeInUp}>
            <TabBar>
              {TABS.map((key) => (
                <Tab
                  key={key}
                  $active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                >
                  {t(`privacy.cards.${key}.title`)}
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
                    {t(`privacy.cards.${activeTab}.title`)}
                  </DescTitle>
                  <DescText>
                    {t(`privacy.cards.${activeTab}.description`)}
                  </DescText>
                </DescSide>
              </SplitPane>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Statement>
              <StatementText>
                {t('privacy.statement')}
              </StatementText>
            </Statement>
          </motion.div>
        </motion.div>
      </Container>
    </PrivacyScreen>
  );
}
