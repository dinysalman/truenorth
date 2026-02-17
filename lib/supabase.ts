/**
 * Supabase client for TrueNorth.
 * Use for auth, database, and realtime. Reads URL and publishable key from env.
 */
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** Singleton Supabase client; safe for client-side (auth + RLS). */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
