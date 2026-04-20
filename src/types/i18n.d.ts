import type common from '@locales/en/common.json';
import type landing from '@locales/en/landing.json';
import type privacy from '@locales/en/privacy.json';
import type terms from '@locales/en/terms.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common';
		resources: {
			common: typeof common;
			landing: typeof landing;
			privacy: typeof privacy;
			terms: typeof terms;
		};
	}
}
