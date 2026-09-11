// Public product facts shared by MCP, discovery documents, and search metadata.
// Update the review date only after checking the app's features and entitlements.
import unlimitedReferencePrice from './unlimited-reference-price.json';

export const PRODUCT_LAST_REVIEWED = '2026-09-11';
export const SITE_URL = 'https://uha.app';
export const MCP_ENDPOINT = `${SITE_URL}/api/mcp`;
export const APP_STORE_URL = 'https://apps.apple.com/us/app/uha-subscriptions-tracker/id6748603444';
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/uVYrDkbA';
export const SUPPORT_EMAIL = 'mail@uha.app';
export const MCP_SERVER_INFO = { name: 'Uha Subscriptions Tracker', version: '1.2.0' } as const;

export const APP_LINKS = {
	website: SITE_URL,
	appStore: APP_STORE_URL,
	testflight: TESTFLIGHT_URL,
	support: `${SITE_URL}/en/support`,
	privacy: `${SITE_URL}/en/privacy`,
	terms: `${SITE_URL}/en/terms`,
	security: `${SITE_URL}/en/security`,
	mcp: MCP_ENDPOINT,
	prices: `${SITE_URL}/prices.json`,
	mcpDocumentation: `${SITE_URL}/en/mcp`
} as const;

export const UHA_PRICING = {
	lastReviewed: PRODUCT_LAST_REVIEWED,
	free: {
		price: 'Free',
		maxSubscriptions: 3,
		forecastYears: 3,
		limits: [
			'Up to 3 subscriptions',
			'All supported currencies for subscription billing amounts',
			'USD, EUR, and the App Store currency (device locale currency if unavailable) for conversion and reporting; duplicates are counted once, so 2 or 3 currencies',
			'CSV export and local backup creation are free',
			'No CSV import, backup restoration, or iCloud backup',
			'Future timeline up to 3 years'
		]
	},
	unlimited: {
		price: 'One-time purchase',
		type: 'lifetime',
		autoRenews: false,
		forecastYears: 12,
		referencePrice: unlimitedReferencePrice,
		priceCatalog: APP_LINKS.prices,
		priceNote:
			'The reference price applies to the United States storefront. The dated catalog lists customer prices for each region and scheduled changes separately. The App Store purchase sheet shows the price currently available to your account.',
		features: [
			'Unlimited subscriptions',
			'All supported currencies for conversion and reporting',
			'Manual iCloud backup and restoration',
			'Local backup restoration and CSV import',
			'Future timeline up to 12 years',
			'All future premium features'
		]
	},
	restorePurchases: 'Settings → Unlimited → Restore Purchases restores eligible access, not the subscription library.',
	testflight: 'TestFlight purchases are free test transactions and do not carry over to the App Store version.'
} as const;

export const UHA_PRODUCT = {
	name: 'Uha',
	alternateName: 'Uha Subscriptions Tracker',
	lastReviewed: PRODUCT_LAST_REVIEWED,
	description:
		'Uha is an iOS subscriptions tracker for recording recurring payments, viewing upcoming charges, comparing spending, and planning future costs. It has a free tier and an optional one-time Unlimited purchase.',
	platforms: ['iOS'],
	features: [
		'Past and upcoming payments in list, overview, monthly calendar, and yearly calendar views',
		'Service search, custom subscriptions, categories, and payment method labels',
		'Spending breakdowns, comparisons, and historical exchange-rate conversion',
		'Timeline changes to prices and payment schedules',
		'Payment reminders',
		'Free CSV export and local backup creation',
		'Manual iCloud backups, backup restoration, and CSV import with Unlimited'
	],
	limitations: [
		'Uha does not pay for or cancel the services you track.',
		'Payment method labels do not connect Uha to bank or card accounts.',
		'iCloud backup is manual, not continuous synchronization. Restoring a backup replaces the current library.'
	],
	privacy: {
		storage:
			'The subscription library is stored locally on the device. Exports and manual iCloud backups copy it to the location selected by the user.',
		services:
			'Purchases use Apple and RevenueCat. Search, logos, exchange rates, website requests, and support messages involve the data processing described in the privacy policy.',
		policy: APP_LINKS.privacy
	},
	pricing: UHA_PRICING,
	website: SITE_URL,
	links: APP_LINKS,
	license: 'AGPL-3.0',
	mcpScope: {
		readOnly: true,
		personalLibraryAccess: false,
		appControl: false,
		payments: false,
		cancellations: false
	}
} as const;

export const MCP_TOOLS = [
	{
		name: 'get_info',
		title: 'Get Uha information',
		description:
			'Return public Uha features, limitations, privacy information, and purchase model. Does not access a user’s subscription library.'
	},
	{
		name: 'get_pricing',
		title: 'Get Free and Unlimited details',
		description:
			'Return free limits, paid features, and the dated regional customer-price catalog, with scheduled changes listed separately. This is not a live App Store price quote.'
	},
	{
		name: 'get_app_links',
		title: 'Get official Uha links',
		description: 'Return official installation, support, privacy, terms, security, and MCP links.'
	},
	{
		name: 'get_supported_currencies',
		title: 'Get supported currencies',
		description:
			'Return the app currency catalog, formatting metadata, and free reporting-currency rules. Does not return live exchange rates.'
	}
] as const;
