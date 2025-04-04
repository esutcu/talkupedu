<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-[#3871B1] mb-6">{{ $t('booking.bookClassByTime') }}</h2>
  
      <!-- 1. Tarih ve Saat Seçimi -->
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="text-gray-700 dark:text-gray-300 font-medium block mb-2">{{ $t('booking.pickDate') }}</label>
          <input type="date" v-model="selectedDate" class="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label class="text-gray-700 dark:text-gray-300 font-medium block mb-2">{{ $t('booking.pickTime') }}</label>
          <select v-model="selectedHour" class="border rounded p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option disabled value="">-- {{ $t('booking.selectHour') }} --</option>
            <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
          </select>
        </div>
      </div>
  
      <!-- 2. Uygun Öğretmenleri Göster -->
      <div v-if="teacherSlots.length" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ $t('booking.availableTeachers') }}</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div v-for="slot in teacherSlots" :key="slot.id" class="p-4 bg-white dark:bg-gray-800 rounded shadow border">
            <p class="text-gray-800 dark:text-white font-medium">{{ slot.teacher_name }}</p>
            <button
              class="mt-2 px-4 py-1 text-sm bg-[#FF8913] text-white rounded hover:bg-[#e77f0f]"
              @click="bookSlot(slot)"
            >
              {{ $t('booking.bookThisTeacher') }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- 3. Rezervasyon Onaylandı -->
      <div v-if="booked" class="mt-8 p-6 bg-green-50 dark:bg-green-900 border-l-4 border-green-400 text-green-700 dark:text-green-200 rounded">
        <h3 class="text-lg font-semibold mb-2">{{ $t('booking.bookingConfirmed') }} ✅</h3>
        <p>{{ $t('booking.classTime') }}: <strong>{{ booked.start_time }}</strong></p>
        <p>
          {{ $t('booking.meetLink') }}: <a :href="booked.meet_link" target="_blank" class="text-blue-600 underline dark:text-blue-400">{{ $t('booking.joinNow') }}</a>
        </p>
  
        <button
          :disabled="!canJoin"
          class="mt-4 px-4 py-2 rounded text-white"
          :class="canJoin ? 'bg-[#3871B1]' : 'bg-gray-400 cursor-not-allowed'"
        >
          {{ $t('dashboard.student.joinNow') }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const selectedDate = ref('')
  const selectedHour = ref('')
  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]
  
  const teacherSlots = ref([])
  const booked = ref(null)
  
  // Seçilen tarih ve saat için müsait öğretmenleri getir
  watch([selectedDate, selectedHour], async () => {
    if (!selectedDate.value || !selectedHour.value) return
  
    const { data, error } = await supabase
      .from('availability')
      .select(`
        id, teacher_id, date, hour, users(full_name)
      `)
      .eq('date', selectedDate.value)
      .eq('hour', selectedHour.value)
      .eq('is_booked', false)
  
    if (!error) {
      teacherSlots.value = data.map((slot) => ({
        id: slot.id,
        teacher_id: slot.teacher_id,
        teacher_name: slot.users.full_name,
        date: slot.date,
        hour: slot.hour
      }))
    }
  })
  
  // Seçilen öğretmeni ayır
  async function bookSlot(slot) {
    const { data: userData } = await supabase.auth.getUser()
    const studentId = userData.user.id
  
    // Kredi kontrolü
    const { data: studentCredit } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', studentId)
      .single()
  
    if (!studentCredit || studentCredit.credits < 1) {
      alert($t('booking.notEnoughCredits'))
      return
    }
  
    const meetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 7)}`
    const startTime = new Date(`${slot.date}T${slot.hour}`)
  
    const { data, error } = await supabase.from('bookings').insert({
      student_id: studentId,
      teacher_id: slot.teacher_id,
      availability_id: slot.id,
      meet_link: meetLink,
      start_time: startTime
    }).select().single()
  
    if (!error) {
      // Zaman dilimini rezerve edildi olarak işaretle
      await supabase.from('availability').update({ is_booked: true }).eq('id', slot.id)
      
      // Öğrenciden kredi düş
      await supabase
        .from('user_credits')
        .update({ credits: studentCredit.credits - 1 })
        .eq('user_id', studentId)
        
      // Öğretmene kredi ekle
      const { data: teacherCredit } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', slot.teacher_id)
        .single()
        
      await supabase
        .from('user_credits')
        .update({ credits: (teacherCredit?.credits ?? 0) + 1 })
        .eq('user_id', slot.teacher_id)
        
      booked.value = data
    }
  }
  
  // 15 dakika önce katıl butonu aktifleşsin
  const canJoin = computed(() => {
    if (!booked.value) return false
    const now = new Date()
    const start = new Date(booked.value.start_time)
    const diff = (start - now) / 60000 // dakika
    return diff <= 15 && diff >= -60
  })
  </script>