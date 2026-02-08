import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

/**
 * North Stars setup screen - Define life areas
 * 
 * TODO: Add input field for custom life areas
 * TODO: Show common examples (Work, Family, Health, Learning, etc.)
 * TODO: Allow selection of 3-5 North Stars
 * TODO: Add "Next" button to navigate to first-goal
 * TODO: Save North Stars to database
 */
export default function NorthStarsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Define Your North Stars</Text>
        <Text style={styles.subtitle}>
          What are the main areas of your life?
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Life Areas</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Work & Career</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Health & Wellness</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Family & Relationships</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Learning & Growth</Text>
          </View>
          <Text style={styles.addButton}>+ Add Custom North Star</Text>
        </View>
        
        <View style={styles.hint}>
          <Text style={styles.hintText}>
            Select 3-5 life areas that matter most to you.
            These will help you align your daily tasks with your bigger picture.
          </Text>
        </View>
        
        <Link href="/onboarding/first-goal" asChild>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
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
  },
  addButton: {
    fontSize: 14,
    color: '#D4A017',
    textAlign: 'center',
    paddingVertical: 12,
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A38',
  },
});
