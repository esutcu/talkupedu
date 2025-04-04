<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button @click="$emit('close')" class="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          &times;
        </button>
        <h3 class="text-xl font-bold mb-4 text-[#3871B1] dark:text-white">{{ $t('auth.signupTitle') }}</h3>
        <form @submit.prevent="signup">
          <input v-model="name" type="text" :placeholder="$t('auth.name')" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 mb-4 rounded" />
          <input v-model="email" type="email" :placeholder="$t('auth.email')" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 mb-4 rounded" />
          <input v-model="password" type="password" :placeholder="$t('auth.password')" class="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 mb-4 rounded" />
          <button class="w-full bg-[#FF8913] text-white py-2 rounded hover:bg-[#e77f0f]">{{ $t('layout.signup') }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { supabase } from '@/lib/supabase'
  
  const { t } = useI18n()
  const name = ref('')
  const email = ref('')
  const password = ref('')
  
  async function signup() {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { name: name.value }
      }
    })
    if (error) {
      alert(error.message)
    } else {
      alert(t('auth.signupSuccess'))
      $emit('close')
    }
  }
  </script>