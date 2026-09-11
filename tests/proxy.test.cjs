const assert = require('node:assert/strict');
const { test } = require('node:test');
const { NextRequest } = require('next/server');
const { unstable_doesMiddlewareMatch } = require('next/experimental/testing/server');
const { proxy, config } = require('../proxy.ts');
const { LOCALES } = require('../src/lib/i18n/index.ts');

test('the locale proxy skips APIs, discovery documents and public assets', () => {
	for (const url of [
		'/api/mcp',
		'/api/status',
		'/.well-known/oauth-protected-resource',
		'/prices.json',
		'/product.json',
		'/robots.txt',
		'/sitemap.xml',
		'/assets/showcases/list.PNG',
		'/_next/static/app.js'
	]) {
		assert.equal(unstable_doesMiddlewareMatch({ config, url }), false, url);
	}
	for (const url of ['/', '/support', '/ja/privacy', '/en/missing-page']) {
		assert.equal(unstable_doesMiddlewareMatch({ config, url }), true, url);
	}
});

test('language negotiation respects cookies, weights, regional tags and exclusions', () => {
	const cases = [
		[{ 'accept-language': 'ja-JP, en;q=0.8' }, 'ja'],
		[{ 'accept-language': 'ru;q=0, en;q=0.5' }, 'en'],
		[{ 'accept-language': 'ja; q=0.1, en;q=0.9' }, 'en'],
		[{ 'accept-language': 'es-MX;q=0.8, en;q=0.2' }, 'es'],
		[{ 'accept-language': 'ru;q=oops, kk;q=0.9' }, 'kk'],
		[{ 'accept-language': 'ru;q=2, ja;q=0.7' }, 'ja'],
		[{ 'accept-language': 'de, *;q=0.5' }, 'en'],
		[{ cookie: 'NEXT_LOCALE=ru', 'accept-language': 'ja' }, 'ru'],
		[{ cookie: 'NEXT_LOCALE=invalid', 'accept-language': 'ja' }, 'ja']
	];
	for (const [headers, locale] of cases) {
		const response = proxy(new NextRequest('https://uha.app/support?source=test', { headers }));
		assert.equal(response.status, 307);
		assert.equal(response.headers.get('location'), `https://uha.app/${locale}/support?source=test`);
		assert.equal(response.headers.get('vary'), 'Accept-Language, Cookie');
	}
});

test('the bare domain always redirects to English and preserves query parameters', () => {
	for (const headers of [
		{},
		{ 'accept-language': 'ja-JP, en;q=0.8' },
		{ cookie: 'NEXT_LOCALE=ru', 'accept-language': 'kk' },
		{ cookie: 'NEXT_LOCALE=es', 'accept-language': 'ru;q=1, en;q=0.1' }
	]) {
		const response = proxy(new NextRequest('https://uha.app/?source=shared&campaign=og', { headers }));
		assert.equal(response.status, 308);
		assert.equal(response.headers.get('location'), 'https://uha.app/en?source=shared&campaign=og');
		assert.equal(response.headers.get('vary'), null);
		assert.ok(response.headers.get('link'));
	}
});

test('localized requests retain their path for server-rendered 404 translations', () => {
	for (const locale of LOCALES) {
		const pathname = `/${locale}/missing-page`;
		const response = proxy(
			new NextRequest(`https://uha.app${pathname}`, {
				headers: { accept: 'text/markdown', 'x-pathname': '/en/spoofed' }
			})
		);
		assert.equal(response.headers.get('x-middleware-next'), '1');
		assert.equal(response.headers.get('location'), null);
		assert.equal(response.headers.get('x-middleware-request-x-pathname'), pathname);
		assert.ok(response.headers.get('x-middleware-override-headers').split(',').includes('x-pathname'));
	}
});

test('production canonical redirects preserve paths and query parameters', () => {
	for (const origin of ['http://uha.app', 'http://www.uha.app', 'https://www.uha.app']) {
		for (const pathname of ['/', '/ja/privacy']) {
			const response = proxy(new NextRequest(`${origin}${pathname}?source=test`));
			assert.equal(response.status, 308);
			assert.equal(response.headers.get('location'), `https://uha.app${pathname}?source=test`);
		}
	}
	const local = proxy(new NextRequest('http://127.0.0.1:3000/ja/privacy'));
	assert.equal(local.headers.get('x-middleware-next'), '1');
	assert.equal(local.headers.get('location'), null);
});

test('public MCP does not advertise nonexistent OAuth or OpenID discovery', async () => {
	for (const name of ['oauth-protected-resource', 'oauth-authorization-server', 'openid-configuration', 'jwks.json']) {
		const response = require(`../app/.well-known/${name}/route.ts`).GET();
		assert.equal(response.status, 404, name);
		const body = await response.json();
		assert.ok(!body.authorization_servers && !body.authorization_endpoint && !body.token_endpoint, name);
	}
});
