<template>
    <section id="features" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <!-- Sol Menü -->
        <div class="space-y-4">
          <button
            v-for="(item, i) in features"
            :key="i"
            @click="active = i"
            class="block w-full text-left px-6 py-4 rounded-lg transition font-semibold text-lg"
            :class="active === i ? 'bg-[#3871B1] text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
          >
            {{ item.title }}
          </button>
        </div>
  
        <!-- Sağ İçerik -->
        <div class="relative min-h-[300px]">
          <transition name="fade-slide" mode="out-in" appear>
            <div :key="active" class="absolute top-0 left-0 w-full">
              <h4 class="text-2xl font-bold text-[#3871B1] mb-4">{{ features[active].title }}</h4>
              <p class="text-gray-600 text-base">{{ features[active].desc }}</p>
              <img
                :src="features[active].image"
                alt="Feature visual"
                class="mt-6 rounded-xl shadow-lg w-full max-w-md"
              />
            </div>
          </transition>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const active = ref(0)
  
  const features = [
    {
      title: '🧑‍🏫 Birebir Canlı Ders',
      desc: 'Gerçek eğitmenlerle birebir video görüşme üzerinden anında ders yapın. Doğal konuşma, gerçek senaryolar, özgüven kazandırır.',
      image: '/images/live-session.png'
    },
    {
      title: '⏰ Esnek Zaman Planlaması',
      desc: 'Öğretmenlerin ve sizin uygunluk takviminiz otomatik eşleşir. Öğrenci-öğretmen senkronizasyonu dakikalar içinde tamamlanır.',
      image: '/images/scheduling.png'
    },
    {
      title: '💬 Konuşma Odaklı Pratik',
      desc: 'Kalıplardan uzak, gerçek konuşmalarla öğrenme. Ders değil; diyalog, etkileşim, eğlence!',
      image: '/images/conversation.png'
    }
  ]
  </script>
  
  <style scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>