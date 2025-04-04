<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-[#3871B1] mb-4">{{ $t('dashboard.teacher.setAvailability') }}</h2>
  
      <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div v-for="(day, index) in weekDays" :key="index" class="bg-white dark:bg-gray-800 shadow rounded p-4">
          <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">{{ day.label }}</h4>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="hour in hours"
              :key="hour"
              @click="toggleSlot(day.value, hour)"
              :class="[
                'px-2 py-1 text-xs rounded border',
                selected[day.value]?.includes(hour)
                  ? 'bg-[#3871B1] text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              ]"
            >
              {{ hour }}
            </button>
          </div>
        </div>
      </div>
  
      <button
        @click="saveAvailability"
        class="mt-6 bg-[#FF8913] text-white px-6 py-2 rounded hover:bg-[#e77f0f]"
      >
        {{ $t('dashboard.teacher.saveAvailability') }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  // Haftanın günleri (ISO format)
  const weekDays = [
    { label: $t('days.monday'), value: '2025-04-07' },
    { label: $t('days.tuesday'), value: '2025-04-08' },
    { label: $t('days.wednesday'), value: '2025-04-09' },
    { label: $t('days.thursday'), value: '2025-04-10' },
    { label: $t('days.friday'), value: '2025-04-11' },
    { label: $t('days.saturday'), value: '2025-04-12' },
    { label: $t('days.sunday'), value: '2025-04-13' }
  ]
  
  // Saat dilimleri (platformun programına göre ayarlayın)
  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]
  
  const selected = ref({})
  
  // Seçimi değiştir
  function toggleSlot(day, hour) {
    if (!selected.value[day]) selected.value[day] = []
    const index = selected.value[day].indexOf(hour)
    if (index > -1) {
      selected.value[day].splice(index, 1)
    } else {
      selected.value[day].push(hour)
    }
  }
  
  // Seçili müsaitlik durumunu Supabase'e kaydet
  async function saveAvailability() {
    const user = await supabase.auth.getUser()
    const teacherId = user.data.user.id
  
    let entries = []
    for (const date in selected.value) {
      for (const hour of selected.value[date]) {
        entries.push({
          teacher_id: teacherId,
          date,
          hour,
          is_booked: false
        })
      }
    }
  
    if (entries.length === 0) {
      alert($t('dashboard.teacher.selectAtLeastOne'))
      return
    }
  
    const { error } = await supabase.from('availability').insert(entries)
    if (error) {
      console.error(error)
      alert($t('dashboard.teacher.errorSaving'))
    } else {
      alert($t('dashboard.teacher.availabilitySaved'))
      selected.value = {}
    }
  }
  </script>