'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemeMode } from '@styles/theme';
import Container from './Container';
import { ThemeToggle } from '@common/ThemeToggle';
import { LanguageSwitcher } from '@common/LanguageSwitcher';

const Nav = styled(motion.nav)<{ $scrolled: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	padding: 12px 0;
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
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
`;

interface NavbarProps {
	themeMode: ThemeMode;
	onToggleTheme: () => void;
}

const Navbar = ({ themeMode, onToggleTheme }: NavbarProps) => {
	const { t } = useTranslation();
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
						<Logo href="/">
							<LogoIcon
								src="/assets/icons/fish.png"
								alt="Uha"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: 'spring', stiffness: 400, damping: 20 }}
							/>
							Uha
						</Logo>

						<NavRight>
							<LanguageSwitcher />
							<ThemeToggle mode={themeMode} onToggle={onToggleTheme} />

							<CtaButton href="https://testflight.apple.com/join/uVYrDkbA" target="_blank" rel="noopener">
								{t('nav.join_beta')}
							</CtaButton>
						</NavRight>
					</NavInner>
				</Container>
			</Nav>
		</>
	);
};

export default Navbar;
