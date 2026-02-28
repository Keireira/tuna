import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import type { ThemeMode } from '@/styles/theme';
import { Container } from './Container';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

const Nav = styled(motion.nav)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 12px 0;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: ${({ theme, $scrolled }) =>
    $scrolled ? theme.navBg : 'transparent'};
  border-bottom: 1px solid
    ${({ theme, $scrolled }) =>
      $scrolled ? theme.navBorder : 'transparent'};
  transition: background 0.3s ease, border-color 0.3s ease;
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
`;

const LogoIcon = styled(motion.img)`
  width: 36px;
  height: 36px;
  clip-path: url(#squircle);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  padding: 6px 12px;
  border-radius: 980px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textSecondary)};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 980px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};

  @media (max-width: 480px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.navBg};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.navBorder};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
`;

const MobileCtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  border-radius: 980px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${({ theme }) => theme.accent};
  color: #fff;
`;

interface NavbarProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  appIconSrc: string;
}

export function Navbar({ themeMode, onToggleTheme, appIconSrc }: NavbarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Container>
          <NavInner>
            <Logo to="/">
              <LogoIcon
                key={appIconSrc}
                src={appIconSrc}
                alt="Uha"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              />
              Uha
            </Logo>
            <NavRight>
              <NavLinks>
                <NavLink to="/docs" $active={location.pathname === '/docs'}>
                  {t('nav.docs')}
                </NavLink>
              </NavLinks>
              <LanguageSwitcher />
              <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
              <CtaButton href="https://apps.apple.com/app/uha" target="_blank" rel="noopener">{t('nav.download')}</CtaButton>
              <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {mobileOpen ? (
                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  ) : (
                    <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  )}
                </svg>
              </MobileMenuButton>
            </NavRight>
          </NavInner>
        </Container>
      </Nav>
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavLink to="/docs" onClick={() => setMobileOpen(false)}>
              {t('nav.docs')}
            </MobileNavLink>
            <MobileCtaButton href="https://apps.apple.com/app/uha" target="_blank" rel="noopener" onClick={() => setMobileOpen(false)}>
              {t('nav.download')}
            </MobileCtaButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
