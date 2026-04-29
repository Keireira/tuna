import { createMcpHandler } from 'mcp-handler';

const UHA_PRICING = {
	free: {
		price: 'Free',
		limits: [
			'Up to 5 subscriptions',
			'3 currencies for conversion (USD, EUR, and your App Store currency)',
			'No iCloud sync or backup restoration',
			'Future timeline limited to 2 years',
			'Can be upgraded to Unlimited with a one-time purchase'
		]
	},
	unlimited: {
		price: 'One-time purchase',
		type: 'lifetime',
		features: [
			'Unlimited subscriptions',
			'All currencies',
			'iCloud sync',
			'Backup restoration',
			'10-year timeline',
			'All future premium features'
		]
	}
};

const UHA_CURRENCIES = {
	total: 123,
	regions: [
		'africa',
		'europe',
		'north_america',
		'central_america',
		'south_america',
		'caribbean',
		'central_asia',
		'south_asia',
		'east_asia',
		'southeast_asia',
		'oceania',
		'cryptocurrency',
		'other'
	],
	currencies: [
		{ code: 'AOA', symbol: 'Kz', decimals: 2, locale: 'pt-AO', region: 'africa' },
		{ code: 'BWP', symbol: 'P', decimals: 2, locale: 'en-BW', region: 'africa' },
		{ code: 'BIF', symbol: 'FBu', decimals: 0, locale: 'fr-BI', region: 'africa' },
		{ code: 'CDF', symbol: 'FC', decimals: 2, locale: 'fr-CD', region: 'africa' },
		{ code: 'CVE', symbol: '$', decimals: 2, locale: 'pt-CV', region: 'africa' },
		{ code: 'ETB', symbol: 'Br', decimals: 2, locale: 'am-ET', region: 'africa' },
		{ code: 'GHS', symbol: 'GH₵', decimals: 2, locale: 'en-GH', region: 'africa' },
		{ code: 'KES', symbol: 'KSh', decimals: 2, locale: 'sw-KE', region: 'africa' },
		{ code: 'LRD', symbol: 'L$', decimals: 2, locale: 'en-LR', region: 'africa' },
		{ code: 'LSL', symbol: 'L', decimals: 2, locale: 'en-LS', region: 'africa' },
		{ code: 'MUR', symbol: '₨', decimals: 2, locale: 'en-MU', region: 'africa' },
		{ code: 'MWK', symbol: 'MK', decimals: 2, locale: 'en-MW', region: 'africa' },
		{ code: 'MZN', symbol: 'MT', decimals: 2, locale: 'pt-MZ', region: 'africa' },
		{ code: 'NAD', symbol: 'N$', decimals: 2, locale: 'en-NA', region: 'africa' },
		{ code: 'NGN', symbol: '₦', decimals: 2, locale: 'en-NG', region: 'africa' },
		{ code: 'RWF', symbol: 'FRw', decimals: 0, locale: 'rw-RW', region: 'africa' },
		{ code: 'SCR', symbol: '₨', decimals: 2, locale: 'en-SC', region: 'africa' },
		{ code: 'SZL', symbol: 'E', decimals: 2, locale: 'en-SZ', region: 'africa' },
		{ code: 'TZS', symbol: 'TSh', decimals: 2, locale: 'sw-TZ', region: 'africa' },
		{ code: 'UGX', symbol: 'USh', decimals: 0, locale: 'en-UG', region: 'africa' },
		{ code: 'XAF', symbol: 'FCFA', decimals: 0, locale: 'fr-CM', region: 'africa' },
		{ code: 'XOF', symbol: 'CFA', decimals: 0, locale: 'fr-SN', region: 'africa' },
		{ code: 'ZAR', symbol: 'R', decimals: 2, locale: 'en-ZA', region: 'africa' },
		{ code: 'ZMW', symbol: 'ZK', decimals: 2, locale: 'en-ZM', region: 'africa' },
		{ code: 'ALL', symbol: 'L', decimals: 2, locale: 'sq-AL', region: 'europe' },
		{ code: 'BAM', symbol: 'KM', decimals: 2, locale: 'bs-BA', region: 'europe' },
		{ code: 'BGN', symbol: 'лв', decimals: 2, locale: 'bg-BG', region: 'europe' },
		{ code: 'CHF', symbol: 'CHF', decimals: 2, locale: 'de-CH', region: 'europe' },
		{ code: 'CZK', symbol: 'Kč', decimals: 2, locale: 'cs-CZ', region: 'europe' },
		{ code: 'DKK', symbol: 'kr', decimals: 2, locale: 'da-DK', region: 'europe' },
		{ code: 'EUR', symbol: '€', decimals: 2, locale: 'de-DE', region: 'europe' },
		{ code: 'GBP', symbol: '£', decimals: 2, locale: 'en-GB', region: 'europe' },
		{ code: 'GEL', symbol: '₾', decimals: 2, locale: 'ka-GE', region: 'europe' },
		{ code: 'GIP', symbol: '£', decimals: 2, locale: 'en-GI', region: 'europe' },
		{ code: 'HUF', symbol: 'Ft', decimals: 2, locale: 'hu-HU', region: 'europe' },
		{ code: 'ILS', symbol: '₪', decimals: 2, locale: 'he-IL', region: 'europe' },
		{ code: 'ISK', symbol: 'kr', decimals: 0, locale: 'is-IS', region: 'europe' },
		{ code: 'MDL', symbol: 'L', decimals: 2, locale: 'ro-MD', region: 'europe' },
		{ code: 'MKD', symbol: 'ден', decimals: 2, locale: 'mk-MK', region: 'europe' },
		{ code: 'NOK', symbol: 'kr', decimals: 2, locale: 'nb-NO', region: 'europe' },
		{ code: 'PLN', symbol: 'zł', decimals: 2, locale: 'pl-PL', region: 'europe' },
		{ code: 'RON', symbol: 'lei', decimals: 2, locale: 'ro-RO', region: 'europe' },
		{ code: 'RSD', symbol: 'дин.', decimals: 2, locale: 'sr-RS', region: 'europe' },
		{ code: 'RUB', symbol: '₽', decimals: 2, locale: 'ru-RU', region: 'europe' },
		{ code: 'SEK', symbol: 'kr', decimals: 2, locale: 'sv-SE', region: 'europe' },
		{ code: 'UAH', symbol: '₴', decimals: 2, locale: 'uk-UA', region: 'europe' },
		{ code: 'CAD', symbol: 'C$', decimals: 2, locale: 'en-CA', region: 'north_america' },
		{ code: 'MXN', symbol: 'MX$', decimals: 2, locale: 'es-MX', region: 'north_america' },
		{ code: 'USD', symbol: '$', decimals: 2, locale: 'en-US', region: 'north_america' },
		{ code: 'BZD', symbol: 'BZ$', decimals: 2, locale: 'en-BZ', region: 'central_america' },
		{ code: 'CRC', symbol: '₡', decimals: 2, locale: 'es-CR', region: 'central_america' },
		{ code: 'GTQ', symbol: 'Q', decimals: 2, locale: 'es-GT', region: 'central_america' },
		{ code: 'HNL', symbol: 'L', decimals: 2, locale: 'es-HN', region: 'central_america' },
		{ code: 'NIO', symbol: 'C$', decimals: 2, locale: 'es-NI', region: 'central_america' },
		{ code: 'PAB', symbol: 'B/.', decimals: 2, locale: 'es-PA', region: 'central_america' },
		{ code: 'SVC', symbol: '$', decimals: 2, locale: 'es-SV', region: 'central_america' },
		{ code: 'ARS', symbol: '$', decimals: 2, locale: 'es-AR', region: 'south_america' },
		{ code: 'BOB', symbol: 'Bs.', decimals: 2, locale: 'es-BO', region: 'south_america' },
		{ code: 'BRL', symbol: 'R$', decimals: 2, locale: 'pt-BR', region: 'south_america' },
		{ code: 'CLP', symbol: '$', decimals: 0, locale: 'es-CL', region: 'south_america' },
		{ code: 'COP', symbol: '$', decimals: 2, locale: 'es-CO', region: 'south_america' },
		{ code: 'GYD', symbol: 'G$', decimals: 2, locale: 'en-GY', region: 'south_america' },
		{ code: 'PEN', symbol: 'S/', decimals: 2, locale: 'es-PE', region: 'south_america' },
		{ code: 'PYG', symbol: '₲', decimals: 0, locale: 'es-PY', region: 'south_america' },
		{ code: 'SRD', symbol: '$', decimals: 2, locale: 'nl-SR', region: 'south_america' },
		{ code: 'UYU', symbol: '$U', decimals: 2, locale: 'es-UY', region: 'south_america' },
		{ code: 'AWG', symbol: 'ƒ', decimals: 2, locale: 'nl-AW', region: 'caribbean' },
		{ code: 'BBD', symbol: 'Bds$', decimals: 2, locale: 'en-BB', region: 'caribbean' },
		{ code: 'BMD', symbol: '$', decimals: 2, locale: 'en-BM', region: 'caribbean' },
		{ code: 'BSD', symbol: 'B$', decimals: 2, locale: 'en-BS', region: 'caribbean' },
		{ code: 'CUP', symbol: '₱', decimals: 2, locale: 'es-CU', region: 'caribbean' },
		{ code: 'DOP', symbol: 'RD$', decimals: 2, locale: 'es-DO', region: 'caribbean' },
		{ code: 'HTG', symbol: 'G', decimals: 2, locale: 'fr-HT', region: 'caribbean' },
		{ code: 'JMD', symbol: 'J$', decimals: 2, locale: 'en-JM', region: 'caribbean' },
		{ code: 'KYD', symbol: 'CI$', decimals: 2, locale: 'en-KY', region: 'caribbean' },
		{ code: 'TTD', symbol: 'TT$', decimals: 2, locale: 'en-TT', region: 'caribbean' },
		{ code: 'XCD', symbol: 'EC$', decimals: 2, locale: 'en-AG', region: 'caribbean' },
		{ code: 'AMD', symbol: '֏', decimals: 2, locale: 'hy-AM', region: 'central_asia' },
		{ code: 'AZN', symbol: '₼', decimals: 2, locale: 'az-AZ', region: 'central_asia' },
		{ code: 'KGS', symbol: 'с', decimals: 2, locale: 'ky-KG', region: 'central_asia' },
		{ code: 'KZT', symbol: '₸', decimals: 2, locale: 'kk-KZ', region: 'central_asia' },
		{ code: 'TJS', symbol: 'смн', decimals: 2, locale: 'tg-TJ', region: 'central_asia' },
		{ code: 'UZS', symbol: 'сўм', decimals: 2, locale: 'uz-UZ', region: 'central_asia' },
		{ code: 'INR', symbol: '₹', decimals: 2, locale: 'hi-IN', region: 'south_asia' },
		{ code: 'LKR', symbol: '₨', decimals: 2, locale: 'si-LK', region: 'south_asia' },
		{ code: 'NPR', symbol: '₨', decimals: 2, locale: 'ne-NP', region: 'south_asia' },
		{ code: 'CNH', symbol: '¥h', decimals: 2, locale: 'zh-HK', region: 'east_asia' },
		{ code: 'CNY', symbol: '¥', decimals: 2, locale: 'zh-CN', region: 'east_asia' },
		{ code: 'HKD', symbol: 'HK$', decimals: 2, locale: 'zh-HK', region: 'east_asia' },
		{ code: 'JPY', symbol: '¥', decimals: 0, locale: 'ja-JP', region: 'east_asia' },
		{ code: 'KRW', symbol: '₩', decimals: 0, locale: 'ko-KR', region: 'east_asia' },
		{ code: 'MOP', symbol: 'MOP$', decimals: 2, locale: 'zh-MO', region: 'east_asia' },
		{ code: 'TWD', symbol: 'NT$', decimals: 2, locale: 'zh-TW', region: 'east_asia' },
		{ code: 'KHR', symbol: '៛', decimals: 2, locale: 'km-KH', region: 'southeast_asia' },
		{ code: 'LAK', symbol: '₭', decimals: 2, locale: 'lo-LA', region: 'southeast_asia' },
		{ code: 'MMK', symbol: 'K', decimals: 2, locale: 'my-MM', region: 'southeast_asia' },
		{ code: 'PHP', symbol: '₱', decimals: 2, locale: 'fil-PH', region: 'southeast_asia' },
		{ code: 'SGD', symbol: 'S$', decimals: 2, locale: 'en-SG', region: 'southeast_asia' },
		{ code: 'THB', symbol: '฿', decimals: 2, locale: 'th-TH', region: 'southeast_asia' },
		{ code: 'VND', symbol: '₫', decimals: 0, locale: 'vi-VN', region: 'southeast_asia' },
		{ code: 'AUD', symbol: 'A$', decimals: 2, locale: 'en-AU', region: 'oceania' },
		{ code: 'FJD', symbol: 'FJ$', decimals: 2, locale: 'en-FJ', region: 'oceania' },
		{ code: 'NZD', symbol: 'NZ$', decimals: 2, locale: 'en-NZ', region: 'oceania' },
		{ code: 'PGK', symbol: 'K', decimals: 2, locale: 'en-PG', region: 'oceania' },
		{ code: 'SBD', symbol: 'SI$', decimals: 2, locale: 'en-SB', region: 'oceania' },
		{ code: 'TOP', symbol: 'T$', decimals: 2, locale: 'to-TO', region: 'oceania' },
		{ code: 'BCH', symbol: 'BCH', decimals: 8, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'BTC', symbol: '₿', decimals: 8, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'BTG', symbol: 'BTG', decimals: 8, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'DASH', symbol: 'DASH', decimals: 8, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'EOS', symbol: 'EOS', decimals: 4, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'ETH', symbol: 'Ξ', decimals: 18, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'LTC', symbol: 'Ł', decimals: 8, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'XLM', symbol: 'XLM', decimals: 7, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'XRP', symbol: 'XRP', decimals: 6, locale: 'en-US', region: 'cryptocurrency' },
		{ code: 'AED', symbol: 'AED', decimals: 2, locale: 'ar-AE', region: 'other' },
		{ code: 'BDT', symbol: '৳', decimals: 2, locale: 'bn-BD', region: 'other' },
		{ code: 'EGP', symbol: 'E£', decimals: 2, locale: 'ar-EG', region: 'other' },
		{ code: 'IDR', symbol: 'Rp', decimals: 2, locale: 'id-ID', region: 'other' },
		{ code: 'MVR', symbol: 'Rf', decimals: 2, locale: 'dv-MV', region: 'other' },
		{ code: 'MYR', symbol: 'RM', decimals: 2, locale: 'ms-MY', region: 'other' },
		{ code: 'OMR', symbol: 'ر.ع.', decimals: 3, locale: 'ar-OM', region: 'other' },
		{ code: 'TRY', symbol: '₺', decimals: 2, locale: 'tr-TR', region: 'other' }
	]
};

