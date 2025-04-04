<template>
    <div class="max-w-3xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-[#3871B1] mb-6">{{ $t('credits.title') }}</h2>
  
      <div v-if="packages.length" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
        >
          <h3 class="text-lg font-semibold text-[#3871B1] mb-1">{{ pkg.name }}</h3>
          <p class="text-gray-600">{{ pkg.amount }} {{ $t('credits.credits') }}</p>
          <p class="text-sm text-gray-400 mb-4">${{ pkg.price.toFixed(2) }}</p>
          <button
            @click="startPayment(pkg)"
            class="bg-[#FF8913] text-white px-4 py-2 rounded hover:bg-[#e77f0f] w-full"
          >
            {{ $t('credits.buyNow') }}
          </button>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">{{ $t('credits.noPackages') }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const packages = ref([])
  
  async function fetchPackages() {
    const { data, error } = await supabase
      .from('credit_packages')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true })
  
    if (!error) packages.value = data
  }
  
  onMounted(fetchPackages)
  
  // Ödeme başlatıldığında
  async function startPayment(pkg) {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
  
    if (!userId) {
      alert($t('credits.loginRequired'))
      return
    }
  
    // Ödeme kaydını 'pending' durumunda oluştur
    const { data: paymentLog, error } = await supabase
      .from('payment_logs')
      .insert({
        user_id: userId,
        package_id: pkg.id,
        status: 'pending'
      })
      .select()
      .single()
  
    if (error) {
      alert($t('credits.paymentInitError'))
      console.error(error)
      return
    }
  
    // Iyzico ödeme sayfasına yönlendir
    const token = paymentLog.id // Referans olarak log ID'si kullanılabilir
    window.location.href = `https://your-iyzico-checkout.com?token=${token}`
  }
  </script>