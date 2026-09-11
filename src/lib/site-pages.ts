import { PRODUCT_LAST_REVIEWED } from '@/content/product';
import {
	PRIVACY_LAST_MODIFIED_AT,
	TERMS_LAST_MODIFIED_AT,
	SECURITY_LAST_MODIFIED_AT,
	SUPPORT_LAST_MODIFIED_AT
} from './document-dates';

export const SITE_PAGES = {
	'': new Date(`${PRODUCT_LAST_REVIEWED}T00:00:00.000Z`),
	privacy: PRIVACY_LAST_MODIFIED_AT,
	terms: TERMS_LAST_MODIFIED_AT,
	security: SECURITY_LAST_MODIFIED_AT,
	support: SUPPORT_LAST_MODIFIED_AT,
	mcp: new Date(`${PRODUCT_LAST_REVIEWED}T00:00:00.000Z`)
} as const;

export type SitePageT = keyof typeof SITE_PAGES;
export const pagePath = (page: SitePageT) => (page ? `/${page}` : '');
