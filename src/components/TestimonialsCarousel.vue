<template>
    <section class="bg-[#f5faff] dark:bg-gray-800 py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-[#3871B1] dark:text-white mb-12">
          {{ $t('landing.testimonialsTitle') }}
        </h2>
  
        <div id="testimonial-carousel" class="relative w-full" data-carousel="slide">
          <div class="relative h-[200px] overflow-hidden rounded-lg">
            <div
              v-for="(testimonial, i) in testimonials"
              :key="i"
              class="hidden duration-700 ease-in-out"
              :class="{ 'block': current === i }"
            >
              <div class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow max-w-xl mx-auto">
                <p class="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{{ testimonial.quote }}"
                </p>
                <p class="font-semibold text-[#3871B1] dark:text-white">— {{ testimonial.author }}</p>
              </div>
            </div>
          </div>
  
          <div class="flex justify-center mt-6 space-x-2">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              class="w-3 h-3 rounded-full"
              :class="current === i ? 'bg-[#3871B1]' : 'bg-gray-300 dark:bg-gray-500'"
              @click="current = i"
            ></button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const current = ref(0)
  
  const testimonials = [
    {
      quote: 'TalkUp ile ilk dersimden itibaren daha özgüvenli konuşmaya başladım. Öğretmenlerle birebir pratik yapmak gerçekten çok faydalı.',
      author: 'Zeynep K.'
    },
    {
      quote: 'Kredi sistemi çok pratik. İstediğim zaman ders alabiliyorum ve öğretmenlerle konuşma pratiği yapabiliyorum.',
      author: 'Mehmet D.'
    },
    {
      quote: 'Esnek zaman seçenekleri harika. İş çıkışı ya da öğle arasında bile ders yapabiliyorum.',
      author: 'Elif A.'
    }
  ]
  
  onMounted(() => {
    setInterval(() => {
      current.value = (current.value + 1) % testimonials.length
    }, 6000)
  })
  </script>