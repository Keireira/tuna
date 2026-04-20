import { LOCALES } from '@lib/i18n';
import type { MetadataRoute } from 'next';

const ROUTES = [
	{ path: '', lastModified: new Date() },
	{ path: '/privacy', lastModified: new Date('2026-03-09') },
	{ path: '/terms', lastModified: new Date('2026-03-09') }
] as const;

const BASE_URL = 'https://uha.app';

const sitemap = (): MetadataRoute.Sitemap => {
	return ROUTES.flatMap(({ path, lastModified }) =>
		LOCALES.map((locale) => ({
			url: `${BASE_URL}/${locale}${path}`,
			lastModified,
			alternates: {
				languages: {
					...Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])),
					'x-default': `${BASE_URL}/en${path}`
				}
			}
		}))
	);
};

export default sitemap;
