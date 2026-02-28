'use client';

import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary';
  $size?: 'md' | 'lg';
}

export const Button = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 980px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  ${({ $size = 'md' }) =>
    $size === 'lg'
      ? css`
          padding: 14px 32px;
          font-size: 1.05rem;
        `
      : css`
          padding: 12px 24px;
          font-size: 0.95rem;
        `}

  ${({ $variant = 'primary', theme }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.accent};
          color: #ffffff;
          &:hover {
            background: ${theme.accentHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 16px var(--uha-accent-40);
          }
        `
      : css`
          background: ${theme.surface};
          color: ${theme.text};
          border: 1px solid ${theme.cardBorder};
          backdrop-filter: blur(12px);
          &:hover {
            background: ${theme.cardHover};
            transform: translateY(-1px);
          }
        `}

  &:active {
    transform: translateY(0);
  }
`;
