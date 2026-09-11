import { MCP_ENDPOINT, MCP_SERVER_INFO, MCP_TOOLS, SITE_URL, PRODUCT_LAST_REVIEWED } from '@/content/product';

// A human/agent discovery inventory; protocol negotiation happens at the MCP endpoint.
export const GET = () =>
	Response.json({
		serverInfo: MCP_SERVER_INFO,
		lastReviewed: PRODUCT_LAST_REVIEWED,
		transport: { type: 'streamable-http', endpoint: MCP_ENDPOINT },
		authentication: 'none',
		capabilities: { tools: {}, resources: {} },
		tools: MCP_TOOLS,
		resources: [{ name: 'uha-product-guide', uri: `${SITE_URL}/llms-full.txt`, mimeType: 'text/markdown' }],
		documentationUrl: `${SITE_URL}/en/mcp`
	});
