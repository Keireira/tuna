'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Container from './Container';

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

const FooterLink = styled(Link)`
	color: ${({ theme }) => theme.textSecondary};
	transition: color 0.2s;

	&:hover {
		color: ${({ theme }) => theme.accent};
	}
`;

const Footer = () => {
	const { t, i18n } = useTranslation('landing');
	const params = useParams<{ locale?: string }>();
	const locale = params.locale ?? i18n.language;

	return (
		<FooterWrapper>
			<Container>
				<FooterInner>
					<FooterLink href={`/${locale}/terms`}>{t('footer.terms')}</FooterLink>
					<span>·</span>
					<FooterLink href={`/${locale}/privacy`}>{t('footer.privacy')}</FooterLink>
					<span>·</span>
					<FooterLink href={`/${locale}/security`}>{t('footer.security')}</FooterLink>
					<span>·</span>
					<FooterLink href={`/${locale}/mcp`}>{t('footer.mcp')}</FooterLink>
				</FooterInner>
			</Container>
		</FooterWrapper>
	);
};

export default Footer;
