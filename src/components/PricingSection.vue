<template>
    <section id="pricing" class="bg-[#f5faff] dark:bg-gray-900 py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-[#3871B1] dark:text-white mb-12">{{ $t('landing.pricingTitle') }}</h2>
  
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(plan, i) in plans"
            :key="i"
            class="group relative [perspective:1000px]"
          >
            <div class="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <!-- Ön Yüz -->
              <div class="absolute w-full h-full backface-hidden bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
                <div v-if="plan.popular" class="absolute -top-4 right-4 bg-[#FF8913] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  En Popüler
                </div>
                <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ plan.title }}</h4>
                <p class="text-2xl font-bold text-gray-800 mb-4">{{ plan.price }}</p>
                <p class="text-sm text-gray-600 mb-6">{{ plan.desc }}</p>
                <ul class="text-sm text-gray-600 space-y-2 mb-6 text-left">
                  <li v-for="(credit, index) in plan.credits" :key="index">✔ {{ credit }}</li>
                </ul>
                <button class="w-full bg-[#FF8913] text-white py-2 rounded hover:bg-[#e77f0f] transition">
                  {{ plan.button }}
                </button>
              </div>
              
              <!-- Arka Yüz -->
              <div class="absolute w-full h-full backface-hidden bg-[#3871B1] text-white rounded-xl p-6 [transform:rotateY(180deg)]">
                <h4 class="text-xl font-bold mb-4">{{ plan.title }}</h4>
                <p class="mb-4 text-sm">{{ plan.extraDesc }}</p>
                <ul class="text-sm space-y-2 mb-6 text-left">
                  <li v-for="(feature, idx) in plan.extraFeatures" :key="idx">✔ {{ feature }}</li>
                </ul>
                <button class="w-full bg-[#FF8913] text-white py-2 rounded hover:bg-[#e77f0f] transition">
                  {{ plan.button }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const plans = [
    {
      title: '20 Kredi',
      price: '₺299',
      desc: 'Başlangıç için ideal paket',
      credits: [
        '20 Kredilik Görüşme Hakkı',
        'Tüm Öğretmenlere Erişim',
        '30 Gün Geçerlilik'
      ],
      extraDesc: 'Başlangıç paketinin avantajları:',
      extraFeatures: [
        'Kredi başına 15dk görüşme',
        'İstediğin öğretmeni seç',
        'Esnek planlama'
      ],
      button: 'Paketi Seç',
      popular: false
    },
    {
      title: '50 Kredi',
      price: '₺599',
      desc: 'En çok tercih edilen paket',
      credits: [
        '50 Kredilik Görüşme Hakkı',
        'Öncelikli Öğretmen Seçimi',
        '60 Gün Geçerlilik'
      ],
      extraDesc: 'Pro paketin ekstra özellikleri:',
      extraFeatures: [
        'Kredi başına 20dk görüşme',
        'Özel ders programı',
        'WhatsApp destek'
      ],
      button: 'Hemen Başla',
      popular: true
    },
    {
      title: '100 Kredi',
      price: '₺999',
      desc: 'Yoğun pratik için en uygun',
      credits: [
        '100 Kredilik Görüşme Hakkı',
        'VIP Öğretmen Erişimi',
        '90 Gün Geçerlilik'
      ],
      extraDesc: 'Premium paketin ayrıcalıkları:',
      extraFeatures: [
        'Kredi başına 25dk görüşme',
        '7/24 öncelikli destek',
        'Özel ders materyalleri'
      ],
      button: 'Şimdi Satın Al',
      popular: false
    }
  ]
  </script>
  
  <style scoped>
  .backface-hidden {
    backface-visibility: hidden;
  }
  </style>