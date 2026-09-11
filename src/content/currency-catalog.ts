import currencies from './currencies.json';
import { PRODUCT_LAST_REVIEWED } from './product';

export const UHA_CURRENCIES = {
	lastReviewed: PRODUCT_LAST_REVIEWED,
	total: currencies.length,
	regions: [...new Set(currencies.map((currency) => currency.region))].sort(),
	currencies,
	availability: {
		subscriptionBilling: 'All listed currencies are available for subscription amounts in Free and Unlimited.',
		freeConversion:
			'Reporting and conversion use USD, EUR, and your App Store currency (device locale currency if unavailable). Duplicates are removed, leaving 2 or 3 currencies.',
		unlimitedConversion: 'All listed currencies are available for reporting and conversion.',
		rates: 'This is a currency catalog, not a live exchange-rate feed.'
	}
};
