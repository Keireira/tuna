import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import I18nProvider from '@/providers/I18nProvider';
import { AppShell } from '@/components/AppShell';
import { StyledComponentsRegistry } from '@/lib/registry';
import StructuredDataScript from '@/components/agent/StructuredDataScript';
import { getTranslation } from '@lib/i18n/server';
import { LOCALES, OG_LOCALE_MAP, isValidLocale, buildAlternates } from '@/lib/i18n';
import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#EDE8E1' },
		{ media: '(prefers-color-scheme: dark)', color: '#1A1612' }
	]
};

const onest = localFont({
	src: '../../public/assets/fonts/Onest-variable.ttf',
	variable: '--font-onest',
	display: 'swap'
});

const SITE_URL = 'https://uha.app';
const APP_STORE_URL = 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581';
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/uVYrDkbA';
const SUPPORT_EMAIL = 'mail@uha.app';

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

type TProps = PropsWithChildren<{
	params: Promise<{ locale: string }>;
}>;

export const generateMetadata = async ({ params }: Pick<TProps, 'params'>): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	const { t } = await getTranslation(locale, 'common');

	return {
		metadataBase: new URL('https://uha.app'),
		title: {
			default: t('meta.title'),
			template: t('meta.title_template')
		},
		description: t('meta.description'),
		keywords: t('meta.keywords', { returnObjects: true }) as string[],
		openGraph: {
			title: t('meta.og_title'),
			description: t('meta.description'),
			url: `/${locale}`,
			type: 'website',
			siteName: 'Uha',
			locale: OG_LOCALE_MAP[locale],
			alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE_MAP[l]),
			images: [
				{
					url: '/og-image.png',
					width: 1200,
					height: 630,
					alt: t('meta.og_image_alt')
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: t('meta.og_title'),
			description: t('meta.short_description'),
			images: ['/og-image.png']
		},
		icons: {
			icon: [
				{ url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
				{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
				{ url: '/favicon.png', type: 'image/png', sizes: '512x512' }
			],
			shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
			apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }]
		},
		alternates: buildAlternates(locale)
	};
};

const LocaleLayout = async ({ children, params }: TProps) => {
	const { locale } = await params;
	if (!isValidLocale(locale)) notFound();

	const { t } = await getTranslation(locale, 'common');

	const description = t('meta.description');
	const features = t('jsonld.features', { returnObjects: true }) as string[];
	const offers = [
		{
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			name: 'Free',
			description: t('jsonld.free_tier'),
			availability: 'https://schema.org/InStock'
		},
		{
			'@type': 'Offer',
			name: 'Unlimited',
			description: t('jsonld.unlimited_tier'),
			price: '9.99',
			priceCurrency: 'USD',
			availability: 'https://schema.org/PreOrder'
		}
	];
	const softwareApplication = {
		'@type': ['SoftwareApplication', 'MobileApplication'],
		'@id': `${SITE_URL}/#app`,
		name: 'Uha',
		alternateName: 'Uha Subscription Tracker',
		applicationCategory: 'FinanceApplication',
		applicationSubCategory: 'Subscription management',
		operatingSystem: 'iOS',
		description,
		url: SITE_URL,
		mainEntityOfPage: `${SITE_URL}/${locale}`,
		image: `${SITE_URL}/og-image.png`,
		thumbnailUrl: `${SITE_URL}/favicon.png`,
		downloadUrl: APP_STORE_URL,
		installUrl: TESTFLIGHT_URL,
		isAccessibleForFree: true,
		inLanguage: locale,
		featureList: features,
		offers,
		author: {
			'@type': 'Person',
			'@id': `${SITE_URL}/#founder`,
			name: 'Alena Dzhukich',
			email: SUPPORT_EMAIL
		},
		publisher: { '@id': `${SITE_URL}/#organization` },
		sameAs: [APP_STORE_URL, TESTFLIGHT_URL]
	};
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${SITE_URL}/#organization`,
				name: 'Uha',
				url: SITE_URL,
				logo: `${SITE_URL}/favicon.png`,
				email: SUPPORT_EMAIL,
				founder: { '@id': `${SITE_URL}/#founder` },
				sameAs: [APP_STORE_URL, TESTFLIGHT_URL]
			},
			{
				'@type': 'Person',
				'@id': `${SITE_URL}/#founder`,
				name: 'Alena Dzhukich',
				email: SUPPORT_EMAIL
			},
			softwareApplication,
			{
				...softwareApplication,
				'@type': 'MobileApplication',
				'@id': `${SITE_URL}/#mobile-application`
			},
			{
				'@type': 'FAQPage',
				'@id': `${SITE_URL}/${locale}#faq`,
				url: `${SITE_URL}/${locale}`,
				inLanguage: locale,
				mainEntity: [
					{
						'@type': 'Question',
						name: 'What is Uha?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Uha is an iOS app for tracking recurring subscriptions, renewal dates, spending, and upcoming charges.'
						}
					},
					{
						'@type': 'Question',
						name: 'Does Uha collect personal data?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Uha stores subscription data on device. Payment method labels are stored locally. Uha does not store card numbers, bank credentials, or payment account logins.'
						}
					},
					{
						'@type': 'Question',
						name: 'Where can I install Uha?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: `Uha is currently in public beta via Apple TestFlight at ${TESTFLIGHT_URL}. TestFlight purchases are for testing; real payments are handled only after App Store release through Apple In-App Purchase. The App Store listing is ${APP_STORE_URL}.`
						}
					}
				]
			}
		]
	};

	return (
		<html lang={locale} className={onest.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				<StructuredDataScript id={`uha-json-ld-${locale}`} json={jsonLd} />
			</head>
			<body>
				<StyledComponentsRegistry>
					<I18nProvider locale={locale}>
						<AppShell>{children}</AppShell>
					</I18nProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
};

export default LocaleLayout;
