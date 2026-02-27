import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Container } from './Container';

const FooterWrapper = styled.footer`
  padding: 40px 0;
  background: ${({ theme }) => theme.footerBg};
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export function Footer() {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <Container>
        <FooterInner>
          <span>{t('footer.madeWith')}</span>
          <span>·</span>
          <span>Uha</span>
        </FooterInner>
      </Container>
    </FooterWrapper>
  );
}
