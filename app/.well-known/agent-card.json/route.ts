import { MCP_ENDPOINT, SITE_URL } from '@agents';

export const GET = () =>
	Response.json({
		name: 'Uha App Information Agent',
		version: '1.1.0',
		description:
			'Read-only public agent for discovering Uha product information, pricing, install links, and MCP tools.',
		supportedInterfaces: [
			{
				url: MCP_ENDPOINT,
				transport: 'mcp-streamable-http',
				protocol: 'mcp'
			}
		],
		capabilities: [
			'product-information',
			'pricing-information',
			'install-link-discovery',
			'currency-support-discovery'
		],
		skills: [
			{
				id: 'uha-product-info',
				name: 'Uha product information',
				description: 'Returns app summary, supported platform, privacy posture, license, and official links.'
			},
			{
				id: 'uha-pricing',
				name: 'Uha pricing',
				description: 'Returns public Free and Unlimited tier details.'
			}
		],
		documentationUrl: `${SITE_URL}/llms.txt`
	});
