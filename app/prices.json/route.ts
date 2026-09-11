import { UHA_PRICING_CATALOG } from '@/lib/price-catalog';

export const GET = () =>
	Response.json(UHA_PRICING_CATALOG, {
		headers: { 'cache-control': 'public, max-age=3600' }
	});
