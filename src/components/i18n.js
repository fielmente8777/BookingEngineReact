// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en.json'; // Import your language files
import esTranslation from '../locales/es.json';
import hiTranslation from '../locales/hi.json';
import deTranslation from '../locales/de.json';
import frTranslation from '../locales/fr.json';
import itTranslation from '../locales/it.json';
import jaTranslation from '../locales/ja.json';
import koTranslation from '../locales/ko.json';
import ptTranslation from '../locales/pt.json';
import ruTranslation from '../locales/ru.json';


i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        es: { translation: esTranslation },
        hi: { translation: hiTranslation },
        de: { translation: deTranslation },
        fr: { translation: frTranslation },
        it: { translation: itTranslation },
        ja: { translation: jaTranslation },
        ko: { translation: koTranslation },
        pt: { translation: ptTranslation },
        ru: { translation: ruTranslation }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
        escapeValue: false, // React already escapes HTML by default
    },
});

export default i18n;
