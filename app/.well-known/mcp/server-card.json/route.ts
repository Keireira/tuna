import { MCP_ENDPOINT } from '@agents';

export const GET = () =>
	Response.json({
		serverInfo: {
			name: 'Uha Subscription Tracker',
			version: '1.1.0'
		},
		transport: {
			type: 'streamable-http',
			endpoint: MCP_ENDPOINT
		},
		capabilities: {
			tools: {
				listChanged: false,
				items: ['get_info', 'get_pricing', 'get_app_links', 'get_supported_currencies']
			},
			resources: {},
			prompts: {}
		}
	});
