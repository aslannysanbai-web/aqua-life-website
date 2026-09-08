import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import kz from './kz.json';
import ru from './ru.json';
import en from './en.json';

const resources = {
  kz: { translation: kz },
  ru: { translation: ru },
  en: { translation: en },
};

const savedLanguage = localStorage.getItem('language') || 'kz';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'kz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
