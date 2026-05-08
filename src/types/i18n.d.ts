import type common from '@locales/en/common.json';
import type landing from '@locales/en/landing.json';
import type mcp from '@locales/en/mcp.json';
import type privacy from '@locales/en/privacy.json';
import type security from '@locales/en/security.json';
import type support from '@locales/en/support.json';
import type terms from '@locales/en/terms.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common';
		resources: {
			common: typeof common;
			landing: typeof landing;
			mcp: typeof mcp;
			privacy: typeof privacy;
			security: typeof security;
			support: typeof support;
			terms: typeof terms;
		};
	}
}
