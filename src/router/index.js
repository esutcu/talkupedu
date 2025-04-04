import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

import LandingPage from '@/pages/LandingPage.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import StudentDashboard from '@/pages/Student/Dashboard.vue'
import BookTeacher from '@/pages/Student/BookTeacher.vue'
import BookByTime from '@/pages/Student/BookByTime.vue'
import BuyCredits from '@/pages/Student/BuyCredits.vue'
import Referral from '@/pages/Student/Referral.vue'
import TeacherDashboard from '@/pages/Teacher/Dashboard.vue'
import TeacherAvailability from '@/pages/Teacher/Availability.vue'
import LegalPage from '@/pages/LegalPage.vue'
import PaymentSuccess from '@/pages/PaymentSuccess.vue'
import Analytics from '@/pages/Admin/Analytics.vue'
import AdminDashboard from '@/pages/Admin/Dashboard.vue'
import Packages from '@/pages/Admin/Packages.vue'
import ReferralProgram from '@/pages/Admin/ReferralProgram.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/legal', component: LegalPage },
  { path: '/payment-success', component: PaymentSuccess },

  // Öğrenci Rotaları
  {
    path: '/student/dashboard',
    component: StudentDashboard,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/student/book-teacher',
    component: BookTeacher,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/student/book-by-time',
    component: BookByTime,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/student/buy-credits',
    component: BuyCredits,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/student/referral',
    component: Referral,
    meta: { requiresAuth: true, role: 'student' }
  },

  // Öğretmen Rotaları
  {
    path: '/teacher/dashboard',
    component: TeacherDashboard,
    meta: { requiresAuth: true, role: 'teacher' }
  },
  {
    path: '/teacher/availability',
    component: TeacherAvailability,
    meta: { requiresAuth: true, role: 'teacher' }
  },

  // Admin Rotaları
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/packages',
    component: Packages,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/referral',
    component: ReferralProgram,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/analytics',
    component: Analytics,
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Auth koruyucusu
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }

  if (to.meta.role && user?.user_metadata?.role !== to.meta.role) {
    return next('/')
  }

  next()
})

export default router