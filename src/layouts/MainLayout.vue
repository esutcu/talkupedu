<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="min-h-screen bg-white dark:bg-gray-900">
    <header class="border-b bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-[#3871B1]">TalkUp</h1>
        
        <nav class="hidden md:flex space-x-6 text-sm font-medium">
          <router-link to="/" class="hover:text-[#3871B1]">{{ $t('layout.home') }}</router-link>
          <a href="#features" class="hover:text-[#3871B1]">{{ $t('layout.features') }}</a>
          <a href="#pricing" class="hover:text-[#3871B1]">{{ $t('layout.pricing') }}</a>
          <a href="#faq" class="hover:text-[#3871B1]">{{ $t('layout.faq') }}</a>
        </nav>

        <div class="flex space-x-3">
          <router-link to="/login" class="text-sm text-[#3871B1] font-medium">{{ $t('layout.login') }}</router-link>
          <router-link to="/signup" class="bg-[#FF8913] text-white text-sm px-4 py-2 rounded hover:bg-[#e77f0f]">
            {{ $t('layout.signup') }}
          </router-link>
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>