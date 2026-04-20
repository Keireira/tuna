import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import I18nProvider from '@/providers/I18nProvider';
import { AppShell } from '@/components/AppShell';
import { StyledComponentsRegistry } from '@/lib/registry';
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
			icon: '/favicon.ico',
			apple: '/apple-touch-icon.png'
		},
		alternates: buildAlternates(locale)
	};
};

const LocaleLayout = async ({ children, params }: TProps) => {
	const { locale } = await params;
	if (!isValidLocale(locale)) notFound();

	const { t } = await getTranslation(locale, 'common');

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'MobileApplication',
		name: 'Uha',
		applicationCategory: 'FinanceApplication',
		operatingSystem: 'iOS',
		description: t('meta.description'),
		url: 'https://uha.app',
		downloadUrl: 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581',
		author: { '@type': 'Person', name: 'Alena Dzhukich' },
		publisher: { '@type': 'Person', name: 'Alena Dzhukich' },
		offers: [
			{
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD',
				name: 'Free',
				description: t('jsonld.free_tier')
			},
			{
				'@type': 'Offer',
				name: 'Unlimited',
				description: t('jsonld.unlimited_tier'),
				price: '9.99',
				priceCurrency: 'USD'
			}
		],
		featureList: t('jsonld.features', { returnObjects: true }),
		license: 'https://www.gnu.org/licenses/agpl-3.0.html',
		inLanguage: locale
	};

	return (
		<html lang={locale} className={onest.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
