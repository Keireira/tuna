import { createMcpHandler } from 'mcp-handler';

const DEFAULT_CURRENCIES = {
	currencies: [
		'ADA',
		'AED',
		'AFN',
		'ALA',
		'ALL',
		'AMD',
		'ANG',
		'AOA',
		'ARS',
		'AUD',
		'AWG',
		'AZN',
		'BAM',
		'BBD',
		'BCH',
		'BDT',
		'BGN',
		'BHD',
		'BIF',
		'BMD',
		'BNB',
		'BND',
		'BOB',
		'BRL',
		'BSD',
		'BTC',
		'BTG',
		'BWP',
		'BYN',
		'BZD',
		'CAD',
		'CDF',
		'CHF',
		'CLF',
		'CLP',
		'CNH',
		'CNY',
		'COP',
		'CRC',
		'CUC',
		'CUP',
		'CVE',
		'CZK',
		'DASH',
		'DJF',
		'DKK',
		'DOGE',
		'DOP',
		'DOT',
		'DZD',
		'EGP',
		'EOS',
		'ERN',
		'ETB',
		'ETH',
		'EUR',
		'FJD',
		'FKP',
		'GBP',
		'GEL',
		'GGP',
		'GHS',
		'GIP',
		'GMD',
		'GNF',
		'GTQ',
		'GYD',
		'HKD',
		'HNL',
		'HRK',
		'HTG',
		'HUF',
		'IDR',
		'ILS',
		'INR',
		'IQD',
		'IRR',
		'ISK',
		'JEP',
		'JMD',
		'JOD',
		'JPY',
		'KES',
		'KGS',
		'KHR',
		'KMF',
		'KRW',
		'KWD',
		'KYD',
		'KZT',
		'LAK',
		'LBP',
		'LINK',
		'LKR',
		'LRD',
		'LSL',
		'LTC',
		'LYD',
		'MAD',
		'MDL',
		'MGA',
		'MKD',
		'MMK',
		'MNT',
		'MOP',
		'MRO',
		'MUR',
		'MVR',
		'MWK',
		'MXN',
		'MYR',
		'MZN',
		'NAD',
		'NGN',
		'NIO',
		'NOK',
		'NPR',
		'NZD',
		'OMR',
		'PAB',
		'PEN',
		'PGK',
		'PHP',
		'PKR',
		'PLN',
		'PYG',
		'QAR',
		'RON',
		'RSD',
		'RUB',
		'RWF',
		'SAR',
		'SBD',
		'SCR',
		'SDG',
		'SEK',
		'SGD',
		'SHP',
		'SLL',
		'SOL',
		'SOS',
		'SRD',
		'STN',
		'SVC',
		'SYP',
		'SZL',
		'THB',
		'TJS',
		'TMT',
		'TND',
		'TOP',
		'TRY',
		'TTD',
		'TWD',
		'TZS',
		'UAH',
		'UGX',
		'USD',
		'USDC',
		'USDT',
		'UYU',
		'UZS',
		'VES',
		'VND',
		'VUV',
		'XAF',
		'XAG',
		'XAU',
		'XCD',
		'XCG',
		'XLM',
		'XOF',
		'XPF',
		'XRP',
		'YER',
		'ZAR',
		'ZMW'
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
								'Track unlimited subscriptions',
								'Multi-currency support with real-time exchange rates',
								'Spending analytics and forecasts',
								'iCloud sync and backup',
								'CSV export',
								'Payment reminders',
								'Custom categories'
							],
							pricing: {
								free: {
									price: 'Free',
									limits: [
										'Up to 5 subscriptions',
										'3 currencies for conversion (USD, EUR, and your App Store currency)',
										'No iCloud sync or backup restoration',
										'Future timeline limited to 2 years'
									]
								},
								unlimited: {
									price: 'Paid subscription',
									features: [
										'Unlimited subscriptions',
										'All currencies',
										'iCloud sync',
										'Backups restoration',
										'10 years timeline',
										'All future premium features'
									]
								}
							},
							website: 'https://uha.app',
							license: 'AGPL-3.0'
						})
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
				try {
					const res = await fetch('https://sharkie.uha.app/currencies', {
						next: { revalidate: 3600 }
					});
					const data = await res.json();

					return {
						content: [{ type: 'text', text: JSON.stringify(data) }]
					};
				} catch {
					return {
						content: [
							{
								type: 'text',
								text: JSON.stringify(DEFAULT_CURRENCIES)
							}
						]
					};
				}
			}
		);
	},
	{
		serverInfo: {
			name: 'Uha Subscription Tracker (MCP)',
			version: '0.2.0'
		}
	},
	{
		basePath: '/api',
		maxDuration: 15
	}
);

export { handler as GET, handler as POST, handler as DELETE };
