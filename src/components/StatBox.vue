<template>
    <div class="bg-white dark:bg-gray-800 border rounded shadow p-4 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ label }}</p>
      <p class="text-xl font-bold mt-1">{{ value }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({ label: String, value: [String, Number] })
  </script>
  