import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

/**
 * Password recovery screen
 * 
 * TODO: Implement password reset with Supabase Auth
 * TODO: Add email input field
 * TODO: Add send reset link button
 * TODO: Show success message after sending reset email
 * TODO: Handle errors and display feedback
 */
export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
      
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Password Reset Form Placeholder</Text>
        <Text style={styles.hint}>Email input and send button will go here</Text>
      </View>
      
      <Link href="/(auth)/login" style={styles.link}>
        <Text style={styles.linkText}>Back to login</Text>
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
    textAlign: 'center',
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
    textAlign: 'center',
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
