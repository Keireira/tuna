import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import ja from './locales/ja.json';
import es from './locales/es.json';

const supportedLangs = ['en', 'ru', 'ja', 'es'];

// Always init with 'en' so server and client first-render match.
// The real language is applied after hydration in AppShell.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    ja: { translation: ja },
    es: { translation: es },
  },
  lng: 'en',
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

/** Call after hydration to apply the user's saved / browser language. */
export function applyClientLanguage() {
  const saved = localStorage.getItem('uha-lang');
  const browser = navigator.language.slice(0, 2);
  const lang = saved || (supportedLangs.includes(browser) ? browser : 'en');
  if (lang !== i18n.language) {
    i18n.changeLanguage(lang);
  }
}
