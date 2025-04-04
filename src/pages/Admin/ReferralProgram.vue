<template>
    <div class="max-w-3xl mx-auto py-10 px-4">
      <h2 class="text-2xl font-bold mb-6">Referral Program Settings</h2>
  
      <form @submit.prevent="saveProgram" class="grid grid-cols-1 gap-4">
        <label>
          <input type="checkbox" v-model="isActive" />
          Enable Referral Program
        </label>
        <input v-model.number="inviteBonus" type="number" placeholder="Invite Bonus (credits)" class="border p-2 rounded" />
        <input v-model.number="joinBonus" type="number" placeholder="Join Bonus (credits)" class="border p-2 rounded" />
        <select v-model="targetGroup" class="border p-2 rounded">
          <option value="all">All Students</option>
          <option value="selected">Selected Students</option>
        </select>
        <button class="bg-accent text-white px-4 py-2 rounded hover:bg-[#e77f0f]">Save</button>
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
    alert('Referral program saved ✅')
  }
  </script>
  