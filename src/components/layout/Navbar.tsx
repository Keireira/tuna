'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemeMode } from '@styles/theme';
import Container from './Container';
import { ThemeToggle } from '@common/ThemeToggle';
import { LanguageSwitcher } from '@common/LanguageSwitcher';

const APP_STORE_URL = 'https://apps.apple.com/us/app/uha-subscriptions-tracker/id6748603444';
const LOGO_SUBTITLE_BY_LOCALE = {
	en: 'Subscriptions Tracker',
	ru: 'Трекер подписок',
	es: 'Control de suscripciones',
	kk: 'Жазылымдар трекері',
	ja: 'サブスク管理',
} as const;

type LogoSubtitleLocale = keyof typeof LOGO_SUBTITLE_BY_LOCALE;

const isLogoSubtitleLocale = (locale: string): locale is LogoSubtitleLocale =>
	locale in LOGO_SUBTITLE_BY_LOCALE;

const Nav = styled(motion.nav)<{ $scrolled: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	padding: 12px 0;
	background: ${({ theme, $scrolled }) => ($scrolled ? theme.navBg : 'transparent')};
	border-bottom: 1px solid ${({ theme, $scrolled }) => ($scrolled ? theme.navBorder : 'transparent')};
	transition:
		background 0.3s ease,
		border-color 0.3s ease;
`;

const NavInner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Logo = styled(Link)`
	display: flex;
	align-items: center;
	gap: 12px;
	color: ${({ theme }) => theme.text};
	text-decoration: none;
`;

const LogoIcon = styled(motion.img)`
	width: 36px;
	height: 36px;
	clip-path: url(#squircle);
`;

const LogoText = styled.span`
	display: flex;
	flex-direction: column;
	gap: 3px;
	line-height: 1;
`;

const LogoName = styled.span`
	font-size: 1.35rem;
	font-weight: 750;
	letter-spacing: 0;
`;

const LogoSubtitle = styled.span`
	font-size: 0.72rem;
	font-weight: 600;
	letter-spacing: 0;
	line-height: 1;
	color: ${({ theme }) => theme.textSecondary};
	white-space: nowrap;

	@media (max-width: 520px) {
		display: none;
	}
`;

const NavRight = styled.div`
	display: flex;
	align-items: center;
	gap: 18px;
`;

const CtaButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 32px;
	padding: 0;
	border: 0;
	border-radius: 0;
	font-size: 0.95rem;
	font-weight: 650;
	background: transparent;
	color: ${({ theme }) => theme.textSecondary};
	text-decoration: underline;
	text-decoration-color: transparent;
	text-underline-offset: 5px;
	transition:
		color 0.2s,
		text-decoration-color 0.2s;

	&:hover {
		color: ${({ theme }) => theme.accent};
		text-decoration-color: currentColor;
	}
`;

interface NavbarProps {
	themeMode: ThemeMode;
	onToggleTheme: () => void;
}

const Navbar = ({ themeMode, onToggleTheme }: NavbarProps) => {
	const params = useParams<{ locale?: string }>();
	const locale = params.locale ?? 'en';
	const logoSubtitle = isLogoSubtitleLocale(locale)
		? LOGO_SUBTITLE_BY_LOCALE[locale]
		: LOGO_SUBTITLE_BY_LOCALE.en;
	const [scrolled, setScrolled] = useState(false);

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
						<Logo href={`/${locale}`}>
							<LogoIcon
								src="/assets/icons/fish.png"
								alt="Uha"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: 'spring', stiffness: 400, damping: 20 }}
							/>
							<LogoText>
								<LogoName>Uha</LogoName>
								<LogoSubtitle>{logoSubtitle}</LogoSubtitle>
							</LogoText>
						</Logo>

						<NavRight>
							<LanguageSwitcher />
							<ThemeToggle mode={themeMode} onToggle={onToggleTheme} />

							<CtaButton href={APP_STORE_URL} target="_blank" rel="noopener">
								App Store
							</CtaButton>
						</NavRight>
					</NavInner>
				</Container>
			</Nav>
		</>
	);
};

export default Navbar;
