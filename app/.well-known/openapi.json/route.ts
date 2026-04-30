import { SITE_URL } from '@agents';

export const GET = () =>
	Response.json({
		openapi: '3.1.0',
		info: {
			title: 'Uha Public MCP API',
			version: '1.1.0',
			description: 'Public MCP endpoint for read-only Uha app discovery tools.'
		},
		servers: [{ url: SITE_URL }],
		paths: {
			'/api/mcp': {
				get: {
					summary: 'Open MCP streamable HTTP endpoint',
					responses: {
						'200': {
							description: 'MCP endpoint response'
						}
					}
				},
				post: {
					summary: 'Invoke MCP streamable HTTP endpoint',
					responses: {
						'200': {
							description: 'MCP protocol response'
						}
					}
				}
			},
			'/api/status': {
				get: {
					summary: 'Service status',
					responses: {
						'200': {
							description: 'Service is reachable'
						}
					}
				}
			}
		}
	});
