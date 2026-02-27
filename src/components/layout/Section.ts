import styled from 'styled-components';

export const Section = styled.section`
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 64px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
`;

export const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;
