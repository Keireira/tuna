import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import ja from './locales/ja.json';
import es from './locales/es.json';

const savedLang = localStorage.getItem('uha-lang');
const browserLang = navigator.language.slice(0, 2);
const supportedLangs = ['en', 'ru', 'ja', 'es'];
const defaultLang = savedLang || (supportedLangs.includes(browserLang) ? browserLang : 'en');

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    ja: { translation: ja },
    es: { translation: es },
  },
  lng: defaultLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];
