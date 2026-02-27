import styled from 'styled-components';

export const GlassCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.cardHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;
