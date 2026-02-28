'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { languages } from '@/i18n/config';

const Wrapper = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.cardHover};
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 140px;
  background: ${({ theme }) => theme.surfaceSolid};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  z-index: 100;
`;

const Option = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  background: ${({ $active, theme }) =>
    $active ? theme.accentLight : 'transparent'};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.accentLight};
  }
`;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('uha-lang', code);
    setOpen(false);
  };

  return (
    <Wrapper ref={ref}>
      <Trigger onClick={() => setOpen(!open)}>
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
      </Trigger>
      <AnimatePresence>
        {open && (
          <Dropdown
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map((lang) => (
              <Option
                key={lang.code}
                $active={lang.code === i18n.language}
                onClick={() => handleChange(lang.code)}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </Option>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
