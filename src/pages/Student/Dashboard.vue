<template>
    <div class="max-w-5xl mx-auto py-10 px-4">
      <h1 class="text-2xl font-bold mb-4">{{ $t('dashboard.student.title') }}</h1>
      <p>{{ $t('dashboard.student.credits') }}: {{ credits }}</p>
      <p v-if="credits < 10" class="text-red-500 mt-2">{{ $t('dashboard.student.lowCredits') }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const credits = ref(0)
  
  onMounted(async () => {
    const { data: user } = await supabase.auth.getUser()
    const { data } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.user.id)
      .single()
  
    credits.value = data?.credits ?? 0
  })
  </script>
  