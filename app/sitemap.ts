import { LOCALES, buildAlternates } from '@/lib/i18n';
import { SITE_URL } from '@/content/product';
import { SITE_PAGES, pagePath, type SitePageT } from '@/lib/site-pages';
import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap =>
	Object.entries(SITE_PAGES).flatMap(([page, lastModified]) =>
		LOCALES.map((locale) => ({
			url: `${SITE_URL}/${locale}${pagePath(page as SitePageT)}`,
			lastModified,
			alternates: {
				languages: buildAlternates(locale, pagePath(page as SitePageT))?.languages as Record<string, string>
			}
		}))
	);

export default sitemap;
