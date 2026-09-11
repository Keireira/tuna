'use client';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '@/lib/i18n';
import type { LandingCopyT } from '@/content/landing';

type PropsT = {
	copy: LandingCopyT;
	locale: string;
	pagePath?: string;
	simple?: boolean;
	onToggleEffects?: () => void;
};
const LandingNav = ({ copy, locale, pagePath = '', simple, onToggleEffects }: PropsT) => {
	const homeHref = pagePath ? `/${locale}` : '';
	const localePicker = useRef<HTMLDetailsElement>(null);
	const navigation = useRef<HTMLElement>(null);
	const navigationMeasure = useRef<HTMLSpanElement>(null);
	const [visibleLinks, setVisibleLinks] = useState(0);
	const [minimumNavWidth, setMinimumNavWidth] = useState<number>();
	const secondaryLinks = [
		['discovery', copy.nav.search],
		['analytics', copy.nav.analytics],
		['filters', copy.nav.filters],
		['timeline', copy.nav.timeline],
		['craft', copy.nav.craft],
		['more', copy.nav.more]
	] as const;

	useEffect(() => {
		const nav = navigation.current;
		const measure = navigationMeasure.current;
		if (!nav || !measure) return;

		let frame = 0;
		const updateVisibleLinks = () => {
			const widths = Array.from(measure.children, (item) => item.getBoundingClientRect().width);
			const unlimitedWidth = widths.pop() ?? 0;
			setMinimumNavWidth(Math.ceil(unlimitedWidth) + 1);
			const gap = Number.parseFloat(getComputedStyle(nav).columnGap) || 0;
			let usedWidth = unlimitedWidth;
			let count = 0;
			for (const width of widths) {
				if (usedWidth + gap + width > nav.clientWidth - 1) break;
				usedWidth += gap + width;
				count += 1;
			}
			setVisibleLinks(count);
		};
		const scheduleMeasure = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(updateVisibleLinks);
		};
		const observer = new ResizeObserver(scheduleMeasure);
		observer.observe(nav);
		observer.observe(measure);
		updateVisibleLinks();
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [copy.nav]);

	useEffect(() => {
		const dismissOutside = (event: PointerEvent) => {
			const picker = localePicker.current;
			if (picker?.open && !event.composedPath().includes(picker)) {
				picker.open = false;
			}
		};
		document.addEventListener('pointerdown', dismissOutside, true);
		return () => document.removeEventListener('pointerdown', dismissOutside, true);
	}, []);
	return (
		<header className="landing-header">
			<a className="skip-link" href="#main-content">
				{copy.nav.skip}
			</a>
			<div className="brand-lockup">
				<a className="brand" href={`/${locale}`} aria-label="UHA">
					<img src="/assets/icons/fish.png" width="44" height="44" alt="" />
					<span className="brand-type">
						<span className="brand-name">UHA</span>
						<span className="brand-caption">{copy.brand.subtitle}</span>
					</span>
				</a>
			</div>
			<nav
				ref={navigation}
				className="site-nav"
				aria-label={copy.nav.explore}
				style={{ minWidth: minimumNavWidth, flexBasis: minimumNavWidth }}
			>
				{secondaryLinks.map(([section, label], index) => (
					<a
						key={section}
						href={`${homeHref}#${section}`}
						hidden={index >= visibleLinks}
						tabIndex={index >= visibleLinks ? -1 : undefined}
					>
						{label}
					</a>
				))}
				<a className="nav-unlimited" href={`${homeHref}#unlimited`}>
					<span>{copy.nav.unlimited}</span>
				</a>
				{/* Measure every label without adding duplicate links or overflowing the page. */}
				<span className="site-nav-measure" aria-hidden="true">
					<span ref={navigationMeasure} className="site-nav-measure-row">
						{secondaryLinks.map(([section, label]) => (
							<span key={section}>{label}</span>
						))}
						<span className="nav-unlimited">
							<span>{copy.nav.unlimited}</span>
						</span>
					</span>
				</span>
			</nav>
			<div className="nav-actions">
				{onToggleEffects && (
					<button className="effects-switch" onClick={onToggleEffects} aria-pressed={simple}>
						<span className="effects-indicator" aria-hidden="true" />
						{simple ? copy.nav.restore : copy.nav.simple}
					</button>
				)}
				<details
					ref={localePicker}
					className="locale-picker"
					onKeyDown={(event) => {
						if (event.key === 'Escape') {
							event.currentTarget.open = false;
							event.currentTarget.querySelector('summary')?.focus();
						}
					}}
				>
					<summary aria-label={`${copy.nav.language}: ${LANGUAGES.find((language) => language.code === locale)?.name}`}>
						{LANGUAGES.find((language) => language.code === locale)?.name}
						<svg
							className="locale-picker-chevron"
							width="18"
							height="18"
							viewBox="0 0 20 20"
							fill="none"
							aria-hidden="true"
							focusable="false"
						>
							<path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="2.75" strokeLinecap="square" />
						</svg>
					</summary>
					<div>
						{LANGUAGES.map((language) => (
							<a
								key={language.code}
								href={`/${language.code}${pagePath}`}
								hrefLang={language.code}
								lang={language.code}
								aria-current={locale === language.code ? 'page' : undefined}
							>
								{language.name}
								<span aria-hidden="true">{locale === language.code ? '✓' : language.code.toUpperCase()}</span>
							</a>
						))}
					</div>
				</details>
			</div>
		</header>
	);
};
export default LandingNav;
