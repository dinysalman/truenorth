import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

/**
 * Focus Mode - Full-screen timer for deep work
 * 
 * Purpose: Enable deep, interruption-friendly execution
 * 
 * Features:
 * - Full-screen minimal UI
 * - Task name
 * - Countdown timer (based on max time)
 * - Pause / Resume / Complete
 * - No notifications
 * 
 * Dynamic route parameter: id (step ID)
 * 
 * TODO: Fetch step details by ID
 * TODO: Implement countdown timer
 * TODO: Add pause/resume functionality
 * TODO: Add complete button
 * TODO: Track time spent on task
 * TODO: Disable notifications during focus
 * TODO: Add ambient background or breathing animation
 */
export default function FocusScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={() => router.back()}>
          ← Exit Focus
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.taskName}>Task: {id}</Text>
        <Text style={styles.subtitle}>Focus Mode</Text>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>25:00</Text>
          <Text style={styles.timerLabel}>Minutes remaining</Text>
        </View>
        
        <View style={styles.controls}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Pause</Text>
          </View>
          <View style={[styles.button, styles.completeButton]}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </View>
        </View>
        
        <Text style={styles.encouragement}>
          Stay present. One step at a time.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38', // Deep North Blue for minimal distraction
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    fontSize: 16,
    color: '#F5F7FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  taskName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F5F7FA',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 48,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  timer: {
    fontSize: 72,
    fontWeight: '300',
    color: '#D4A017', // Compass Gold
    marginBottom: 8,
  },
  timerLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#374151',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F5F7FA',
  },
  completeButton: {
    backgroundColor: '#2E7D32', // Evergreen
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  encouragement: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
