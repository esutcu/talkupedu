import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import tr from './locales/tr.json'
import ru from './locales/ru.json'

const userLang = navigator.language.slice(0, 2)
const defaultLocale = ['tr', 'ru'].includes(userLang) ? userLang : 'en'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: { en, tr, ru }
})
