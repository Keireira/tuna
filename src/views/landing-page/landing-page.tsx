'use client';
import { useEffect, useState } from 'react';
import { APP_STORE_URL, type LandingCopyT, type StorefrontPriceT } from '@/content/landing';
import LandingNav from './components/landing-nav/landing-nav';
import ProductShowcase from './components/product-showcase/product-showcase';
import ProductStory from './components/product-story/product-story';
import ProductCraft from './components/product-craft/product-craft';
import ProductDetails from './components/product-details/product-details';
import ProductPricing from './components/product-pricing/product-pricing';
import InteractiveWordmark from './components/interactive-wordmark/interactive-wordmark';
import SiteFooter from '@/components/site-chrome/site-footer';
import Root from './landing-page.styles';

type PropsT = { copy: LandingCopyT; locale: string; unlimitedPrice: StorefrontPriceT };
const LandingPage = ({ copy, locale, unlimitedPrice }: PropsT) => {
	const [simple, setSimple] = useState(true);
	const [allowPlaceholders, setAllowPlaceholders] = useState(false);
	useEffect(() => {
		setSimple(window.matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches);
		setAllowPlaceholders(['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname));
	}, []);
	const toggleEffects = () => setSimple((value) => !value);
	return (
		<Root data-simple={simple} lang={locale}>
			<LandingNav copy={copy} locale={locale} simple={simple} onToggleEffects={toggleEffects} />
			<main id="main-content">
				<section className="hero section-width" aria-labelledby="hero-title">
					<InteractiveWordmark
						key={locale}
						simple={simple}
						label={copy.brand.playWithLetters}
						slogans={copy.brand.slogans}
					/>
					<div className="hero-heading">
						<h1 id="hero-title">{copy.brand.subtitle}</h1>
					</div>
					<div className="hero-intro">
						<p className="hero-description">{copy.hero.body}</p>
						<div className="hero-copy">
							<a className="download-button" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
								{copy.hero.download}
								<span aria-hidden="true">↗</span>
							</a>
							<p className="purchase-note">
								{copy.hero.free}
								<br />
								{copy.hero.purchase}
							</p>
						</div>
					</div>
					<ProductShowcase copy={copy} allowPlaceholders={allowPlaceholders} simple={simple} />
				</section>
				<div className="chapter-index section-width">
					{(['search', 'analytics', 'filters', 'timeline'] as const).map((chapter, i) => (
						<a key={chapter} data-chapter={chapter} href={`#${chapter === 'search' ? 'discovery' : chapter}`}>
							<span>0{i + 1}</span>
							{chapter === 'filters' ? copy.nav.filters : copy.chapters[chapter]}
							<span aria-hidden="true">↗</span>
						</a>
					))}
				</div>
				<ProductStory copy={copy} allowPlaceholders={allowPlaceholders} />
				<ProductCraft copy={copy} />
				<ProductDetails copy={copy} allowPlaceholders={allowPlaceholders} />
				<ProductPricing copy={copy} locale={locale} storefrontPrice={unlimitedPrice} />
				<section className="closing section-width">
					<h2>{copy.pricing.end}</h2>
					<div className="closing-links">
						<a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
							{copy.hero.download}
							<span aria-hidden="true">↗</span>
						</a>
						<a className="hire-link" href="https://hirify.me/keireira" target="_blank" rel="noopener noreferrer">
							{copy.footer.hire}
							<span aria-hidden="true">↗</span>
						</a>
					</div>
				</section>
			</main>
			<SiteFooter copy={copy} locale={locale} />
		</Root>
	);
};
export default LandingPage;
