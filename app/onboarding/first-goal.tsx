import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * First goal setup screen - Create initial Polaris Goal
 * 
 * TODO: Add input field for goal title
 * TODO: Add North Star selector
 * TODO: Add quarter selector
 * TODO: Add "Complete Onboarding" button
 * TODO: Save first goal to database
 * TODO: Navigate to main app (tabs) after completion
 */
export default function FirstGoalScreen() {
  const router = useRouter();
  
  const handleComplete = () => {
    // TODO: Save onboarding state
    // TODO: Navigate to main app
    router.replace('/(tabs)');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Set Your First Polaris Goal</Text>
        <Text style={styles.subtitle}>
          What do you want to achieve this quarter?
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Goal Title</Text>
          <View style={styles.input}>
            <Text style={styles.placeholder}>e.g., Ship MVP of my product</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>North Star</Text>
          <View style={styles.input}>
            <Text style={styles.placeholder}>Select a life area</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Quarter</Text>
          <View style={styles.input}>
            <Text style={styles.placeholder}>Q1 2026</Text>
          </View>
        </View>
        
        <View style={styles.hint}>
          <Text style={styles.hintText}>
            Your Polaris Goal is your quarterly direction.
            Don't worry - you can always adjust it as you learn what works.
          </Text>
        </View>
        
        <View style={styles.button} onTouchEnd={handleComplete}>
          <Text style={styles.buttonText}>Complete Setup</Text>
        </View>
        
        <Text style={styles.skipText} onPress={handleComplete}>
          Skip for now
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E2A38',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: 8,
  },
  input: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  placeholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  hint: {
    padding: 16,
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    marginBottom: 24,
  },
  hintText: {
    fontSize: 14,
    color: '#1E2A38',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A38',
  },
  skipText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
