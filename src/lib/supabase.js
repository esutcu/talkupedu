import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co'
const supabaseAnonKey = 'YOUR-SUPABASE-ANON-KEY'

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )
  