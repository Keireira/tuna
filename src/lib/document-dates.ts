import type { TLocale } from '@/lib/i18n';

export const PRIVACY_LAST_MODIFIED_AT = new Date('2026-05-08T00:00:00.000Z');
export const TERMS_LAST_MODIFIED_AT = new Date('2026-05-08T00:00:00.000Z');
export const SECURITY_LAST_MODIFIED_AT = new Date('2026-05-08T00:00:00.000Z');

const LAST_UPDATED_LABELS: Record<TLocale, string> = {
	en: 'Last updated',
	ru: 'Последнее обновление',
	ja: '最終更新日',
	es: 'Última actualización',
	kk: 'Соңғы жаңарту'
};

export const formatLastModified = (date: Date, locale: string) => {
	const normalizedLocale = locale.split('-')[0] as TLocale;
	const label = LAST_UPDATED_LABELS[normalizedLocale] ?? LAST_UPDATED_LABELS.en;
	const formattedDate = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);

	return normalizedLocale === 'ja' ? `${label}：${formattedDate}` : `${label}: ${formattedDate}`;
};
