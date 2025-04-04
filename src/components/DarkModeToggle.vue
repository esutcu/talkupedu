<template>
    <button @click="toggle" class="text-gray-600 dark:text-gray-300 hover:text-accent">
      <span v-if="dark">🌙</span>
      <span v-else>☀️</span>
    </button>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const dark = ref(localStorage.getItem('theme') === 'dark')
  
  watch(dark, (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  })
  
  function toggle() {
    dark.value = !dark.value
  }
  </script>
  