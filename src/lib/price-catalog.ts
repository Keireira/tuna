import 'server-only';
import storefrontPrices from '@/content/app-store-prices.json';
import { UHA_PRICING } from '@/content/product';
import type { StorefrontPriceT } from '@/content/landing';
import type { TLocale } from './i18n';

// Keep the full regional catalog on the server; pages receive only their storefront price.
const localeStorefronts = {
	en: { countryOrRegion: 'United States', countryCode: 'US' },
	ru: { countryOrRegion: 'Russia', countryCode: 'RU' },
	ja: { countryOrRegion: 'Japan', countryCode: 'JP' },
	es: { countryOrRegion: 'Spain', countryCode: 'ES' },
	kk: { countryOrRegion: 'Kazakhstan', countryCode: 'KZ' }
} satisfies Record<TLocale, { countryOrRegion: string; countryCode: string }>;

export const getLocalePrice = (locale: TLocale): StorefrontPriceT => {
	const storefront = localeStorefronts[locale];
	const price = storefrontPrices.prices.find((entry) => entry.countryOrRegion === storefront.countryOrRegion);
	if (!price) throw new Error(`Missing Unlimited price for ${storefront.countryCode}`);
	return { ...storefront, price: price.price, currency: price.currency, snapshotAsOf: storefrontPrices.snapshotAsOf };
};

export const UHA_PRICING_CATALOG = {
	...UHA_PRICING,
	storefrontPrices: {
		...storefrontPrices,
		total: storefrontPrices.prices.length,
		note: 'Customer prices from the dated developer export, not live purchase quotes. Scheduled changes are listed separately and are not applied to the snapshot. Apple’s purchase sheet shows the price currently available to your account.'
	}
};
