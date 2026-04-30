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

## Pricing

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
