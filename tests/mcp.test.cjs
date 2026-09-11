const assert = require('node:assert/strict');
const { test } = require('node:test');
const { POST } = require('../app/api/mcp/route.ts');
const { MCP_SERVER_INFO, MCP_TOOLS, UHA_PRODUCT, APP_LINKS, SITE_URL } = require('../src/content/product.ts');
const { UHA_PRICING_CATALOG } = require('../src/lib/price-catalog.ts');
const { UHA_CURRENCIES } = require('../src/content/currency-catalog.ts');
const { UHA_MARKDOWN } = require('../src/lib/agent-discovery.ts');

// Exercise the public handler, including SDK serialization and schema validation.
const request = async (method, params = {}, modern = false) => {
	const headers = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' };
	if (modern) {
		headers['Mcp-Method'] = method;
		if (params.name) headers['Mcp-Name'] = params.name;
		if (params.uri) headers['Mcp-Name'] = params.uri;
		params = {
			...params,
			_meta: {
				'io.modelcontextprotocol/protocolVersion': '2026-07-28',
				'io.modelcontextprotocol/clientCapabilities': {},
				'io.modelcontextprotocol/clientInfo': { name: 'release-test', version: '1.0.0' }
			}
		};
	} else {
		headers['mcp-protocol-version'] = '2025-06-18';
	}
	const response = await POST(
		new Request(`${SITE_URL}/api/mcp`, {
			method: 'POST',
			headers,
			body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
		})
	);
	const body = await response.text();
	assert.equal(response.status, 200, body);
	const data = response.headers.get('content-type')?.includes('text/event-stream')
		? body
				.split('\n')
				.find((line) => line.startsWith('data: '))
				?.slice(6)
		: body;
	assert.ok(data, 'MCP response must contain a JSON-RPC message');
	const message = JSON.parse(data);
	assert.equal(message.error, undefined, data);
	return message.result;
};

test('MCP initializes existing Streamable HTTP clients and supports stateless discovery', async () => {
	const initialized = await request('initialize', {
		protocolVersion: '2025-06-18',
		capabilities: {},
		clientInfo: { name: 'release-test', version: '1.0.0' }
	});
	assert.deepEqual(initialized.serverInfo, MCP_SERVER_INFO);
	assert.equal(initialized.protocolVersion, '2025-06-18');
	const discovery = await request('server/discover', {}, true);
	assert.ok(discovery.supportedVersions.includes('2026-07-28'));
	assert.deepEqual(discovery._meta['io.modelcontextprotocol/serverInfo'], MCP_SERVER_INFO);
});

for (const modern of [false, true]) {
	test(`MCP exposes the four public tools and current data (${modern ? 'stateless' : 'legacy HTTP'})`, async () => {
		const list = await request('tools/list', {}, modern);
		assert.deepEqual(list.tools.map((tool) => tool.name).sort(), MCP_TOOLS.map((tool) => tool.name).sort());
		for (const tool of list.tools) {
			assert.equal(tool.annotations.readOnlyHint, true);
			assert.equal(tool.annotations.destructiveHint, false);
		}
		const expected = {
			get_info: UHA_PRODUCT,
			get_pricing: UHA_PRICING_CATALOG,
			get_app_links: APP_LINKS,
			get_supported_currencies: UHA_CURRENCIES
		};
		for (const [name, value] of Object.entries(expected)) {
			const result = await request('tools/call', { name, arguments: {} }, modern);
			assert.notEqual(result.isError, true, name);
			assert.deepEqual(result.structuredContent, value, name);
			assert.deepEqual(JSON.parse(result.content[0].text), value, name);
		}
		const resources = await request('resources/list', {}, modern);
		assert.ok(resources.resources.some((resource) => resource.uri === `${SITE_URL}/llms-full.txt`));
		const resource = await request('resources/read', { uri: `${SITE_URL}/llms-full.txt` }, modern);
		assert.equal(resource.contents[0].text, UHA_MARKDOWN);
	});
}

test('MCP rejects malformed JSON instead of executing a tool', async () => {
	const response = await POST(
		new Request(`${SITE_URL}/api/mcp`, {
			method: 'POST',
			headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
			body: '{'
		})
	);
	assert.equal(response.status, 400);
	assert.equal((await response.json()).error.code, -32700);
});
