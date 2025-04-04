<template>
  <div class="bg-white text-gray-800 font-sans">
    <!-- Navbar -->
    <header class="border-b bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-[#3871B1]">TalkUp</h1>
        <nav class="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#features" class="hover:text-[#3871B1]">{{ $t('layout.features') }}</a>
          <a href="#courses" class="hover:text-[#3871B1]">{{ $t('landing.courses') }}</a>
          <a href="#pricing" class="hover:text-[#3871B1]">{{ $t('layout.pricing') }}</a>
          <a href="#faq" class="hover:text-[#3871B1]">{{ $t('layout.faq') }}</a>
        </nav>
        <div class="flex space-x-3">
          <button @click="showLogin = true" class="text-sm text-[#3871B1] font-medium">{{ $t('layout.login') }}</button>
          <button @click="showSignup = true" class="bg-[#FF8913] text-white text-sm px-4 py-2 rounded hover:bg-[#e77f0f]">{{ $t('layout.signup') }}</button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="bg-[#f5faff] py-20 text-center">
      <div class="max-w-3xl mx-auto px-4">
        <h2 class="text-4xl font-bold mb-4 text-[#3871B1]">{{ $t('landing.heroTitle') }}</h2>
        <p class="text-lg text-gray-600 mb-8">{{ $t('landing.heroSubtitle') }}</p>
        <button class="bg-[#3871B1] text-white px-6 py-3 rounded-lg hover:bg-[#305f93] transition">{{ $t('landing.getStarted') }}</button>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h3 class="text-3xl font-bold mb-12">{{ $t('landing.whyChoose') }}</h3>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div class="text-4xl mb-4">🧠</div>
            <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ $t('landing.aiTools') }}</h4>
            <p class="text-gray-600 text-sm">{{ $t('landing.aiToolsDesc') }}</p>
          </div>
          <div class="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div class="text-4xl mb-4">👨‍🏫</div>
            <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ $t('landing.liveTutors') }}</h4>
            <p class="text-gray-600 text-sm">{{ $t('landing.liveTutorsDesc') }}</p>
          </div>
          <div class="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div class="text-4xl mb-4">🌍</div>
            <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ $t('landing.multiLanguages') }}</h4>
            <p class="text-gray-600 text-sm">{{ $t('landing.multiLanguagesDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section id="courses" class="bg-[#fdfdfd] py-16">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h3 class="text-3xl font-bold mb-12">{{ $t('landing.popularCourses') }}</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg p-6 shadow hover:shadow-md transition text-left">
            <h5 class="text-lg font-bold text-[#3871B1] mb-2">{{ $t('landing.spanishCourse') }}</h5>
            <p class="text-sm text-gray-500 mb-4">{{ $t('landing.duration') }}: 4 {{ $t('landing.weeks') }}</p>
            <button class="text-sm text-white bg-[#FF8913] px-4 py-2 rounded hover:bg-[#e77f0f] transition">
              {{ $t('landing.viewCourse') }}
            </button>
          </div>
          <div class="bg-white rounded-lg p-6 shadow hover:shadow-md transition text-left">
            <h5 class="text-lg font-bold text-[#3871B1] mb-2">{{ $t('landing.englishCourse') }}</h5>
            <p class="text-sm text-gray-500 mb-4">{{ $t('landing.duration') }}: 6 {{ $t('landing.weeks') }}</p>
            <button class="text-sm text-white bg-[#FF8913] px-4 py-2 rounded hover:bg-[#e77f0f] transition">
              {{ $t('landing.viewCourse') }}
            </button>
          </div>
          <div class="bg-white rounded-lg p-6 shadow hover:shadow-md transition text-left">
            <h5 class="text-lg font-bold text-[#3871B1] mb-2">{{ $t('landing.japaneseCourse') }}</h5>
            <p class="text-sm text-gray-500 mb-4">{{ $t('landing.duration') }}: 8 {{ $t('landing.weeks') }}</p>
            <button class="text-sm text-white bg-[#FF8913] px-4 py-2 rounded hover:bg-[#e77f0f] transition">
              {{ $t('landing.viewCourse') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="bg-white py-20 text-center">
      <h3 class="text-3xl font-bold mb-12">{{ $t('landing.pricing') }}</h3>
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div class="rounded-lg p-6 shadow transition bg-[#fdfdfd]">
          <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ $t('landing.starter') }}</h4>
          <p class="text-2xl font-bold text-gray-800 mb-2">$0</p>
          <p class="text-sm text-gray-500 mb-4">{{ $t('landing.starterDesc') }}</p>
          <ul class="text-sm text-gray-600 mb-6 space-y-2">
            <li>✔ {{ $t('landing.basicLessons') }}</li>
            <li>✔ {{ $t('landing.limitedTools') }}</li>
            <li>✔ {{ $t('landing.communityAccess') }}</li>
          </ul>
          <button class="w-full bg-[#FF8913] text-white py-2 rounded hover:bg-[#e77f0f] transition">
            {{ $t('landing.startFree') }}
          </button>
        </div>
        
        <div class="rounded-lg p-6 shadow transition border-2 border-[#3871B1] bg-white">
          <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ $t('landing.pro') }}</h4>
          <p class="text-2xl font-bold text-gray-800 mb-2">$29/{{ $t('landing.month') }}</p>
          <p class="text-sm text-gray-500 mb-4">{{ $t('landing.proDesc') }}</p>
          <ul class="text-sm text-gray-600 mb-6 space-y-2">
            <li>✔ {{ $t('landing.allLanguages') }}</li>
            <li>✔ {{ $t('landing.tutorAccess') }}</li>
            <li>✔ {{ $t('landing.fullTools') }}</li>
          </ul>
          <button class="w-full bg-[#FF8913] text-white py-2 rounded hover:bg-[#e77f0f] transition">
            {{ $t('landing.subscribe') }}
          </button>
        </div>
        
        <div class="rounded-lg p-6 shadow transition bg-[#fdfdfd]">
          <h4 class="text-xl font-semibold text-[#3871B1] mb-2">{{ $t('landing.enterprise') }}</h4>
          <p class="text-2xl font-bold text-gray-800 mb-2">{{ $t('landing.custom') }}</p>
          <p class="text-sm text-gray-500 mb-4">{{ $t('landing.enterpriseDesc') }}</p>
          <ul class="text-sm text-gray-600 mb-6 space-y-2">
            <li>✔ {{ $t('landing.groupTraining') }}</li>
            <li>✔ {{ $t('landing.dedicatedSupport') }}</li>
            <li>✔ {{ $t('landing.customCurriculum') }}</li>
          </ul>
          <button class="w-full bg-[#FF8913] text-white py-2 rounded hover:bg-[#e77f0f] transition">
            {{ $t('landing.contactSales') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <SignupModal v-if="showSignup" @close="showSignup = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginModal from '@/components/LoginModal.vue'
import SignupModal from '@/components/SignupModal.vue'

// Modals
const showLogin = ref(false)
const showSignup = ref(false)

// İleride oluşturulacak bileşenler
// import LoginModal from '@/components/LoginModal.vue'
// import SignupModal from '@/components/SignupModal.vue'

// Bu satır development aşamasında hata vermemesi için komponenti global olarak tanımlıyor
// Gerçek implementasyonda komponenti import etmek lazım
const LoginModal = { template: '<div></div>', props: ['close'] }
const SignupModal = { template: '<div></div>', props: ['close'] }
</script>