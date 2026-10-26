import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en/translations.json'
import itTranslations from './locales/it/translations.json'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: enTranslation
    },
    it: {
        translation: itTranslations
    }
}

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'it',
        fallbackLng: 'it',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n
