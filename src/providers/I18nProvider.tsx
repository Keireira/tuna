'use client';

import { useEffect, useLayoutEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@lib/i18n/client';
import type { TLocale } from '@/lib/i18n';
import type { PropsWithChildren } from 'react';

type TProps = PropsWithChildren<{
	locale: TLocale;
}>;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const I18nProvider = ({ children, locale }: TProps) => {
	useIsomorphicLayoutEffect(() => {
		if (i18n.resolvedLanguage !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale]);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
