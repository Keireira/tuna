import { LOCALES, DEFAULT_LOCALE, type TLocale } from '@/lib/i18n';

export const NAMESPACES = ['common', 'landing', 'terms', 'privacy', 'security', 'support', 'mcp'] as const;
export const DEFAULT_NAMESPACE = 'common';

export type TNamespace = (typeof NAMESPACES)[number];

export const getOptions = (
	locale: TLocale = DEFAULT_LOCALE,
	namespace: TNamespace | readonly TNamespace[] = DEFAULT_NAMESPACE
) => ({
	supportedLngs: LOCALES,
	fallbackLng: DEFAULT_LOCALE,
	lng: locale,
	fallbackNS: DEFAULT_NAMESPACE,
	defaultNS: DEFAULT_NAMESPACE,
	ns: namespace
});
