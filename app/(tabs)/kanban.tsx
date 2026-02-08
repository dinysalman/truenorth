import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * Personal Kanban - Task management board
 * 
 * Columns:
 * - Horizon (Inbox / GTD capture)
 * - This Week
 * - Today (prepared the night before)
 * - Done
 * 
 * Each Step includes:
 * - Title
 * - Priority (1 / 2 / 3)
 * - Max time (Parkinson's Law)
 * - Linked North Star / Goal
 * - Tag (Work, Family, Health, Learning, YouTube)
 * 
 * Rules:
 * - Max 1 Priority-1 per day
 * - Soft limits on Today and This Week
 * - Drag & drop between columns
 * 
 * TODO: Implement horizontal scrolling for columns
 * TODO: Fetch steps from database grouped by status
 * TODO: Add drag & drop functionality
 * TODO: Add step creation button
 * TODO: Implement step detail modal
 * TODO: Add filters by tag
 */
export default function KanbanScreen() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.columnsContainer}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Horizon</Text>
          <View style={styles.columnContent}>
            <View style={styles.stepCard}>
              <Text style={styles.stepText}>Inbox Task 1</Text>
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepText}>Inbox Task 2</Text>
            </View>
            <Text style={styles.addButton}>+ Add Step</Text>
          </View>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.columnTitle}>This Week</Text>
          <View style={styles.columnContent}>
            <View style={styles.stepCard}>
              <Text style={styles.stepText}>Weekly Task 1</Text>
            </View>
            <Text style={styles.addButton}>+ Add Step</Text>
          </View>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Today</Text>
          <View style={styles.columnContent}>
            <View style={styles.stepCard}>
              <Text style={styles.stepText}>Today Task 1</Text>
            </View>
            <Text style={styles.addButton}>+ Add Step</Text>
          </View>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Done</Text>
          <View style={styles.columnContent}>
            <View style={[styles.stepCard, styles.doneCard]}>
              <Text style={styles.stepText}>Completed Task</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  columnsContainer: {
    padding: 16,
  },
  column: {
    width: 280,
    marginRight: 16,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  columnContent: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    minHeight: 200,
  },
  stepCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
  },
  doneCard: {
    opacity: 0.6,
  },
  stepText: {
    fontSize: 14,
    color: '#1E2A38',
  },
  addButton: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
