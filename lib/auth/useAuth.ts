import { useState, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface UseAuthReturn {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Provides current Supabase auth session and loading state for navigation guards.
 * Subscribes to onAuthStateChange so redirects stay in sync with sign-in/sign-out.
 * Use in root index or layout to redirect unauthenticated users to login and
 * authenticated users to the main app.
 */
export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        if (!mounted) return;
        if (sessionError) {
          setError(sessionError.message);
          setSession(null);
        } else {
          setSession(initialSession ?? null);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) setSession(newSession ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    error,
  };
}
