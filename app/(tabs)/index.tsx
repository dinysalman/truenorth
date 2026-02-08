import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

/**
 * Today's Bearing - Home screen showing today's direction
 * 
 * Displays:
 * - Today's date
 * - True Step (Priority 1 task)
 * - Priority 2 and 3 tasks for today
 * - Entry point to Focus Mode
 * 
 * Design Philosophy:
 * - Show only tasks planned the night before
 * - No task creation or prioritization in the morning
 * - Calm, encouraging microcopy
 * 
 * TODO: Fetch today's tasks from database
 * TODO: Display True Step prominently
 * TODO: Show remaining tasks for today
 * TODO: Add Focus Mode button for each task
 * TODO: Add calm, encouraging messages
 */
export default function TodaysBearingScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.date}>Sunday, Feb 8, 2026</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your True Step Today</Text>
          <View style={styles.trueStepCard}>
            <Text style={styles.trueStepText}>Priority 1 Task Placeholder</Text>
            <Text style={styles.hint}>Your most important task appears here</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Other Steps</Text>
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>Priority 2 Task Placeholder</Text>
          </View>
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>Priority 3 Task Placeholder</Text>
          </View>
        </View>
        
        <Text style={styles.encouragement}>
          One meaningful win at a time.
        </Text>
        
        <Link href="/settings" style={styles.settingsLink}>
          <Text style={styles.settingsText}>Settings</Text>
        </Link>
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
  date: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  trueStepCard: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#D4A017', // Compass Gold
  },
  trueStepText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: 8,
  },
  taskCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#1E2A38',
  },
  hint: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  encouragement: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 24,
  },
  settingsLink: {
    marginTop: 32,
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    color: '#D4A017',
    textDecorationLine: 'underline',
  },
});
