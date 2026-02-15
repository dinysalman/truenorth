import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTheme } from '@/lib/theme';

/**
 * Bottom tabs layout for main app navigation
 * Provides 4 main screens: Today's Bearing, Kanban, Weekly Planning, and Polaris Goals
 */
export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.softMist,
        tabBarActiveTintColor: colors.compassGold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopColor: colors.tabBarBorder,
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
