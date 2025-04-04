<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-[#3871B1] mb-4">{{ $t('dashboard.teacher.title') }}</h2>

    <div v-if="classes.length" class="space-y-4">
      <div
        v-for="session in classes"
        :key="session.id"
        class="bg-white p-4 rounded shadow border flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ formatDateTime(session.start_time) }}</p>
          <p class="text-sm text-gray-600">{{ $t('dashboard.teacher.withStudent') }}: <strong>{{ session.student_name }}</strong></p>
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
            {{ $t('dashboard.teacher.notAvailableYet') }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 mt-8 text-center">{{ $t('dashboard.teacher.noClasses') }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const classes = ref([])

async function fetchClasses() {
  const { data: userData } = await supabase.auth.getUser()
  const teacherId = userData.user.id

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      student_id,
      start_time,
      meet_link,
      users:student_id(full_name)
    `)
    .eq('teacher_id', teacherId)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })

  if (!error) {
    classes.value = data.map((b) => ({
      id: b.id,
      student_name: b.users?.full_name ?? 'Unknown',
      start_time: b.start_time,
      meet_link: b.meet_link
    }))
  }
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

onMounted(fetchClasses)
</script>