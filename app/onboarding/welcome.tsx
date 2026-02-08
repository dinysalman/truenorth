import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

/**
 * Welcome screen - First step of onboarding
 * 
 * TODO: Add TrueNorth logo
 * TODO: Add welcome animation
 * TODO: Explain core philosophy (direction before speed)
 * TODO: Add "Get Started" button to navigate to north-stars
 */
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🧭</Text>
        <Text style={styles.title}>Welcome to TrueNorth</Text>
        <Text style={styles.subtitle}>
          A direction-first productivity system
        </Text>
        
        <View style={styles.philosophy}>
          <Text style={styles.philosophyText}>
            • Direction before speed
          </Text>
          <Text style={styles.philosophyText}>
            • One meaningful win per day
          </Text>
          <Text style={styles.philosophyText}>
            • Plan in the evening, execute in the morning
          </Text>
        </View>
        
        <Link href="/onboarding/north-stars" asChild>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E2A38',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  philosophy: {
    marginBottom: 48,
  },
  philosophyText: {
    fontSize: 16,
    color: '#1E2A38',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D4A017',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A38',
  },
});
