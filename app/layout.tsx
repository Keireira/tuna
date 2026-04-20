import localFont from 'next/font/local';
import { AppShell } from '@/components/AppShell';
import { StyledComponentsRegistry } from '@/lib/registry';

import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';

const description =
	"A subscription tracker that isn't a subscription — buy once, own forever. Track all your subscriptions on iOS with renewal alerts, iCloud backup, and a timeline of past and upcoming charges. All data stays on your device. Like a bank feed for your subscriptions.";
const shortDescription = "The subscription tracker that isn't a subscription. Buy once, own forever.";

export const metadata: Metadata = {
	metadataBase: new URL('https://uha.app'),
	title: {
		default: 'Uha — Subscription Manager for iOS',
		template: '%s | Uha'
	},
	description,
	keywords: [
		'subscription manager',
		'iOS',
		'privacy',
		'subscription tracker',
		'renewal alerts',
		'spending analytics',
		'open source'
	],
	openGraph: {
		title: 'Uha — Subscription Manager',
		description,
		type: 'website',
		siteName: 'Uha',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Uha — Subscription Manager for iOS'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Uha — Subscription Manager',
		description: shortDescription,
		images: ['/og-image.png']
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png'
	}
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#EDE8E1' },
		{ media: '(prefers-color-scheme: dark)', color: '#1A1612' }
	]
};

const onest = localFont({
	src: '../public/assets/fonts/Onest-variable.ttf',
	variable: '--font-onest',
	display: 'swap'
});

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html lang="en" className={onest.variable} suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'MobileApplication',
							name: 'Uha',
							applicationCategory: 'FinanceApplication',
							operatingSystem: 'iOS 17+',
							description,
							url: 'https://uha.app',
							downloadUrl: 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581',
							author: {
								'@type': 'Person',
								name: 'Alena Dzhukich'
							},
							publisher: {
								'@type': 'Person',
								name: 'Alena Dzhukich'
							},
							offers: [
								{
									'@type': 'Offer',
									price: '0',
									priceCurrency: 'USD',
									name: 'Free',
									description: 'Up to 5 subscriptions, 3 currencies, 2-year timeline'
								},
								{
									'@type': 'Offer',
									name: 'Unlimited',
									description:
										'Unlimited subscriptions, All currencies, iCloud sync, Backup restoration, 10-year timeline, All future premium features',
									price: '9.99',
									priceCurrency: 'USD'
								}
							],
							featureList: [
								'Track subscriptions locally (on-device)',
								'Multi-currency support',
								'iCloud sync and backup',
								'CSV export',
								"Subscription's timeline",
								'Bank-feed-like experiene',
								'Payment reminders'
							],
							license: 'https://www.gnu.org/licenses/agpl-3.0.html',
							inLanguage: ['en', 'ru', 'kk', 'ja', 'es']
						})
					}}
				/>
			</head>

			<body>
				<StyledComponentsRegistry>
					<AppShell>{children}</AppShell>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
};

export default RootLayout;
