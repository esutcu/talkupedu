<template>
    <div class="max-w-xl mx-auto text-center py-20">
      <h1 class="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">{{ $t('credits.paymentSuccess') }}</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-6">{{ $t('credits.creditsAdded') }} 🎉</p>
      <router-link to="/student/dashboard" class="text-[#3871B1] dark:text-[#5A92D2] underline">{{ $t('credits.backToDashboard') }}</router-link>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { supabase } from '@/lib/supabase'
  
  const route = useRoute()
  
  onMounted(async () => {
    const token = route.query.token
    
    if (token) {
      // Ödeme doğrulama
      // Gerçek uygulamada: Bu doğrulama sunucu tarafında yapılmalı
      const { data: paymentLog } = await supabase
        .from('payment_logs')
        .select('*, credit_packages!inner(amount)')
        .eq('id', token)
        .single()
      
      if (paymentLog) {
        // Ödeme kaydını güncelle
        await supabase.from('payment_logs')
          .update({ status: 'success' })
          .eq('id', token)
        
        // Kullanıcıya kredi ekle
        const { data: userCredit } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', paymentLog.user_id)
          .single()
        
        if (userCredit) {
          await supabase
            .from('user_credits')
            .update({ 
              credits: userCredit.credits + paymentLog.credit_packages.amount 
            })
            .eq('user_id', paymentLog.user_id)
        } else {
          await supabase
            .from('user_credits')
            .insert({ 
              user_id: paymentLog.user_id,
              credits: paymentLog.credit_packages.amount
            })
        }
      }
    }
  })
  </script>