import { SITE_URL } from '@agents';

export const GET = () =>
	Response.json(
		{
			linkset: [
				{
					anchor: `${SITE_URL}/api/mcp`,
					'service-desc': [
						{
							href: `${SITE_URL}/.well-known/openapi.json`,
							type: 'application/openapi+json'
						}
					],
					'service-doc': [
						{
							href: `${SITE_URL}/llms.txt`,
							type: 'text/plain'
						}
					],
					status: [
						{
							href: `${SITE_URL}/api/status`
						}
					]
				}
			]
		},
		{
			headers: {
				'content-type': 'application/linkset+json; charset=utf-8'
			}
		}
	);
