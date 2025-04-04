<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-[#3871B1] mb-6">{{ $t('booking.bookClass') }}</h2>
  
      <!-- 1. Öğretmen Seçimi -->
      <label class="block mb-2 font-medium text-gray-700">{{ $t('booking.pickTeacher') }}</label>
      <select v-model="selectedTeacher" @change="fetchAvailability" class="border p-2 rounded w-full mb-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option disabled value="">-- {{ $t('booking.chooseTeacher') }} --</option>
        <option v-for="t in teachers" :key="t.id" :value="t.id">
          {{ t.full_name }}
        </option>
      </select>
  
      <!-- 2. Müsait Zaman Dilimlerini Göster -->
      <div v-if="slots.length" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ $t('booking.availableTimes') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="slot in slots" :key="slot.id" class="bg-white dark:bg-gray-800 p-4 border rounded shadow-sm">
            <p class="font-medium dark:text-white">{{ formatDate(slot.date) }} @ {{ slot.hour }}</p>
            <button
              class="mt-2 bg-[#FF8913] text-white px-3 py-1 text-sm rounded hover:bg-[#e77f0f]"
              @click="bookSlot(slot)"
            >
              {{ $t('booking.bookThisSlot') }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- 3. Rezervasyon Bilgilerini Göster -->
      <div v-if="booked" class="mt-8 p-6 bg-green-50 dark:bg-green-900 border-l-4 border-green-400 text-green-700 dark:text-green-200 rounded">
        <h3 class="text-lg font-semibold mb-2">{{ $t('booking.bookingConfirmed') }} 🎉</h3>
        <p>{{ $t('booking.classStarts') }}: <strong>{{ booked.start_time }}</strong></p>
        <p>{{ $t('booking.meetLink') }}: <a :href="booked.meet_link" target="_blank" class="text-blue-600 underline dark:text-blue-400">{{ $t('booking.join') }}</a></p>
  
        <!-- 15 dakika öncesinde aktifleşen buton -->
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
  import { ref, computed, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  const teachers = ref([])
  const selectedTeacher = ref('')
  const slots = ref([])
  const booked = ref(null)
  
  // 1. Tüm öğretmenleri getir role='teacher' 
  async function fetchTeachers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'teacher')
    if (!error) teachers.value = data
  }
  onMounted(fetchTeachers)
  
  // 2. Müsait zaman dilimlerini getir
  async function fetchAvailability() {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('teacher_id', selectedTeacher.value)
      .eq('is_booked', false)
      .gte('date', new Date().toISOString().slice(0, 10)) // Sadece gelecekteki
    if (!error) slots.value = data
  }
  
  // 3. Ders rezervasyonu
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
  
    // Google Meet link simülasyonu
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
  
  // Tarih formatla
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  }
  
  // "Katıl" butonu kontrolü: sadece 15 dk önce aktif
  const canJoin = computed(() => {
    if (!booked.value) return false
    const now = new Date()
    const start = new Date(booked.value.start_time)
    const diff = (start - now) / (1000 * 60) // dakika
    return diff <= 15 && diff >= -60 // 1 saat sonrasına kadar göster
  })
  </script>