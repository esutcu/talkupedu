<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h2 class="text-2xl font-bold mb-6 text-[#3871B1]">{{ $t('admin.referral.title') }}</h2>

    <form @submit.prevent="saveProgram" class="space-y-4">
      <label class="block">
        <input type="checkbox" v-model="isActive" />
        {{ $t('admin.referral.enable') }}
      </label>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">{{ $t('admin.referral.inviteBonus') }}</label>
          <input v-model.number="inviteBonus" type="number" class="border p-2 rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">{{ $t('admin.referral.joinBonus') }}</label>
          <input v-model.number="joinBonus" type="number" class="border p-2 rounded w-full" />
        </div>
      </div>

      <label class="block">
        <span class="text-sm font-medium text-gray-700">{{ $t('admin.referral.targetGroup') }}</span>
        <select v-model="targetGroup" class="border p-2 rounded w-full">
          <option value="all">{{ $t('admin.referral.allStudents') }}</option>
          <option value="selected">{{ $t('admin.referral.selectedOnly') }}</option>
        </select>
      </label>

      <button class="mt-4 bg-[#FF8913] text-white px-4 py-2 rounded hover:bg-[#e77f0f]">
        {{ $t('admin.referral.saveSettings') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const isActive = ref(false)
const inviteBonus = ref(5)
const joinBonus = ref(5)
const targetGroup = ref('all')

onMounted(async () => {
  const { data } = await supabase.from('referral_program').select('*').order('created_at', { ascending: false }).limit(1).single()
  if (data) {
    isActive.value = data.is_active
    inviteBonus.value = data.invite_bonus
    joinBonus.value = data.join_bonus
    targetGroup.value = data.target_group
  }
})

async function saveProgram() {
  await supabase.from('referral_program').insert({
    is_active: isActive.value,
    invite_bonus: inviteBonus.value,
    join_bonus: joinBonus.value,
    target_group: targetGroup.value
  })
  alert($t('admin.referral.saveSuccess'))
}
</script>