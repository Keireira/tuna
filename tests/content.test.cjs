const assert = require('node:assert/strict');
const { readFileSync, readdirSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { I18nextProvider } = require('react-i18next');
const { ServerStyleSheet } = require('styled-components');
const { LOCALES } = require('../src/lib/i18n/index.ts');
const { NAMESPACES, getTranslation } = require('../src/lib/i18n/server.ts');
const { getPageMetadata, getPageStructuredData } = require('../src/lib/seo.ts');
const { getLocalePrice } = require('../src/lib/price-catalog.ts');
const { SITE_PAGES } = require('../src/lib/site-pages.ts');
const { SITE_URL, APP_STORE_URL } = require('../src/content/product.ts');
const { productMedia } = require('../src/content/product-media.ts');
const storefronts = require('../src/content/app-store-prices.json');
const StructuredDataScript = require('../src/components/agent/StructuredDataScript.tsx').default;

const root = path.resolve(__dirname, '..');
const pages = Object.keys(SITE_PAGES);
const regions = {
	en: ['United States', 'US', 'USD'],
	ru: ['Russia', 'RU', 'RUB'],
	ja: ['Japan', 'JP', 'JPY'],
	es: ['Spain', 'ES', 'EUR'],
	kk: ['Kazakhstan', 'KZ', 'KZT']
};
const homeSections = ['discovery', 'analytics', 'filters', 'timeline', 'craft', 'more', 'unlimited'];

const renderMarkup = (element) => {
	const sheet = new ServerStyleSheet();
	try {
		return renderToStaticMarkup(sheet.collectStyles(element));
	} finally {
		sheet.seal();
	}
};

const leafEntries = (value, prefix = '') =>
	Object.entries(value).flatMap(([key, item]) => {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		return item !== null && typeof item === 'object' ? leafEntries(item, fullKey) : [[fullKey, item]];
	});

const readLocale = (locale, namespace) =>
	JSON.parse(readFileSync(path.join(root, 'src', 'locales', locale, `${namespace}.json`), 'utf8'));

const publicFile = (src) => {
	assert.ok(src.startsWith('/') && !src.startsWith('//'), `Expected a local public asset: ${src}`);
	let directory = path.join(root, 'public');
	for (const segment of src.slice(1).split('/')) {
		assert.ok(readdirSync(directory).includes(segment), `Missing asset or incorrect filename case: ${src}`);
		directory = path.join(directory, segment);
	}
	return directory;
};

const pngDimensions = (file) => {
	const bytes = readFileSync(file);
	assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid PNG: ${file}`);
	return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
};

test('every supported locale has the complete, nonempty translation catalog', () => {
	for (const namespace of NAMESPACES) {
		const englishKeys = leafEntries(readLocale('en', namespace))
			.map(([key]) => key)
			.sort();
		for (const locale of LOCALES) {
			const entries = leafEntries(readLocale(locale, namespace));
			assert.deepEqual(entries.map(([key]) => key).sort(), englishKeys, `${locale}/${namespace} translation keys`);
			for (const [key, value] of entries) {
				if (typeof value === 'string') assert.ok(value.trim(), `${locale}/${namespace}:${key} is empty`);
			}
		}
	}
});

test('localized metadata and sitemap identify each real page and all language alternatives', async () => {
	const titles = new Set();
	const expectedUrls = [];
	for (const locale of LOCALES) {
		const socialImageUrl = `${SITE_URL}/og-image${locale === 'en' ? '' : `-${locale}`}.png?v=20260911-3`;
		for (const page of pages) {
			const suffix = page ? `/${page}` : '';
			const url = `${SITE_URL}/${locale}${suffix}`;
			expectedUrls.push(url);
			const metadata = await getPageMetadata(locale, page);
			assert.equal(metadata.alternates.canonical, url);
			assert.equal(metadata.openGraph.url, url);
			assert.equal(metadata.openGraph.title, metadata.title.absolute);
			assert.equal(metadata.twitter.description, metadata.description);
			assert.equal(metadata.openGraph.images[0].url, socialImageUrl);
			assert.deepEqual(metadata.twitter.images, [socialImageUrl]);
			assert.ok(metadata.description.trim());
			assert.ok(!titles.has(metadata.title.absolute), `Duplicate page title: ${metadata.title.absolute}`);
			titles.add(metadata.title.absolute);
			for (const language of LOCALES) {
				assert.equal(metadata.alternates.languages[language], `${SITE_URL}/${language}${suffix}`);
			}
			assert.equal(metadata.alternates.languages['x-default'], `${SITE_URL}/en${suffix}`);
			const data = await getPageStructuredData(locale, page);
			const webpage = data['@graph'].find((entry) => entry['@type'] === 'WebPage' || entry['@type'] === 'ContactPage');
			assert.equal(webpage.url, url);
			assert.equal(webpage.inLanguage, locale);
			assert.equal(webpage.dateModified, SITE_PAGES[page].toISOString());
			if (!page) {
				const app = data['@graph'].find((entry) => entry['@type'] === 'MobileApplication');
				assert.equal(app.image, socialImageUrl);
			}
		}
	}
	const sitemap = require('../app/sitemap.ts').default;
	const entries = sitemap();
	assert.deepEqual(entries.map(({ url }) => url).sort(), expectedUrls.sort());
	assert.equal(new Set(entries.map(({ url }) => url)).size, entries.length);
	assert.deepEqual(sitemap(), entries, 'Sitemap modification dates must not change on every request');
});

test('metadata and structured data default to English when no locale is supplied', async () => {
	assert.deepEqual(await getPageMetadata(), await getPageMetadata('en'));
	assert.deepEqual(await getPageStructuredData(), await getPageStructuredData('en'));
});

test('approved screenshots and social images exist with their exact case and declared dimensions', async () => {
	const approved = Object.values(productMedia).filter((media) => media.status === 'approved');
	assert.ok(approved.length > 0, 'The release must include approved product screenshots');
	for (const media of approved) {
		assert.ok(media.src, `${media.id}: approved media needs a source`);
		const file = publicFile(media.src);
		if (/\.png$/i.test(media.src)) {
			assert.deepEqual(pngDimensions(file), { width: media.width, height: media.height }, media.id);
		}
	}
	for (const locale of LOCALES) {
		const metadata = await getPageMetadata(locale);
		for (const image of metadata.openGraph.images) {
			const file = publicFile(new URL(image.url).pathname);
			assert.deepEqual(pngDimensions(file), { width: image.width, height: image.height }, locale);
		}
	}
});

for (const locale of LOCALES) {
	test(`${locale}: page HTML, navigation, visible pricing and JSON-LD agree`, async () => {
		const { i18n } = await getTranslation(locale);
		const missingKeys = [];
		i18n.options.saveMissing = true;
		i18n.on('missingKey', (_languages, namespace, key) => missingKeys.push(`${namespace}:${key}`));
		const [countryOrRegion, countryCode, currency] = regions[locale];
		const snapshotPrice = storefronts.prices.find((entry) => entry.countryOrRegion === countryOrRegion);
		assert.ok(snapshotPrice, `No customer price for ${countryOrRegion}`);
		assert.deepEqual(getLocalePrice(locale), {
			countryOrRegion,
			countryCode,
			currency,
			price: snapshotPrice.price,
			snapshotAsOf: storefronts.snapshotAsOf
		});
		for (const page of pages) {
			const suffix = page ? `/${page}` : '';
			const Page = require(`../app/[locale]${suffix}/page.tsx`).default;
			const element = await Page({ params: Promise.resolve({ locale }) });
			const markup = renderMarkup(React.createElement(I18nextProvider, { i18n }, element));
			const context = `${locale}${suffix}`;
			assert.equal((markup.match(/<h1\b/g) ?? []).length, 1, `${context}: one page heading`);
			assert.equal((markup.match(/<main\b/g) ?? []).length, 1, `${context}: one main landmark`);
			assert.ok(markup.includes(`lang="${locale}"`), `${context}: language`);
			assert.ok(!markup.includes('[object Object]'), `${context}: rendered object instead of text`);
			assert.ok(!markup.includes('{{'), `${context}: unresolved interpolation`);
			for (const language of LOCALES) {
				assert.ok(markup.includes(`href="/${language}${suffix}"`), `${context}: ${language} language link`);
			}
			const ids = new Set(Array.from(markup.matchAll(/\bid="([^"]+)"/g), (match) => match[1]));
			for (const match of markup.matchAll(/\bhref="#([^"]+)"/g)) {
				assert.ok(ids.has(match[1]), `${context}: missing anchor #${match[1]}`);
			}
			for (const section of homeSections) {
				if (page) assert.ok(markup.includes(`href="/${locale}#${section}"`), `${context}: home link #${section}`);
				else assert.ok(ids.has(section), `${context}: missing homepage section #${section}`);
			}
			for (const [, attributes] of markup.matchAll(/<a\b([^>]*)>/g)) {
				const href = attributes.match(/\bhref="([^"]+)"/)?.[1];
				if (!/^https?:\/\//.test(href ?? '')) continue;
				assert.ok(attributes.includes('target="_blank"'), `${context}: external link ${href} opens in a new tab`);
				const rel = attributes.match(/\brel="([^"]+)"/)?.[1].split(/\s+/) ?? [];
				assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), `${context}: safe external link ${href}`);
			}
			if (page) {
				assert.ok(!markup.includes('<canvas'), `${context}: information pages must render without WebGL`);
				continue;
			}
			const scripts = Array.from(
				markup.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
				(match) => JSON.parse(match[1])
			);
			const app = scripts
				.flatMap((script) => script['@graph'] ?? [])
				.find((entry) => entry['@type'] === 'MobileApplication');
			assert.ok(app, `${context}: app structured data`);
			const offer = app.offers.find((entry) => entry.name === 'Uha Unlimited');
			assert.equal(offer.price, snapshotPrice.price);
			assert.equal(offer.priceCurrency, currency);
			assert.equal(offer.eligibleRegion, countryCode);
			const visiblePrice = new Intl.NumberFormat(locale, {
				style: 'currency',
				currency,
				minimumFractionDigits: Number.isInteger(Number(snapshotPrice.price)) ? 0 : undefined
			}).format(Number(snapshotPrice.price));
			const priceMarkup = markup.match(/<mark\b[^>]*>([\s\S]*?)<\/mark>/)?.[1];
			assert.ok(priceMarkup?.includes(visiblePrice), `${context}: the visible price must match its storefront`);
			assert.ok(ids.has('pricing-region-note'), `${context}: accessible regional-price note`);
			const main = markup.slice(markup.indexOf('<main'), markup.indexOf('</main>'));
			const downloadIndex = main.lastIndexOf(`href="${APP_STORE_URL}"`);
			const hireIndex = main.indexOf('href="https://hirify.me/keireira"');
			assert.ok(downloadIndex >= 0 && hireIndex > downloadIndex, `${context}: closing App Store link precedes Hire me`);
		}
		assert.deepEqual(missingKeys, [], `${locale}: untranslated page labels`);
	});
}

test('JSON-LD renders hostile closing tags as data without creating another element', () => {
	const data = { text: '</script><img src=x onerror=alert(1)> & < test' };
	const markup = renderToStaticMarkup(React.createElement(StructuredDataScript, { id: 'test-data', json: data }));
	assert.equal((markup.match(/<script\b/g) ?? []).length, 1);
	assert.equal((markup.match(/<\/script>/g) ?? []).length, 1);
	const content = markup.slice(markup.indexOf('>') + 1, markup.lastIndexOf('</script>'));
	assert.deepEqual(JSON.parse(content), data);
	const outsideScript = markup.slice(0, markup.indexOf('>') + 1) + markup.slice(markup.lastIndexOf('</script>'));
	assert.ok(!outsideScript.includes('<img'));
});
