export const SITE_URL = 'https://uha.app';
export const MCP_ENDPOINT = `${SITE_URL}/api/mcp`;
export const APP_STORE_URL = 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581';
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/uVYrDkbA';

export const UHA_MARKDOWN = `# Uha

Uha is an iOS subscription tracker for recurring payments, renewal reminders, spending forecasts, multi-currency totals, iCloud sync, backup restoration, and CSV export.

## Key links

- Website: ${SITE_URL}
- App Store: ${APP_STORE_URL}
- TestFlight: ${TESTFLIGHT_URL}
- MCP endpoint: ${MCP_ENDPOINT}
- API catalog: ${SITE_URL}/.well-known/api-catalog
- Agent skills: ${SITE_URL}/.well-known/agent-skills/index.json
- Security policy: ${SITE_URL}/security

## Pricing

Uha is currently in public beta via Apple TestFlight. TestFlight purchases are for testing; real payments are handled only after App Store release through Apple In-App Purchase.

- Free: track up to 5 subscriptions, use 3 currencies, and view a 2-year future timeline.
- Unlimited: one-time purchase for unlimited subscriptions, all currencies, iCloud sync, backup restoration, a 10-year timeline, and future premium features.

## Privacy and data

Subscription data stays on the user's device unless iCloud sync or backup features are enabled by the user. The public website does not run advertising analytics.
`;

export const UHA_AGENT_SKILL = `# Uha Agent Skill

Use this skill when an agent needs product, pricing, availability, or integration information about Uha, the iOS subscription tracker.

## Capabilities

- Retrieve app summary, platform, pricing, and feature information.
- Discover App Store, TestFlight, website, and MCP links.
- Explain supported subscription-management workflows.
- Identify the public MCP server endpoint for machine-readable app information.

## Public resources

- Website: ${SITE_URL}
- App Store: ${APP_STORE_URL}
- TestFlight: ${TESTFLIGHT_URL}
- MCP server: ${MCP_ENDPOINT}
- API catalog: ${SITE_URL}/.well-known/api-catalog
- Security policy: ${SITE_URL}/security

## TestFlight beta

Uha is currently in public beta via Apple TestFlight. TestFlight purchases are for testing; real payments are handled only after App Store release through Apple In-App Purchase.

## Notes

Uha is iOS app. Public agent access is read-only and intended for discovery, product information, and routing users to the official install channels.
`;

export const AGENT_LINK_HEADER = [
	`<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
	`<${SITE_URL}/.well-known/openapi.json>; rel="service-desc"; type="application/openapi+json"`,
	`<${SITE_URL}/llms.txt>; rel="service-doc"; type="text/plain"`,
	`<${SITE_URL}/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
	`<${SITE_URL}/.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
	`<${SITE_URL}/.well-known/agent-card.json>; rel="describedby"; type="application/json"`
].join(', ');

export const markdownTokenCount = (markdown = UHA_MARKDOWN) => markdown.trim().split(/\s+/).length.toString();

export const WEBMCP_BOOTSTRAP_SCRIPT = String.raw`
(() => {
	const appInfo = {
		name: 'Uha',
		platform: 'iOS',
		website: 'https://uha.app',
		appStore: 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581',
		testFlight: 'https://testflight.apple.com/join/uVYrDkbA',
		description: 'Subscription tracker with renewal reminders, spending forecasts, multi-currency totals, and iCloud sync.',
		pricing: {
			free: 'Up to 5 subscriptions, 3 currencies, 2-year future timeline',
			unlimited: 'One-time purchase after App Store release. TestFlight purchases are for testing only.'
		}
	};

	const registerWebMcpTools = () => {
		const modelContext = navigator.modelContext;
		if (!modelContext || typeof modelContext.registerTool !== 'function') return false;
		if (window.__uhaWebMcpRegistered) return true;

		const controller = new AbortController();
		modelContext.registerTool(
			{
				name: 'get_uha_app_info',
				description: 'Return public product, beta, pricing, and install information for Uha.',
				inputSchema: {
					type: 'object',
					properties: {},
					additionalProperties: false
				},
				execute: async () => appInfo
			},
			{ signal: controller.signal }
		);

		window.__uhaWebMcpRegistered = true;
		window.__uhaWebMcpAbortController = controller;
		return true;
	};

	if (registerWebMcpTools()) return;

	let attempts = 0;
	const retry = window.setInterval(() => {
		attempts += 1;
		if (registerWebMcpTools() || attempts >= 20) {
			window.clearInterval(retry);
		}
	}, 50);

	window.addEventListener('pagehide', () => {
		window.__uhaWebMcpAbortController?.abort();
		window.__uhaWebMcpRegistered = false;
	});
})();
`;
