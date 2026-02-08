import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Settings screen
 * 
 * TODO: Add user profile section
 * TODO: Add notification preferences
 * TODO: Add theme selection (light/dark)
 * TODO: Add data export/import
 * TODO: Add account management (logout, delete account)
 * TODO: Add app version and about section
 * TODO: Add link to help/documentation
 */
export default function SettingsScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Profile</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Email & Password</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Logout</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Theme</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Default Focus Duration</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Export Data</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Import Data</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Clear Cache</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Version 1.0.0</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Help & Documentation</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Policy</Text>
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
  settingItem: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#1E2A38',
  },
});
