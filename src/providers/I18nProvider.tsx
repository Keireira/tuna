'use client';

import { useEffect } from 'react';
import i18n from '@lib/i18n/client';
import { I18nextProvider } from 'react-i18next';

import type { TLocale } from '@lib/i18n';
import type { PropsWithChildren } from 'react';

type TProps = PropsWithChildren<{
	locale: TLocale;
}>;

const I18nProvider = ({ children, locale }: TProps) => {
	if (i18n.resolvedLanguage !== locale) {
		i18n.changeLanguage(locale);
	}

	useEffect(() => {
		if (i18n.resolvedLanguage !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale]);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
