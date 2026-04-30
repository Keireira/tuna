'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGUAGES, DEFAULT_LOCALE, isValidLocale, type TLocale } from '@lib/i18n';

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
	background: ${({ $active, theme }) => ($active ? theme.accentLight : 'transparent')};
	cursor: pointer;
	transition: background 0.15s;

	&:hover {
		background: ${({ theme }) => theme.accentLight};
	}
`;

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const pathname = usePathname();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const pathLocale = pathname.split('/')[1];
	const currentLocale: TLocale = isValidLocale(pathLocale)
		? pathLocale
		: isValidLocale(i18n.language)
			? i18n.language
			: DEFAULT_LOCALE;

	const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

	useEffect(() => {
		if (!open) return;

		const handlePointer = (event: PointerEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		const handleKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};

		document.addEventListener('pointerdown', handlePointer);
		document.addEventListener('keydown', handleKey);

		return () => {
			document.removeEventListener('pointerdown', handlePointer);
			document.removeEventListener('keydown', handleKey);
		};
	}, [open]);

	const handleChange = (code: TLocale) => {
		document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
		const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
		router.push(`/${code}${pathWithoutLocale}`);
		setOpen(false);
	};

	return (
		<Wrapper ref={ref}>
			<Trigger onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox" aria-label="Select language">
				<span aria-hidden="true">{current.flag}</span>
				<span>{current.code.toUpperCase()}</span>
			</Trigger>

			<AnimatePresence>
				{open && (
					<Dropdown
						role="listbox"
						initial={{ opacity: 0, y: -4, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.96 }}
						transition={{ duration: 0.15 }}
					>
						{LANGUAGES.map((lang) => (
							<Option
								key={lang.code}
								role="option"
								aria-selected={lang.code === currentLocale}
								$active={lang.code === currentLocale}
								onClick={() => handleChange(lang.code)}
							>
								<span aria-hidden="true">{lang.flag}</span>
								<span>{lang.name}</span>
							</Option>
						))}
					</Dropdown>
				)}
			</AnimatePresence>
		</Wrapper>
	);
};
