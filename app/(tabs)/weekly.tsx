import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * Weekly Planning - Weekly review and heading selection
 * 
 * Purpose: Decide what matters this week
 * 
 * Features:
 * - Guided Weekly Review
 * - Selection of 1–3 Weekly Headings (focus areas)
 * - Pulling tasks from Monthly Missions and Horizon
 * - Light Eisenhower filtering (Important vs Urgent)
 * 
 * TODO: Implement Weekly Review checklist
 * TODO: Add Weekly Headings selection interface
 * TODO: Show tasks from Monthly Missions
 * TODO: Show tasks from Horizon for triage
 * TODO: Add Eisenhower matrix filter
 * TODO: Add "Plan This Week" button to populate This Week column
 */
export default function WeeklyPlanningScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Review</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Week of Feb 8 - Feb 14, 2026</Text>
            <Text style={styles.hint}>Review last week and plan ahead</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Headings</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Weekly Heading 1</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Weekly Heading 2</Text>
          </View>
          <Text style={styles.addButton}>+ Add Heading (max 3)</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks to Consider</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Task from Monthly Mission</Text>
            <Text style={styles.hint}>Important & Not Urgent</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Task from Horizon</Text>
            <Text style={styles.hint}>Urgent & Important</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Complete Weekly Planning</Text>
          </View>
        </View>
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
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#1E2A38',
    marginBottom: 4,
  },
  hint: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    fontSize: 14,
    color: '#D4A017',
    textAlign: 'center',
    paddingVertical: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A38',
  },
});
