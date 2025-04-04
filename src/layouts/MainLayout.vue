<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="min-h-screen bg-white dark:bg-gray-900">
    <header class="border-b bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold text-brand dark:text-white">TalkUp</router-link>

        <div class="flex gap-3 items-center">
          <router-link v-if="isAdmin" to="/admin/dashboard" class="text-sm text-gray-600 dark:text-gray-200 hover:text-accent">Admin</router-link>
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </div>
    </header>

    <main class="px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const { locale } = useI18n()
const isAdmin = ref(false)

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  if (data?.user?.user_metadata?.role === 'admin') {
    isAdmin.value = true
  }
})
</script>
