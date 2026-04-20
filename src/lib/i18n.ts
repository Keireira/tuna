import type { Metadata } from 'next';

export const LOCALES = ['en', 'ru', 'ja', 'es', 'kk'] as const;
export const DEFAULT_LOCALE: TLocale = 'en';
export type TLocale = (typeof LOCALES)[number];

type LanguageT = {
	code: TLocale;
	name: string;
	flag: string;
};

export const LANGUAGES = [
	{ code: 'en', name: 'English', flag: '🇺🇸' },
	{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
	{ code: 'ja', name: '日本語', flag: '🇯🇵' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' },
	{ code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
] as const satisfies readonly LanguageT[];

export const OG_LOCALE_MAP: Record<TLocale, string> = {
	en: 'en_US',
	ru: 'ru_RU',
	ja: 'ja_JP',
	es: 'es_ES',
	kk: 'kk_KZ'
};

export const isValidLocale = (value: string): value is TLocale => (LOCALES as readonly string[]).includes(value);

export const buildAlternates = (locale: TLocale, path: string = ''): Metadata['alternates'] => {
	const base = 'https://uha.app';

	return {
		canonical: `${base}/${locale}${path}`,
		languages: {
			...Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}${path}`])),
			'x-default': `${base}/${DEFAULT_LOCALE}${path}`
		}
	};
};
