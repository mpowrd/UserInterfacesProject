import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import settings_en from './locales/en/settings.json';
import settings_es from './locales/es/settings.json';

import common_en from './locales/en/common.json';
import common_es from './locales/es/common.json';
import guessSong_en from './locales/en/guessSong.json';
import guessSong_es from './locales/es/guessSong.json';
import orderSongs_en from './locales/en/orderSongs.json';
import orderSongs_es from './locales/es/orderSongs.json';
import guessCountry_en from './locales/en/guessCountry.json';
import guessCountry_es from './locales/es/guessCountry.json';


i18n // Detecta el idioma del navegador
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                settings: settings_en, // Tu namespace existente
                common: common_en,
                guessSong: guessSong_en,
                orderSongs: orderSongs_en,
                guessCountry: guessCountry_en
            },
            es: {
                settings: settings_es, // Tu namespace existente
                common: common_es,
                guessSong: guessSong_es,
                orderSongs: orderSongs_es,
                guessCountry: guessCountry_es
            }
        },
        // lng: 'es', // Puedes quitar esto si usas LanguageDetector
        fallbackLng: 'en', // Idioma de respaldo si el detectado no está disponible
        // Lista de todos los namespaces
        ns: ['settings', 'common', 'guessSong', 'orderSongs', 'guessCountry'],
        // Namespace por defecto si no se especifica en useTranslation
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        // Opciones para LanguageDetector (opcional)
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'], // Orden de detección
            caches: ['localStorage'], // Dónde guardar la elección del usuario
        }
    });

export default i18n;