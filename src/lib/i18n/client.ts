'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n';

import enCommon from '@locales/en/common.json';
import enLanding from '@locales/en/landing.json';
import enPrivacy from '@locales/en/privacy.json';
import enTerms from '@locales/en/terms.json';

import ruCommon from '@locales/ru/common.json';
import ruLanding from '@locales/ru/landing.json';
import ruPrivacy from '@locales/ru/privacy.json';
import ruTerms from '@locales/ru/terms.json';

import jaCommon from '@locales/ja/common.json';
import jaLanding from '@locales/ja/landing.json';
import jaPrivacy from '@locales/ja/privacy.json';
import jaTerms from '@locales/ja/terms.json';

import esCommon from '@locales/es/common.json';
import esLanding from '@locales/es/landing.json';
import esPrivacy from '@locales/es/privacy.json';
import esTerms from '@locales/es/terms.json';

import kkCommon from '@locales/kk/common.json';
import kkLanding from '@locales/kk/landing.json';
import kkPrivacy from '@locales/kk/privacy.json';
import kkTerms from '@locales/kk/terms.json';

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources: {
			en: { common: enCommon, landing: enLanding, privacy: enPrivacy, terms: enTerms },
			ru: { common: ruCommon, landing: ruLanding, privacy: ruPrivacy, terms: ruTerms },
			ja: { common: jaCommon, landing: jaLanding, privacy: jaPrivacy, terms: jaTerms },
			es: { common: esCommon, landing: esLanding, privacy: esPrivacy, terms: esTerms },
			kk: { common: kkCommon, landing: kkLanding, privacy: kkPrivacy, terms: kkTerms }
		},
		lng: DEFAULT_LOCALE,
		fallbackLng: DEFAULT_LOCALE,
		supportedLngs: LOCALES,
		ns: ['common', 'landing', 'privacy', 'terms'],
		defaultNS: 'common',
		fallbackNS: 'common',
		interpolation: { escapeValue: false }
	});
}

export default i18n;
