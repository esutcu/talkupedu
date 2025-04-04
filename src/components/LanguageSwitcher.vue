<template>
  <select v-model="locale" class="text-sm border rounded p-1 bg-white dark:bg-gray-800">
    <option value="tr">🇹🇷 Türkçe</option>
    <option value="en">🇺🇸 English</option>
    <option value="ru">🇷🇺 Русский</option>
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>