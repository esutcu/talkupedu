<template>
    <div class="max-w-3xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-[#3871B1] mb-4">{{ $t('referral.title') }} 🎉</h2>
      <p class="mb-2">{{ $t('referral.description') }} <strong>{{ bonus.invite_bonus }}</strong> {{ $t('credits.credits') }}!</p>
  
      <div class="bg-gray-50 p-4 rounded border text-center">
        <p class="text-sm mb-2">{{ $t('referral.yourLink') }}:</p>
        <input :value="referralLink" readonly class="w-full border p-2 rounded bg-white text-gray-800 font-mono" />
      </div>
  
      <div class="mt-8">
        <h3 class="text-lg font-semibold mb-2">{{ $t('referral.invited') }}</h3>
        <ul v-if="referrals.length">
          <li v-for="r in referrals" :key="r.id" class="text-sm text-gray-700 mb-1">
            👤 {{ r.name }} — {{ r.credits_awarded ? $t('referral.bonusReceived') + ' ✅' : $t('referral.bonusPending') + ' ❌' }}
          </li>
        </ul>
        <p v-else class="text-sm text-gray-400">{{ $t('referral.noReferrals') }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const referralLink = ref('')
  const referrals = ref([])
  const bonus = ref({ invite_bonus: 5 })
  
  onMounted(async () => {
    const { data: user } = await supabase.auth.getUser()
  
    const { data: bonusData } = await supabase.from('referral_program').select('*').eq('is_active', true).single()
    if (bonusData) bonus.value = bonusData
  
    const { data: link } = await supabase.from('referral_links').select('*').eq('user_id', user.user.id).single()
  
    // Link yoksa oluştur
    if (!link) {
      const code = Math.random().toString(36).substring(2, 8)
      const { data: newLink } = await supabase.from('referral_links').insert({ user_id: user.user.id, code }).select().single()
      referralLink.value = `${window.location.origin}/signup?ref=${newLink.code}`
    } else {
      referralLink.value = `${window.location.origin}/signup?ref=${link.code}`
    }
  
    const { data: referred } = await supabase
      .from('referrals')
      .select('*, user:referred_user_id(full_name)')
      .eq('referrer_user_id', user.user.id)
  
    referrals.value = referred.map(r => ({
      name: r.user?.full_name ?? 'User',
      credits_awarded: r.credits_awarded
    }))
  })
  </script>