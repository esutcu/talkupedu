<template>
  <div class="bg-white text-gray-800 font-sans">
    <!-- Navbar -->
    <header class="border-b bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-[#3871B1]">TalkUp</h1>
        <nav class="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#features" class="hover:text-[#3871B1]">{{ $t('layout.features') }}</a>
          <a href="#pricing" class="hover:text-[#3871B1]">{{ $t('layout.pricing') }}</a>
          <a href="#testimonials" class="hover:text-[#3871B1]">{{ $t('layout.testimonials') }}</a>
        </nav>
        <div class="flex space-x-3">
          <button @click="showLogin = true" class="text-sm text-[#3871B1] font-medium">{{ $t('layout.login') }}</button>
          <button @click="showSignup = true" class="bg-[#FF8913] text-white text-sm px-4 py-2 rounded hover:bg-[#e77f0f]">{{ $t('layout.signup') }}</button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <HeroSection />

    <!-- Features -->
    <FeaturesSection />
    
    <!-- Pricing -->
    <PricingSection />

    <!-- Testimonials -->
    <TestimonialsCarousel />

    <!-- Steps -->
    <StepsSection />

    <!-- CTA -->
    <CallToActionSection />

    <!-- Modals -->
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <SignupModal v-if="showSignup" @close="showSignup = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import PricingSection from '@/components/PricingSection.vue'
import StepsSection from '@/components/StepsSection.vue'
import TestimonialsCarousel from '@/components/TestimonialsCarousel.vue'
import CallToActionSection from '@/components/CallToActionSection.vue'
import LoginModal from '@/components/LoginModal.vue'
import SignupModal from '@/components/SignupModal.vue'

const showLogin = ref(false)
const showSignup = ref(false)
</script>