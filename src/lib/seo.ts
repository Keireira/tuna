import type { Metadata } from 'next';
import { productMedia } from '@/content/product-media';
import { APP_STORE_URL, SITE_URL, SUPPORT_EMAIL, TESTFLIGHT_URL, UHA_PRODUCT } from '@/content/product';
import { DEFAULT_LOCALE, LOCALES, OG_LOCALE_MAP, buildAlternates, type TLocale } from './i18n';
import { getTranslation } from './i18n/server';
import { SITE_PAGES, pagePath, type SitePageT } from './site-pages';
import { getLocalePrice } from './price-catalog';

const getOgImageUrl = (locale: TLocale) =>
	`${SITE_URL}/og-image${locale === 'en' ? '' : `-${locale}`}.png?v=20260911-7`;

export const getPageMetadata = async (locale: TLocale = DEFAULT_LOCALE, page: SitePageT = ''): Promise<Metadata> => {
	const { t } = await getTranslation(locale, page || 'common');
	const title = page ? `${t('meta.title')} | Uha` : t('meta.title');
	const description = t('meta.description');
	const url = `${SITE_URL}/${locale}${pagePath(page)}`;
	const imageUrl = getOgImageUrl(locale);
	const { t: common } = await getTranslation(locale, 'common');
	return {
		title: { absolute: title },
		description,
		alternates: buildAlternates(locale, pagePath(page)),
		openGraph: {
			title,
			description,
			url,
			type: 'website',
			siteName: 'Uha',
			locale: OG_LOCALE_MAP[locale],
			alternateLocale: LOCALES.filter((language) => language !== locale).map((language) => OG_LOCALE_MAP[language]),
			images: [{ url: imageUrl, width: 1200, height: 630, alt: common('meta.og_image_alt') }]
		},
		twitter: { card: 'summary_large_image', title, description, images: [imageUrl] }
	};
};

export const getSiteStructuredData = (locale: TLocale) => ({
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebSite',
			'@id': `${SITE_URL}/#website`,
			url: SITE_URL,
			name: 'Uha',
			alternateName: UHA_PRODUCT.alternateName,
			inLanguage: [...LOCALES],
			publisher: { '@id': `${SITE_URL}/#publisher` }
		},
		{ '@type': 'Person', '@id': `${SITE_URL}/#author`, name: 'Alena Dzhukich', email: SUPPORT_EMAIL },
		{
			'@type': 'Organization',
			'@id': `${SITE_URL}/#publisher`,
			name: 'Uha',
			url: SITE_URL,
			logo: `${SITE_URL}/favicon.png`,
			founder: { '@id': `${SITE_URL}/#author` },
			sameAs: [APP_STORE_URL, TESTFLIGHT_URL],
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'customer support',
				email: SUPPORT_EMAIL,
				url: `${SITE_URL}/${locale}/support`,
				availableLanguage: [...LOCALES]
			}
		}
	]
});

export const getPageStructuredData = async (locale: TLocale = DEFAULT_LOCALE, page: SitePageT = '') => {
	const { t } = await getTranslation(locale, page || 'common');
	const unlimitedPrice = getLocalePrice(locale);
	const url = `${SITE_URL}/${locale}${pagePath(page)}`;
	const webpage = {
		'@type': page === 'support' ? 'ContactPage' : 'WebPage',
		'@id': `${url}#webpage`,
		url,
		name: t('meta.title'),
		description: t('meta.description'),
		inLanguage: locale,
		dateModified: SITE_PAGES[page].toISOString(),
		isPartOf: { '@id': `${SITE_URL}/#website` },
		about: { '@id': `${SITE_URL}/#app` },
		publisher: { '@id': `${SITE_URL}/#publisher` }
	};
	if (page) return { '@context': 'https://schema.org', '@graph': [webpage] };
	return {
		'@context': 'https://schema.org',
		'@graph': [
			webpage,
			{
				'@type': 'MobileApplication',
				'@id': `${SITE_URL}/#app`,
				name: 'Uha',
				alternateName: UHA_PRODUCT.alternateName,
				applicationCategory: 'FinanceApplication',
				operatingSystem: 'iOS',
				description: t('meta.description'),
				url,
				mainEntityOfPage: { '@id': webpage['@id'] },
				image: getOgImageUrl(locale),
				screenshot: (['views-feed', 'views-glance', 'views-month', 'views-year'] as const).flatMap((id) => {
					const media = productMedia[id];
					return media.status === 'approved' && media.src ? [`${SITE_URL}${media.src}`] : [];
				}),
				downloadUrl: APP_STORE_URL,
				installUrl: APP_STORE_URL,
				softwareHelp: `${SITE_URL}/${locale}/support`,
				inLanguage: [...LOCALES],
				isAccessibleForFree: true,
				featureList: t('jsonld.features', { returnObjects: true }),
				license: 'https://www.gnu.org/licenses/agpl-3.0.html',
				author: { '@id': `${SITE_URL}/#author` },
				publisher: { '@id': `${SITE_URL}/#publisher` },
				offers: [
					{
						'@type': 'Offer',
						price: 0,
						priceCurrency: unlimitedPrice.currency,
						url: APP_STORE_URL,
						description: t('jsonld.free_tier')
					},
					{
						'@type': 'Offer',
						name: 'Uha Unlimited',
						price: unlimitedPrice.price,
						priceCurrency: unlimitedPrice.currency,
						eligibleRegion: unlimitedPrice.countryCode,
						url: APP_STORE_URL,
						description: t('jsonld.unlimited_tier')
					}
				],
				sameAs: [APP_STORE_URL]
			}
		]
	};
};
