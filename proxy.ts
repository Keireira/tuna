import { type NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale, type TLocale } from './src/lib/i18n';
import { AGENT_LINK_HEADER } from './src/lib/agent-discovery';

const getPreferredLocale = (request: NextRequest): TLocale => {
	const cookie = request.cookies.get('NEXT_LOCALE')?.value;
	if (cookie && isValidLocale(cookie)) return cookie;

	const accept = request.headers.get('accept-language') ?? '';
	const parsed = accept
		.split(',')
		.map((part) => {
			const [lang, ...rest] = part.trim().split(';');
			const qPart = rest.map((parameter) => parameter.trim()).find((r) => r.startsWith('q='));
			const q = qPart ? Number.parseFloat(qPart.slice(2)) : 1;
			return { lang: lang.trim().toLowerCase().split('-')[0], q };
		})
		.sort((a, b) => b.q - a.q);

	const match = parsed.find(({ lang, q }) => isValidLocale(lang) && Number.isFinite(q) && q > 0 && q <= 1);

	return (match?.lang ?? DEFAULT_LOCALE) as TLocale;
};

export const proxy = (request: NextRequest) => {
	const { pathname } = request.nextUrl;
	const hostname = request.nextUrl.hostname.toLowerCase();
	const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');

	if ((hostname === 'uha.app' || hostname === 'www.uha.app') && (proto !== 'https' || hostname === 'www.uha.app')) {
		const url = request.nextUrl.clone();
		url.protocol = 'https';
		url.hostname = 'uha.app';
		const response = NextResponse.redirect(url, 308);
		response.headers.set('link', AGENT_LINK_HEADER);
		return response;
	}

	const pathLocale = pathname.split('/')[1];

	// Для валидных локалей — пропускаем, только ставим header
	if (isValidLocale(pathLocale)) {
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set('x-pathname', pathname);
		const response = NextResponse.next({ request: { headers: requestHeaders } });
		response.headers.set('link', AGENT_LINK_HEADER);
		return response;
	}

	// Keep the bare domain's language stable for shared links and previews.
	const isRoot = pathname === '/';
	const locale = isRoot ? DEFAULT_LOCALE : getPreferredLocale(request);
	const url = request.nextUrl.clone();
	url.pathname = isRoot ? `/${locale}` : `/${locale}${pathname}`;

	const response = NextResponse.redirect(url, isRoot ? 308 : 307);
	if (!isRoot) response.headers.set('vary', 'Accept-Language, Cookie');
	response.headers.set('link', AGENT_LINK_HEADER);
	return response;
};

export const config = {
	matcher: ['/((?!api|_next|.well-known|.*\\..*).*)']
};
