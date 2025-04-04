<template>
    <div class="max-w-md mx-auto py-20 px-4">
      <h2 class="text-xl font-bold text-center mb-6">{{ $t('auth.signupTitle') }}</h2>
      <form @submit.prevent="signup">
        <input v-model="name" type="text" :placeholder="$t('auth.name')" class="w-full border p-2 rounded mb-4" />
        <input v-model="email" type="email" :placeholder="$t('auth.email')" class="w-full border p-2 rounded mb-4" />
        <input v-model="password" type="password" :placeholder="$t('auth.password')" class="w-full border p-2 rounded mb-4" />
        <button class="w-full bg-accent text-white py-2 rounded hover:bg-[#e77f0f]">
          {{ $t('layout.signup') }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  
  async function signup() {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { full_name: name.value, role: 'student' } // default as student
      }
    })
  
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email to confirm your account')
    }
  }
  </script>
  