import { createMcpHandler } from 'mcp-handler';
import { APP_LINKS, MCP_SERVER_INFO, MCP_TOOLS, SITE_URL, UHA_PRODUCT } from '@/content/product';
import { UHA_PRICING_CATALOG } from '@/lib/price-catalog';
import { UHA_CURRENCIES } from '@/content/currency-catalog';
import { UHA_MARKDOWN } from '@/lib/agent-discovery';

const toolResults = {
	get_info: UHA_PRODUCT,
	get_pricing: UHA_PRICING_CATALOG,
	get_app_links: APP_LINKS,
	get_supported_currencies: UHA_CURRENCIES
};

const handler = createMcpHandler(
	(server) => {
		for (const tool of MCP_TOOLS) {
			server.registerTool(
				tool.name,
				{
					title: tool.title,
					description: tool.description,
					inputSchema: {},
					annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }
				},
				async () => ({
					structuredContent: toolResults[tool.name],
					content: [{ type: 'text' as const, text: JSON.stringify(toolResults[tool.name]) }]
				})
			);
		}
		server.registerResource(
			'uha-product-guide',
			`${SITE_URL}/llms-full.txt`,
			{
				title: 'Uha product guide',
				description: 'Public product facts, free and paid features, privacy boundaries, and official links.',
				mimeType: 'text/markdown'
			},
			async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: UHA_MARKDOWN }] })
		);
	},
	{ serverInfo: MCP_SERVER_INFO, maxSubscriptions: 0 }
);

export { handler as GET, handler as POST, handler as DELETE };
