<template>
    <section class="relative py-20 bg-[#3871B1] overflow-hidden">
      <!-- Parallax Glow Balls -->
      <div class="absolute -top-20 -left-20 w-[300px] h-[300px] bg-white/10 blur-3xl rounded-full animate-ping z-0"></div>
      <div class="absolute bottom-0 right-0 w-[200px] h-[200px] bg-white/20 blur-2xl rounded-full z-0"></div>
  
      <div class="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          Konuşarak Öğrenmeye Hazır mısın?
        </h2>
        <p class="text-white/90 mb-8 text-lg">
          Kendine en uygun öğretmeni seç, birebir canlı derse katıl ve akıcı konuşmaya başla!
        </p>
  
        <div
          ref="magnetWrapper"
          class="inline-block relative group"
          @mousemove="handleMouse"
          @mouseleave="resetMouse"
        >
          <button
            ref="magnetButton"
            class="bg-white text-[#3871B1] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Kredi Paketi Seç
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const magnetWrapper = ref(null)
  const magnetButton = ref(null)
  
  function handleMouse(e) {
    const wrapper = magnetWrapper.value
    const button = magnetButton.value
  
    const rect = wrapper.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
  
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }
  
  function resetMouse() {
    const button = magnetButton.value
    button.style.transform = 'translate(0px, 0px)'
  }
  </script>