import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import tr from './locales/tr.json'
import ru from './locales/ru.json'

// Tarayıcı diline bakılmaksızın varsayılan olarak Türkçe kullanılacak
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'tr', // Burayı 'tr' olarak değiştirdim
  fallbackLocale: 'en',
  messages: { en, tr, ru }
})