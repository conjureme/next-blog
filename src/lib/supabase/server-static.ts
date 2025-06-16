import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// this client is used for any public data fetching
// doesn't use cookies and only can access public data
export function createServerSupabaseClientStatic() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
