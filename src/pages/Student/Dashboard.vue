<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#3871B1]">{{ $t('dashboard.student.title') }}</h2>
      <div class="text-right">
        <p class="text-sm text-gray-700">
          {{ $t('dashboard.student.credits') }}: <strong>{{ credits }}</strong>
        </p>
        <p v-if="credits < 10" class="text-sm text-red-500 mt-1">
          {{ $t('dashboard.student.lowCredits') }}
        </p>
      </div>
    </div>

    <div v-if="classes.length" class="space-y-4">
      <div
        v-for="session in classes"
        :key="session.id"
        class="bg-white p-4 rounded shadow border flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ formatDateTime(session.start_time) }}</p>
          <p class="text-sm text-gray-600">{{ $t('dashboard.student.withTeacher') }}: <strong>{{ session.teacher_name }}</strong></p>
        </div>

        <div class="mt-4 md:mt-0 flex items-center gap-2">
          <a
            :href="session.meet_link"
            target="_blank"
            v-if="canJoin(session.start_time)"
            class="bg-[#3871B1] text-white px-4 py-2 rounded hover:bg-[#305f93]"
          >
            {{ $t('dashboard.student.joinNow') }}
          </a>
          <button
            disabled
            v-else
            class="px-4 py-2 rounded bg-gray-300 text-white cursor-not-allowed"
          >
            {{ $t('booking.notAvailableYet') }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 mt-8 text-center">{{ $t('dashboard.student.noClasses') }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const classes = ref([])
const credits = ref(0)

async function fetchClasses() {
  const { data: userData } = await supabase.auth.getUser()
  const studentId = userData.user.id

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      teacher_id,
      start_time,
      meet_link,
      users:teacher_id(full_name)
    `)
    .eq('student_id', studentId)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })

  if (!error) {
    classes.value = data.map((b) => ({
      id: b.id,
      teacher_name: b.users?.full_name ?? 'Unknown',
      start_time: b.start_time,
      meet_link: b.meet_link
    }))
  }
}

async function fetchCredits() {
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user.id

  const { data } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', userId)
    .single()

  credits.value = data?.credits ?? 0
}

function formatDateTime(datetime) {
  const dt = new Date(datetime)
  return dt.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function canJoin(datetime) {
  const now = new Date()
  const start = new Date(datetime)
  const diff = (start - now) / 60000 // in minutes
  return diff <= 15 && diff >= -60
}

onMounted(() => {
  fetchClasses()
  fetchCredits()
})
</script>