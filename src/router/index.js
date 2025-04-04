import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

import LandingPage from '@/pages/LandingPage.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import StudentDashboard from '@/pages/Student/Dashboard.vue'
import TeacherDashboard from '@/pages/Teacher/Dashboard.vue'
import LegalPage from '@/pages/LegalPage.vue'
import AdminDashboard from '@/pages/Admin/Dashboard.vue'
import Packages from '@/pages/Admin/Packages.vue'
import ReferralProgram from '@/pages/Admin/ReferralProgram.vue'
import Analytics from '@/pages/Admin/Analytics.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/legal', component: LegalPage },

  {
    path: '/student/dashboard',
    component: StudentDashboard,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/teacher/dashboard',
    component: TeacherDashboard,
    meta: { requiresAuth: true, role: 'teacher' }
  },
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

// 🔐 Auth guard
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
