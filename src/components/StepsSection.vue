<template>
    <section id="steps" class="bg-white dark:bg-gray-900 py-20">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-[#3871B1] dark:text-white mb-12">
          {{ $t('landing.howItWorks') }}
        </h2>
  
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          <li
            v-for="(step, i) in steps"
            :key="i"
            class="mb-10 ml-6 animate-fade-in-up"
            :style="{ animationDelay: `${i * 150}ms` }"
          >
            <span class="absolute flex items-center justify-center w-10 h-10 bg-[#3871B1] rounded-full -left-5 ring-8 ring-white dark:ring-gray-900 text-white text-lg">
              {{ step.icon }}
            </span>
            <h3 class="font-semibold text-gray-900 dark:text-white text-lg mb-1">
              {{ step.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ step.desc }}</p>
          </li>
        </ol>
      </div>
    </section>
  </template>
  
  <script setup>
  const steps = [
    {
      icon: '📝',
      title: 'Kredi Paketi Seç',
      desc: 'İhtiyacına uygun kredi paketini seç ve hemen başla.'
    },
    {
      icon: '👩‍🏫',
      title: 'Öğretmenini Seç',
      desc: 'Müsait öğretmenler arasından sana en uygun olanı seç.'
    },
    {
      icon: '📅',
      title: 'Randevu Al',
      desc: 'Öğretmenin müsait olduğu zamanlardan sana uygun olanı seç.'
    },
    {
      icon: '⏰',
      title: 'Derse Hazırlan',
      desc: 'Ders saatinden 15 dakika önce katıl butonu aktif olur.'
    },
    {
      icon: '💬',
      title: 'Konuşmaya Başla',
      desc: 'Birebir görüntülü görüşme ile pratik yapmaya başla.'
    }
  ]
  </script>
  
  <style scoped>
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out both;
  }
  </style>