const handler = createMcpHandler(
	(server) => {
		server.registerTool(
			'get_info',
			{
				title: 'Get App Info',
				description: 'Get information about Uha — a subscription tracker app for iOS',
				inputSchema: {}
			},
			async () => ({
				content: [
					{
						type: 'text',
						text: JSON.stringify({
							name: 'Uha',
							tagline: 'Subscription tracker with smart analytics',
							description:
								'Uha helps you track, analyze, and manage all your recurring subscriptions in one place. Supports multiple currencies with real-time exchange rates, spending forecasts, and iCloud sync.',
							platforms: ['iOS'],
							features: [
								'Track unlimited subscriptions (premium) / up to 5 (free)',
								'Multi-currency support with real-time exchange rates',
								'Spending analytics and forecasts',
								'iCloud sync and backup',
								'CSV export',
								'Payment reminders',
								'Custom categories'
							],
							pricing: UHA_PRICING,
							website: 'https://uha.app',
							license: 'AGPL-3.0'
						})
					}
				]
			})
		);

		server.registerTool(
			'get_pricing',
			{
				title: "Get App's Pricing data",
				description: "Get information about Uha's pricing",
				inputSchema: {}
			},
			async () => ({
				content: [
					{
						type: 'text',
						text: JSON.stringify(UHA_PRICING)
					}
				]
			})
		);

		server.registerTool(
			'get_app_links',
			{
				title: 'Get Download Links',
				description: 'Get App Store and Google Play download links for Uha',
				inputSchema: {}
			},
			async () => ({
				content: [
					{
						type: 'text',
						text: JSON.stringify({
							website: 'https://uha.app',
							testflight: 'https://testflight.apple.com/join/uVYrDkbA',
							appStore: 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581'
						})
					}
				]
			})
		);

		server.registerTool(
			'get_supported_currencies',
			{
				title: 'Get Supported Currencies',
				description: 'Get the list of currencies Uha supports for subscription tracking',
				inputSchema: {}
			},
			async () => {
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(UHA_CURRENCIES)
						}
					]
				};
			}
		);
	},
	{
		serverInfo: {
			name: 'Uha Subscription Tracker (MCP)',
			version: '1.1.0'
		}
	},
	{
		basePath: '/api',
		maxDuration: 15
	}
);

export { handler as GET, handler as POST, handler as DELETE };
