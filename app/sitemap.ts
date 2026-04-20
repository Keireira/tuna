import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
	const lastModified = new Date();

	return [
		{
			url: 'https://uha.app',
			lastModified
		},
		{
			url: 'https://uha.app/privacy',
			lastModified: new Date('2026-03-09')
		},
		{
			url: 'https://uha.app/terms',
			lastModified: new Date('2026-03-09')
		}
	];
};

export default sitemap;
