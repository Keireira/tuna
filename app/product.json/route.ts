import { UHA_PRODUCT } from '@/content/product';

export const GET = () =>
	Response.json(UHA_PRODUCT, {
		headers: { 'cache-control': 'public, max-age=3600' }
	});
