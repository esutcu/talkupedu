import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { i18n } from './i18n'
import { createHead } from '@vueuse/head'
import router from './router'

import './assets/tailwind.css'
import 'flowbite'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createHead())

app.mount('#app')
