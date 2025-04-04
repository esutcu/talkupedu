<template>
    <div class="text-center py-20 px-4 max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-brand mb-4">{{ $t('landing.heroTitle') }}</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-6">{{ $t('landing.heroSubtitle') }}</p>
      <router-link
        to="/signup"
        class="bg-accent text-white px-6 py-3 rounded shadow hover:bg-[#e77f0f] transition"
      >
        {{ $t('landing.getStarted') }}
      </router-link>
    </div>
  </template>
  