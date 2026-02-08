import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * Polaris - Goals & Missions hierarchy
 * 
 * Purpose: Maintain direction and alignment
 * 
 * Features:
 * - Life Areas (North Stars)
 * - Quarterly Polaris Goals
 * - Monthly Missions
 * - Visual hierarchy and drill-down
 * - Clear linkage from daily steps upward
 * 
 * Hierarchy:
 * North Star (Life Area)
 * → Polaris Goal (Quarterly Direction)
 * → Monthly Mission (Theme)
 * → Weekly Heading (Focus)
 * → Daily Steps (Tasks)
 * 
 * TODO: Fetch North Stars and Goals from database
 * TODO: Implement drill-down navigation
 * TODO: Add goal creation flow
 * TODO: Add progress visualization
 * TODO: Show linked steps for each goal
 */
export default function PolarisScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>North Stars (Life Areas)</Text>
          <View style={styles.northStarCard}>
            <Text style={styles.northStarText}>Work & Career</Text>
            <Text style={styles.goalCount}>2 active goals</Text>
          </View>
          <View style={styles.northStarCard}>
            <Text style={styles.northStarText}>Health & Wellness</Text>
            <Text style={styles.goalCount}>1 active goal</Text>
          </View>
          <View style={styles.northStarCard}>
            <Text style={styles.northStarText}>Family & Relationships</Text>
            <Text style={styles.goalCount}>1 active goal</Text>
          </View>
          <Text style={styles.addButton}>+ Add North Star</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quarterly Polaris Goals</Text>
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>Q1 2026 Goal: Ship MVP</Text>
            <Text style={styles.goalNorthStar}>Work & Career</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
            <Text style={styles.progressText}>40% complete</Text>
          </View>
          <Text style={styles.addButton}>+ Add Polaris Goal</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Missions</Text>
          <View style={styles.missionCard}>
            <Text style={styles.missionTitle}>February: Core Features</Text>
            <Text style={styles.missionGoal}>→ Ship MVP</Text>
          </View>
          <Text style={styles.addButton}>+ Add Monthly Mission</Text>
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
  northStarCard: {
    padding: 16,
    backgroundColor: '#1E2A38',
    borderRadius: 12,
    marginBottom: 12,
  },
  northStarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F7FA',
    marginBottom: 4,
  },
  goalCount: {
    fontSize: 14,
    color: '#D4A017',
  },
  goalCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D4A017',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: 4,
  },
  goalNorthStar: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  missionCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A38',
    marginBottom: 4,
  },
  missionGoal: {
    fontSize: 14,
    color: '#6B7280',
  },
  addButton: {
    fontSize: 14,
    color: '#D4A017',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
