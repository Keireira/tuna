'use client';

import { Fragment, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { LandingCopyT } from '@/content/landing';
import LandingNav from '@/views/landing-page/components/landing-nav/landing-nav';
import SiteFooter from '@/components/site-chrome/site-footer';
import Root from './info-page.styles';

export type InfoSectionT = { id: string; title: string; content: ReactNode };
type PropsT = {
	locale: string;
	page: 'mcp' | 'support' | 'security' | 'terms' | 'privacy';
	title: string;
	intro: string;
	updated?: string;
	action?: ReactNode;
	sections: InfoSectionT[];
};

export function ContactText({ children }: { children: string }) {
	return children.split('mail@uha.app').map((part, index) => (
		<Fragment key={index}>
			{index > 0 && <a href="mailto:mail@uha.app">mail@uha.app</a>}
			{part}
		</Fragment>
	));
}

export default function InfoPage({ locale, page, title, intro, updated, action, sections }: PropsT) {
	const { t } = useTranslation('landing', { lng: locale });
	const copy = t('showcase', { returnObjects: true }) as LandingCopyT;
	return (
		<Root lang={locale}>
			<LandingNav copy={copy} locale={locale} pagePath={`/${page}`} />
			<main id="main-content" tabIndex={-1}>
				<header className="info-hero section-width">
					<h1>{title}</h1>
					<div className="info-intro">
						{updated && <p className="info-updated">{updated}</p>}
						<div className="info-lead">
							<p>
								<ContactText>{intro}</ContactText>
							</p>
							{action}
						</div>
					</div>
				</header>
				<div className="info-paper">
					<div className="reading-grid section-width">
						<nav className="info-contents" aria-label={title}>
							{sections.map((section) => (
								<a href={`#${section.id}`} key={section.id}>
									{section.title}
								</a>
							))}
						</nav>
						<article className="info-article" aria-label={title}>
							{sections.map((section) => (
								<section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
									<h2 id={`${section.id}-title`}>{section.title}</h2>
									{section.content}
								</section>
							))}
						</article>
					</div>
				</div>
			</main>
			<SiteFooter copy={copy} locale={locale} pagePath={`/${page}`} />
		</Root>
	);
}
