import { MCP_ENDPOINT, MCP_SERVER_INFO, MCP_TOOLS, SITE_URL, UHA_PRODUCT } from '@/content/product';

// Custom discovery document for this public MCP service, not an A2A agent card.
export const GET = () =>
	Response.json({
		name: MCP_SERVER_INFO.name,
		version: MCP_SERVER_INFO.version,
		description:
			'Read-only public Uha product information. This service cannot access or change a personal subscription library.',
		protocol: 'mcp',
		transport: { type: 'streamable-http', endpoint: MCP_ENDPOINT },
		authentication: 'none',
		scope: UHA_PRODUCT.mcpScope,
		tools: MCP_TOOLS,
		productInformationUrl: `${SITE_URL}/product.json`,
		serverCardUrl: `${SITE_URL}/.well-known/mcp/server-card.json`,
		documentationUrl: `${SITE_URL}/en/mcp`
	});
