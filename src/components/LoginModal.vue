<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button @click="$emit('close')" class="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          &times;
        </button>
        <h3 class="text-xl font-bold mb-4 text-[#3871B1] dark:text-white">{{ $t('auth.loginTitle') }}</h3>
        <form @submit.prevent="login">
          <input v-model="email" type="email" :placeholder="$t('auth.email')" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 mb-4 rounded" />
          <input v-model="password" type="password" :placeholder="$t('auth.password')" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 mb-4 rounded" />
          <button class="w-full bg-[#3871B1] text-white py-2 rounded hover:bg-[#305f93]">{{ $t('layout.login') }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { supabase } from '@/lib/supabase'
  
  const { t } = useI18n()
  const email = ref('')
  const password = ref('')
  
  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      alert(error.message)
    } else {
      alert(t('auth.loginSuccess'))
      // emit close or do redirect
      $emit('close')
    }
  }
  </script>