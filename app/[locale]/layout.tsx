import { notFound } from 'next/navigation';
import I18nProvider from '@/providers/I18nProvider';
import { AppShell } from '@/components/AppShell';
import { StyledComponentsRegistry } from '@/lib/registry';
import StructuredDataScript from '@/components/agent/StructuredDataScript';
import { LOCALES, isValidLocale } from '@/lib/i18n';
import { SITE_URL } from '@/content/product';
import { getPageMetadata, getSiteStructuredData } from '@/lib/seo';
import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#fd553a'
};

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

type TProps = PropsWithChildren<{
	params: Promise<{ locale: string }>;
}>;

export const generateMetadata = async ({ params }: Pick<TProps, 'params'>): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	return {
		metadataBase: new URL(SITE_URL),
		...(await getPageMetadata(locale)),
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
		},
		icons: {
			icon: [
				{ url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
				{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
				{ url: '/favicon.png', type: 'image/png', sizes: '512x512' }
			],
			shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
			apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }]
		}
	};
};

const LocaleLayout = async ({ children, params }: TProps) => {
	const { locale } = await params;
	if (!isValidLocale(locale)) notFound();

	return (
		<html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				<StructuredDataScript id={`uha-json-ld-${locale}`} json={getSiteStructuredData(locale)} />
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
