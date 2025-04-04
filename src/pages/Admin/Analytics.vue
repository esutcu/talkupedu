<template>
    <div class="max-w-5xl mx-auto py-10 px-4">
      <h2 class="text-2xl font-bold mb-6">Admin Analytics</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <StatBox label="Total Revenue" :value="`$${revenue}`" />
        <StatBox label="Credits Sold" :value="creditsSold" />
        <StatBox label="Credits Used" :value="creditsUsed" />
      </div>
      <div class="grid md:grid-cols-2 gap-4 mt-6">
        <StatBox label="Low Credit Users (<10)" :value="lowCreditCount" />
        <StatBox label="Top Teacher" :value="topTeacher" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  import StatBox from '@/components/StatBox.vue'
  
  const revenue = ref(0)
  const creditsSold = ref(0)
  const creditsUsed = ref(0)
  const lowCreditCount = ref(0)
  const topTeacher = ref('')
  
  onMounted(async () => {
    const payments = await supabase.from('payment_logs').select('price')
    revenue.value = payments.data?.reduce((sum, p) => sum + (p.price || 0), 0)
  
    const packages = await supabase.from('credit_packages').select('amount')
    creditsSold.value = packages.data?.reduce((sum, p) => sum + (p.amount || 0), 0)
  
    const bookings = await supabase.from('bookings').select('id')
    creditsUsed.value = bookings.data?.length ?? 0
  
    const users = await supabase.from('user_credits').select('credits')
    lowCreditCount.value = users.data?.filter(u => u.credits < 10).length ?? 0
  
    const top = await supabase
      .from('bookings')
      .select('teacher_id, count:teacher_id', { count: 'exact', group: true })
  
    if (top.data?.length) {
      const sorted = [...top.data].sort((a, b) => b.count - a.count)
      const { data } = await supabase.from('users').select('full_name').eq('id', sorted[0].teacher_id).single()
      topTeacher.value = data?.full_name || 'N/A'
    }
  })
  </script>
  