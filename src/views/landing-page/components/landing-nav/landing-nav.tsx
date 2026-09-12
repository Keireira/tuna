'use client';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '@/lib/i18n';
import type { LandingCopyT } from '@/content/landing';
import BrandImage from '@/components/site-chrome/brand-image';

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
		const labels = Array.from(measure.children);
		const unlimited = labels[labels.length - 1];
		const measuredWidths = new Map<Element, number>();
		const updateVisibleLinks = () => {
			frame = 0;
			const navWidth = measuredWidths.get(nav);
			const rowWidth = measuredWidths.get(measure);
			if (navWidth === undefined || rowWidth === undefined || labels.some((label) => !measuredWidths.has(label)))
				return;
			const widths = labels.map((label) => measuredWidths.get(label) ?? 0);
			// The max-content row uses the same gap as the visible navigation.
			const gap = Math.max(0, (rowWidth - widths.reduce((total, width) => total + width, 0)) / (labels.length - 1));
			const unlimitedWidth = widths.pop() ?? 0;
			setMinimumNavWidth(Math.ceil(unlimitedWidth) + 1);
			let usedWidth = unlimitedWidth;
			let count = 0;
			for (const width of widths) {
				if (usedWidth + gap + width > navWidth - 1) break;
				usedWidth += gap + width;
				count += 1;
			}
			setVisibleLinks(count);
		};
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				// Older implementations expose only contentRect; Unlimited has 8px padding on each side.
				const width =
					entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width + (entry.target === unlimited ? 16 : 0);
				measuredWidths.set(entry.target, width);
			}
			if (!frame) frame = requestAnimationFrame(updateVisibleLinks);
		});
		for (const target of [nav, measure, ...labels]) observer.observe(target, { box: 'border-box' });
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
					<BrandImage />
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
