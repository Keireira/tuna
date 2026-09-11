import { SITE_URL, MCP_ENDPOINT } from '@/content/product';

export const GET = () =>
	Response.json(
		{
			linkset: [
				{
					anchor: `${SITE_URL}/prices.json`,
					'service-desc': [{ href: `${SITE_URL}/.well-known/openapi.json`, type: 'application/openapi+json' }],
					'service-doc': [{ href: `${SITE_URL}/llms-full.txt`, type: 'text/plain' }]
				},
				{
					anchor: `${SITE_URL}/product.json`,
					'service-desc': [{ href: `${SITE_URL}/.well-known/openapi.json`, type: 'application/openapi+json' }],
					'service-doc': [{ href: `${SITE_URL}/llms-full.txt`, type: 'text/plain' }]
				},
				{
					anchor: MCP_ENDPOINT,
					'service-desc': [{ href: `${SITE_URL}/.well-known/mcp/server-card.json`, type: 'application/json' }],
					'service-doc': [{ href: `${SITE_URL}/en/mcp`, type: 'text/html' }]
				}
			]
		},
		{ headers: { 'content-type': 'application/linkset+json; charset=utf-8' } }
	);
