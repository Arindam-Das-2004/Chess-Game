
import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log the URL (but not the key) for debugging
console.log('Supabase URL:', supabaseUrl)

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env file.')
}

// Create the Supabase client with proper configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'chess-auth-token',
    flowType: 'pkce' // Use PKCE flow for better security
  }
})

// Test the connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event)
})

// Export the client
export default supabase