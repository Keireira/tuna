import { type NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale, type TLocale } from './src/lib/i18n';

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
	const pathLocale = pathname.split('/')[1];

	// Для валидных локалей — пропускаем, только ставим header
	if (isValidLocale(pathLocale)) {
		const response = NextResponse.next();
		response.headers.set('x-pathname', pathname);
		return response;
	}

	// Иначе редиректим
	const locale = getPreferredLocale(request);
	const url = request.nextUrl.clone();
	url.pathname = `/${locale}${pathname}`;

	return NextResponse.redirect(url, 308);
};

export const config = {
	matcher: ['/((?!api|_next|.well-known|.*\\..*).*)']
};
