<template>
  <button @click="toggle" class="text-gray-600 dark:text-gray-300 hover:text-[#FF8913]">
    <svg v-if="dark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v1m0 16v1m8.66-9H20m-16 0H3m15.364 6.364l-.707-.707M4.343 4.343l-.707.707m12.728 0l-.707-.707m-10.607 10.607l-.707-.707M12 5a7 7 0 000 14a7 7 0 000-14z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M17.293 17.293A8 8 0 116.707 6.707a8.001 8.001 0 0110.586 10.586z" />
    </svg>
  </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const dark = ref(localStorage.getItem('theme') === 'dark')

function toggle() {
  dark.value = !dark.value
}

watch(dark, (val) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('theme', val ? 'dark' : 'light')
})

onMounted(() => {
  // Sayfa yüklendiğinde localStorage'dan tema tercihini alır
  const isDark = localStorage.getItem('theme') === 'dark'
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
})
</script>