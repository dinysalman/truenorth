import { Tabs } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { Compass, List, Zap, Target } from 'lucide-react-native';

/**
 * Bottom tabs layout for main app navigation.
 * Tabs: Heading (Today), Steps, Review & Plan, Polaris – 4 tabs with Lucide icons.
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
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarLabel: 'Heading',
          tabBarIcon: ({ color, focused }) => <Compass size={24} color={color} strokeWidth={focused ? 2.5 : 2} />,
        }}
      />
      <Tabs.Screen
        name="kanban"
        options={{
          title: 'Steps',
          tabBarLabel: 'Steps',
          tabBarIcon: ({ color, focused }) => <List size={24} color={color} strokeWidth={focused ? 2.5 : 2} />,
        }}
      />
      <Tabs.Screen
        name="weekly"
        options={{
          title: 'Review & Plan',
          tabBarLabel: 'Review & Plan',
          tabBarIcon: ({ color, focused }) => <Zap size={24} color={color} strokeWidth={focused ? 2.5 : 2} />,
        }}
      />
      <Tabs.Screen
        name="polaris"
        options={{
          title: 'Polaris',
          tabBarLabel: 'Polaris',
          tabBarIcon: ({ color, focused }) => <Target size={24} color={color} strokeWidth={focused ? 2.5 : 2} />,
        }}
      />
    </Tabs>
  );
}
