import { Redirect } from 'expo-router';

/**
 * Entry point for TrueNorth app
 * Redirects users to appropriate screen based on authentication state
 * 
 * TODO: Implement actual auth state check when auth system is built
 */
export default function Index() {
  // TODO: Check auth state (will implement in TASK-XXX for authentication)
  const isAuthenticated = true; // Hardcoded for development
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/(auth)/login" />;
}
