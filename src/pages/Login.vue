<template>
    <div class="max-w-md mx-auto py-20 px-4">
      <h2 class="text-xl font-bold text-center mb-6">{{ $t('auth.loginTitle') }}</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" :placeholder="$t('auth.email')" class="w-full border p-2 rounded mb-4" />
        <input v-model="password" type="password" :placeholder="$t('auth.password')" class="w-full border p-2 rounded mb-4" />
        <button class="w-full bg-brand text-white py-2 rounded hover:bg-[#305f93]">
          {{ $t('layout.login') }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { supabase } from '@/lib/supabase'
  
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
      window.location.href = '/student/dashboard'
    }
  }
  </script>
  