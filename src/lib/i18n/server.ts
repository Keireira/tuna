import 'server-only';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { LOCALES, DEFAULT_LOCALE, type TLocale } from '@/lib/i18n';

import enCommon from '@locales/en/common.json';
import enLanding from '@locales/en/landing.json';
import enPrivacy from '@locales/en/privacy.json';
import enSecurity from '@locales/en/security.json';
import enSupport from '@locales/en/support.json';
import enTerms from '@locales/en/terms.json';
import enMcp from '@locales/en/mcp.json';

import ruCommon from '@locales/ru/common.json';
import ruLanding from '@locales/ru/landing.json';
import ruPrivacy from '@locales/ru/privacy.json';
import ruSecurity from '@locales/ru/security.json';
import ruSupport from '@locales/ru/support.json';
import ruTerms from '@locales/ru/terms.json';
import ruMcp from '@locales/ru/mcp.json';

import jaCommon from '@locales/ja/common.json';
import jaLanding from '@locales/ja/landing.json';
import jaPrivacy from '@locales/ja/privacy.json';
import jaSecurity from '@locales/ja/security.json';
import jaSupport from '@locales/ja/support.json';
import jaTerms from '@locales/ja/terms.json';
import jaMcp from '@locales/ja/mcp.json';

import esCommon from '@locales/es/common.json';
import esLanding from '@locales/es/landing.json';
import esPrivacy from '@locales/es/privacy.json';
import esSecurity from '@locales/es/security.json';
import esSupport from '@locales/es/support.json';
import esTerms from '@locales/es/terms.json';
import esMcp from '@locales/es/mcp.json';

import kkCommon from '@locales/kk/common.json';
import kkLanding from '@locales/kk/landing.json';
import kkPrivacy from '@locales/kk/privacy.json';
import kkSecurity from '@locales/kk/security.json';
import kkSupport from '@locales/kk/support.json';
import kkTerms from '@locales/kk/terms.json';
import kkMcp from '@locales/kk/mcp.json';

export const NAMESPACES = ['common', 'landing', 'mcp', 'privacy', 'security', 'support', 'terms'] as const;
export type TNamespace = (typeof NAMESPACES)[number];

const resources = {
	en: {
		common: enCommon,
		landing: enLanding,
		mcp: enMcp,
		privacy: enPrivacy,
		security: enSecurity,
		support: enSupport,
		terms: enTerms
	},
	ru: {
		common: ruCommon,
		landing: ruLanding,
		mcp: ruMcp,
		privacy: ruPrivacy,
		security: ruSecurity,
		support: ruSupport,
		terms: ruTerms
	},
	ja: {
		common: jaCommon,
		landing: jaLanding,
		mcp: jaMcp,
		privacy: jaPrivacy,
		security: jaSecurity,
		support: jaSupport,
		terms: jaTerms
	},
	es: {
		common: esCommon,
		landing: esLanding,
		mcp: esMcp,
		privacy: esPrivacy,
		security: esSecurity,
		support: esSupport,
		terms: esTerms
	},
	kk: {
		common: kkCommon,
		landing: kkLanding,
		mcp: kkMcp,
		privacy: kkPrivacy,
		security: kkSecurity,
		support: kkSupport,
		terms: kkTerms
	}
};

export const getTranslation = async (locale: TLocale, namespace: TNamespace | TNamespace[] = 'common') => {
	const instance = createInstance();
	await instance.use(initReactI18next).init({
		resources,
		lng: locale,
		fallbackLng: DEFAULT_LOCALE,
		supportedLngs: LOCALES,
		ns: NAMESPACES,
		defaultNS: 'common',
		fallbackNS: 'common',
		interpolation: { escapeValue: false }
	});

	const primaryNs = Array.isArray(namespace) ? namespace[0] : namespace;

	return {
		t: instance.getFixedT(locale, primaryNs),
		i18n: instance
	};
};
