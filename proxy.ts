import { type NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale, type TLocale } from './src/lib/i18n';
import { AGENT_LINK_HEADER, UHA_MARKDOWN, markdownTokenCount } from './src/lib/agent-discovery';

const getPreferredLocale = (request: NextRequest): TLocale => {
	const cookie = request.cookies.get('NEXT_LOCALE')?.value;
	if (cookie && isValidLocale(cookie)) return cookie;

	const accept = request.headers.get('accept-language') ?? '';
	const parsed = accept
		.split(',')
		.map((part) => {
			const [lang, ...rest] = part.trim().split(';');
			const qPart = rest.find((r) => r.startsWith('q='));
			const q = qPart ? Number.parseFloat(qPart.slice(2)) : 1;
			return { lang: lang.toLowerCase().split('-')[0], q };
		})
		.sort((a, b) => b.q - a.q);

	const match = parsed.find(({ lang }) => isValidLocale(lang));

	return (match?.lang ?? DEFAULT_LOCALE) as TLocale;
};

export const proxy = (request: NextRequest) => {
	const { pathname } = request.nextUrl;
	const hostname = request.nextUrl.hostname.toLowerCase();
	const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
	const acceptsMarkdown = request.headers.get('accept')?.includes('text/markdown') ?? false;

	if ((pathname === '/' || isValidLocale(pathname.split('/')[1])) && acceptsMarkdown) {
		return new NextResponse(UHA_MARKDOWN, {
			headers: {
				'content-type': 'text/markdown; charset=utf-8',
				'x-markdown-tokens': markdownTokenCount(),
				link: AGENT_LINK_HEADER
			}
		});
	}

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
		const response = NextResponse.next();
		response.headers.set('x-pathname', pathname);
		response.headers.set('link', AGENT_LINK_HEADER);
		return response;
	}

	// Иначе редиректим
	const locale = getPreferredLocale(request);
	const url = request.nextUrl.clone();
	url.pathname = `/${locale}${pathname}`;

	const response = NextResponse.redirect(url, 307);
	response.headers.set('link', AGENT_LINK_HEADER);
	return response;
};

export const config = {
	matcher: ['/((?!api|_next|.well-known|.*\\..*).*)']
};
