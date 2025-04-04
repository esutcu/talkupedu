import { createClient } from '@supabase/supabase-js'

// Geçici dummy URL ve key - sadece geliştirme/görüntüleme için
const supabaseUrl = 'https://example.supabase.co' 
const supabaseAnonKey = 'dummy-key'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)