import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemeMode } from '@/styles/theme';

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
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

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  return (
    <ToggleButton onClick={onToggle} aria-label="Toggle theme">
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        key={mode}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'light' ? (
          <path
            d="M12 3V4M12 20V21M4 12H3M6.31 6.31L5.6 5.6M17.69 6.31L18.4 5.6M6.31 17.69L5.6 18.4M17.69 17.69L18.4 18.4M21 12H20M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : mode === 'dark' ? (
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </motion.svg>
    </ToggleButton>
  );
}
