import {
	APP_LINKS,
	APP_STORE_URL,
	MCP_ENDPOINT,
	PRODUCT_LAST_REVIEWED,
	SITE_URL,
	TESTFLIGHT_URL,
	UHA_PRICING,
	UHA_PRODUCT
} from '@/content/product';

export { SITE_URL, MCP_ENDPOINT, APP_STORE_URL, TESTFLIGHT_URL } from '@/content/product';

const officialLinks = Object.entries(APP_LINKS)
	.map(([label, url]) => `- [${label}](${url})`)
	.join('\n');

export const UHA_MARKDOWN = `# Uha — Subscriptions Tracker for iOS

${UHA_PRODUCT.description}

Product facts reviewed: ${PRODUCT_LAST_REVIEWED}.

## What Uha does

${UHA_PRODUCT.features.map((feature) => `- ${feature}`).join('\n')}

## Free

${UHA_PRICING.free.limits.map((limit) => `- ${limit}`).join('\n')}

## Unlimited

${UHA_PRICING.unlimited.price}. ${UHA_PRICING.unlimited.priceNote}

U.S. customer price: ${UHA_PRICING.unlimited.referencePrice.currency} ${UHA_PRICING.unlimited.referencePrice.price}, reviewed ${UHA_PRICING.unlimited.referencePrice.snapshotAsOf}. [Regional price snapshot and scheduled changes](${APP_LINKS.prices}).

${UHA_PRICING.unlimited.features.map((feature) => `- ${feature}`).join('\n')}

${UHA_PRICING.restorePurchases}

## What Uha does not do

${UHA_PRODUCT.limitations.map((limit) => `- ${limit}`).join('\n')}

## Privacy and data

${UHA_PRODUCT.privacy.storage}

${UHA_PRODUCT.privacy.services}

Read the [privacy policy](${APP_LINKS.privacy}) for details.

## MCP and assistant access

The [public MCP server](${MCP_ENDPOINT}) uses Streamable HTTP and requires no Uha account or API key.
Its tools return public product information only: get_info, get_pricing, get_app_links, and get_supported_currencies.
It cannot access personal subscription libraries or iCloud backups, control the app, make payments, or cancel subscriptions.
The currency tool returns the app catalog and formatting metadata, not live exchange rates.

## Official links

${officialLinks}

## Website languages

${['en', 'ru', 'ja', 'es', 'kk'].map((locale) => `- [${locale}](${SITE_URL}/${locale})`).join('\n')}

## TestFlight

${UHA_PRICING.testflight}

## License

Uha source code uses ${UHA_PRODUCT.license}. The applicable license governs source-code rights.
`;

export const UHA_LLMS_INDEX = `# Uha

> ${UHA_PRODUCT.description}

Product facts reviewed: ${PRODUCT_LAST_REVIEWED}.

## Product and help

- [Product guide](${SITE_URL}/llms-full.txt): Features, free and paid limits, privacy boundaries, and supported workflows.
- [Product website](${SITE_URL}/en): Screenshots and feature explanations.
- [Pricing](${SITE_URL}/en#unlimited): Free and one-time Unlimited comparison.
- [Support](${APP_LINKS.support}): Purchases, exports, backups, and help.
- [Privacy](${APP_LINKS.privacy}): Local storage and service data processing.
- [Terms](${APP_LINKS.terms}): Use of Uha and purchases.
- [Security](${APP_LINKS.security}): Private vulnerability reporting.

## Assistant integration

- [MCP guide](${APP_LINKS.mcpDocumentation}): Read-only public tools and connection instructions.
- [MCP server](${MCP_ENDPOINT}): Streamable HTTP endpoint; not a browser page.
- [Machine-readable product facts](${SITE_URL}/product.json): The same public data returned by MCP.
- [Regional Unlimited prices](${APP_LINKS.prices}): Dated customer-price snapshot and separately listed scheduled changes.

## Install

- [App Store](${APP_STORE_URL})
- [TestFlight](${TESTFLIGHT_URL}): ${UHA_PRICING.testflight}

## Localized website

${['en', 'ru', 'ja', 'es', 'kk'].map((locale) => `- [${locale}](${SITE_URL}/${locale})`).join('\n')}
`;

export const UHA_AGENT_SKILL = `---
name: uha-web
description: Public Uha product facts, pricing limits, support, and official installation links.
---

# Uha public information

Read [the product guide](${SITE_URL}/llms-full.txt) for Uha features and current published limits.
Use [the MCP endpoint](${MCP_ENDPOINT}) with a Streamable HTTP client for public structured information.
Available tools: get_info, get_pricing, get_app_links, get_supported_currencies.
These tools cannot access personal libraries, control the app, pay for services, or cancel subscriptions.
For help, use [support](${APP_LINKS.support}); for installation, use [the App Store](${APP_STORE_URL}).
`;

export const AGENT_LINK_HEADER = [
	`<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
	`<${SITE_URL}/.well-known/openapi.json>; rel="service-desc"; type="application/openapi+json"`,
	`<${SITE_URL}/llms.txt>; rel="service-doc"; type="text/plain"`,
	`<${SITE_URL}/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
	`<${SITE_URL}/.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
	`<${SITE_URL}/.well-known/agent-card.json>; rel="describedby"; type="application/json"`
].join(', ');
