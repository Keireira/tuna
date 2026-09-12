'use client';

import { useTranslation } from 'react-i18next';
import type { LandingCopyT } from '@/content/landing';
import BrandImage from './brand-image';

type PropsT = { locale: string; copy: LandingCopyT; pagePath?: string };

export default function SiteFooter({ locale, copy, pagePath }: PropsT) {
	const { t } = useTranslation('landing', { lng: locale });
	return (
		<footer className="landing-footer section-width">
			<div className="footer-brand">
				<a className="brand" href={`/${locale}`}>
					<BrandImage />
					UHA
				</a>
			</div>
			<p>{copy.footer.line}</p>
			<nav aria-label={t('footer.support')}>
				{(['privacy', 'terms', 'security', 'support', 'mcp'] as const).map((page) => (
					<a key={page} href={`/${locale}/${page}`} aria-current={pagePath === `/${page}` ? 'page' : undefined}>
						{t(`footer.${page}`)}
					</a>
				))}
				<a href="https://testflight.apple.com/join/uVYrDkbA" target="_blank" rel="noopener noreferrer">
					{t('footer.join_beta')}
				</a>
			</nav>
		</footer>
	);
}
