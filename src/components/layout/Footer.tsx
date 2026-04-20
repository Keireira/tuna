'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
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
	const { t, i18n } = useTranslation();

	return (
		<FooterWrapper>
			<Container>
				<FooterInner>
					<span>{t('footer.madeWith')}</span>
					<span>·</span>
					<span>Uha</span>
					<span>·</span>
					<FooterLink href={`/${i18n.language}/terms`}>{t('footer.terms')}</FooterLink>
					<span>·</span>
					<FooterLink href={`/${i18n.language}/privacy`}>{t('footer.privacy')}</FooterLink>
					<span>·</span>
					<FooterLink href="/api/mcp">MCP</FooterLink>
				</FooterInner>
			</Container>
		</FooterWrapper>
	);
};

export default Footer;
