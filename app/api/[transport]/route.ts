import { createMcpHandler } from 'mcp-handler';

const handler = createMcpHandler(
	(server) => {
		server.registerTool(
			'get_info',
			{
				title: 'Get App Info',
				description: 'Get information about Uha — a subscription tracker app for iOS and Android',
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
									limits:
										"Up to 5 subscriptions; 3 currencies (USD, EUR, your AppStore's currency) to recalc; no backups restoration; no sync with iClouc; future timeline limited by 2 years"
								},
								unlimited: {
									price: 'Paid subscription',
									features:
										'Unlimited subscriptions, all currencies, iCloud sync, backups restoration, 10 years timeline, all future premium features'
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
					const res = await fetch('https://sharkie.uha.app/currencies');
					const data = await res.json();

					return {
						content: [{ type: 'text', text: JSON.stringify(data) }]
					};
				} catch {
					return {
						content: [
							{
								type: 'text',
								text: JSON.stringify({
									note: 'Uha supports 100+ currencies with real-time exchange rates'
								})
							}
						]
					};
				}
			}
		);
	},
	{},
	{
		basePath: '/api',
		maxDuration: 30
	}
);

export { handler as GET, handler as POST, handler as DELETE };
