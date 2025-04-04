<template>
    <div class="max-w-5xl mx-auto py-10 px-4">
      <h1 class="text-2xl font-bold mb-4">{{ $t('dashboard.teacher.title') }}</h1>
      <p>{{ $t('dashboard.teacher.hoursTaught') }}: {{ hours }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const hours = ref(0)
  
  onMounted(async () => {
    const { data: user } = await supabase.auth.getUser()
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('teacher_id', user.user.id)
  
    hours.value = data?.length ?? 0
  })
  </script>
  