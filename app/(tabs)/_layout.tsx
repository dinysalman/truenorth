import { Tabs } from 'expo-router';
import { Text } from 'react-native';

/**
 * Bottom tabs layout for main app navigation
 * Provides 4 main screens: Today's Bearing, Kanban, Weekly Planning, and Polaris Goals
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1E2A38' }, // Deep North Blue
        headerTintColor: '#F5F7FA', // Soft Mist
        tabBarActiveTintColor: '#D4A017', // Compass Gold
        tabBarInactiveTintColor: '#9CA3AF', // Gray
        tabBarStyle: { 
          backgroundColor: '#1E2A38',
          borderTopColor: '#374151',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📍</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="kanban"
        options={{
          title: "Kanban",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📋</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="weekly"
        options={{
          title: "Weekly",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📅</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="polaris"
        options={{
          title: "Polaris",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>⭐</Text>
          ),
        }}
      />
    </Tabs>
  );
}
