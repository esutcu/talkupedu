<template>
    <div class="max-w-6xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-[#3871B1] mb-6">{{ $t('admin.dashboard.title') }}</h2>
  
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <router-link to="/admin/analytics" class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center hover:shadow-md">
          <h3 class="text-xl font-semibold text-[#3871B1] dark:text-white mb-2">{{ $t('admin.dashboard.analytics') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ $t('admin.dashboard.analyticsDesc') }}</p>
        </router-link>
  
        <router-link to="/admin/packages" class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center hover:shadow-md">
          <h3 class="text-xl font-semibold text-[#3871B1] dark:text-white mb-2">{{ $t('admin.dashboard.packages') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ $t('admin.dashboard.packagesDesc') }}</p>
        </router-link>
  
        <router-link to="/admin/referral" class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center hover:shadow-md">
          <h3 class="text-xl font-semibold text-[#3871B1] dark:text-white mb-2">{{ $t('admin.dashboard.referral') }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ $t('admin.dashboard.referralDesc') }}</p>
        </router-link>
      </div>
  
      <h3 class="text-xl font-semibold mb-4">{{ $t('admin.dashboard.recentActivity') }}</h3>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4">
        <div v-if="recentPayments.length" class="mb-8">
          <h4 class="font-medium mb-2">{{ $t('admin.dashboard.recentPayments') }}</h4>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-sm border-b">
                  <th class="pb-2">{{ $t('admin.dashboard.user') }}</th>
                  <th class="pb-2">{{ $t('admin.dashboard.package') }}</th>
                  <th class="pb-2">{{ $t('admin.dashboard.amount') }}</th>
                  <th class="pb-2">{{ $t('admin.dashboard.date') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payment in recentPayments" :key="payment.id" class="border-b text-sm">
                  <td class="py-2">{{ payment.user }}</td>
                  <td class="py-2">{{ payment.package }}</td>
                  <td class="py-2">${{ payment.amount }}</td>
                  <td class="py-2">{{ formatDate(payment.date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const recentPayments = ref([])
  
  onMounted(async () => {
    const { data: payments } = await supabase
      .from('payment_logs')
      .select(`
        id,
        users:user_id(full_name),
        credit_packages:package_id(name, price),
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(5)
  
    if (payments) {
      recentPayments.value = payments.map(p => ({
        id: p.id,
        user: p.users?.full_name || 'Unknown',
        package: p.credit_packages?.name || 'Unknown',
        amount: p.credit_packages?.price || 0,
        date: p.created_at
      }))
    }
  })
  
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString()
  }
  </script>