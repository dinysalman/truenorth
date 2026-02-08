import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

/**
 * Signup screen for new user registration
 * 
 * TODO: Implement signup functionality with Supabase Auth
 * TODO: Add email/password input fields with validation
 * TODO: Add password confirmation field
 * TODO: Add signup button with loading state
 * TODO: Handle errors and display feedback
 */
export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join TrueNorth</Text>
      <Text style={styles.subtitle}>Create your account</Text>
      
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Signup Form Placeholder</Text>
        <Text style={styles.hint}>Email, password, and confirm password inputs</Text>
      </View>
      
      <Link href="/(auth)/login" style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E2A38',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 32,
  },
  placeholder: {
    width: '100%',
    padding: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    fontSize: 16,
    color: '#D4A017',
    textDecorationLine: 'underline',
  },
});
