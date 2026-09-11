import type en from '@/locales/en/landing.json';
export type LandingCopyT = typeof en.showcase;
export type StorefrontPriceT = {
	countryOrRegion: string;
	countryCode: string;
	currency: string;
	price: string;
	snapshotAsOf: string;
};
export { APP_STORE_URL } from './product';
export const viewModes = ['feed', 'glance', 'month', 'year'] as const;
