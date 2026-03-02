import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/lib/theme';
import { Brain, CalendarRange, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react-native';

/**
 * Review & Plan Hub – entry to Weekly Review, Weekly Planning, Plan Tomorrow.
 * Tab is renamed to "Review & Plan" (see docs/ui-product-notes.md).
 *
 * Structure: Weekly Review (past week), Weekly Planning (next week), Plan Tomorrow (evening).
 * Weekly Planning on phone: two lists (Horizon + Upcoming week), not kanban.
 */
export default function WeeklyHubScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const sections = [
    {
      id: 'review',
      title: 'Weekly Review',
      description: 'Contemplate your progress, wins, and failures.',
      path: '/weekly/review' as const,
      icon: Brain,
    },
    {
      id: 'planning',
      title: 'Weekly Planning',
      description: 'Set your heading. Two lists: Horizon and Upcoming week (no kanban on phone).',
      path: '/weekly/planning' as const,
      icon: CalendarRange,
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <ScrollView className="flex-1 px-6 pt-6 pb-20">
        {/* Header */}
        <View className="mb-10">
          <Text style={{ color: colors.textPrimary }} className="text-3xl font-heading font-bold tracking-tight mb-2">
            Review & Plan
          </Text>
          <Text style={{ color: colors.textSecondary }} className="text-sm font-medium leading-relaxed max-w-[280px]">
            Weekly review (past week), weekly planning (next week), plan tomorrow (each evening).
          </Text>
        </View>

        {/* Progress Card (design: primary bg, secondary accent blob) */}
        <View
          className="p-6 rounded-3xl shadow-xl mb-10 relative overflow-hidden"
          style={{ backgroundColor: colors.deepNorthBlue }}
        >
          <View className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: colors.compassGold }} />
          <View className="flex flex-row justify-between items-start mb-6">
            <View className="flex-row items-center gap-2">
              <Sparkles size={16} style={{ color: colors.compassGold }} />
              <Text style={{ color: colors.compassGold }} className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                Alignment Status
              </Text>
            </View>
            <CheckCircle2 size={24} style={{ color: colors.softMist, opacity: 0.2 }} />
          </View>
          <Text style={{ color: colors.softMist }} className="text-xl font-heading font-bold mb-2 leading-tight">
            Prepare your week.
          </Text>
          <Text style={{ color: colors.softMist, opacity: 0.6 }} className="text-xs font-medium mb-6 leading-relaxed">
            The best weeks are built on intentional reflection and planning.
          </Text>
          <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <View className="h-full rounded-full w-0" style={{ backgroundColor: colors.compassGold }} />
          </View>
        </View>

        {/* Action List */}
        <View className="gap-4">
          {sections.map((section) => (
            <Pressable
              key={section.id}
              onPress={() => router.push(section.path)}
              className="flex-row items-center gap-4 p-5 rounded-3xl border shadow-sm active:opacity-90"
              style={{ backgroundColor: colors.surface, borderColor: colors.textMuted + '40' }}
              accessibilityRole="button"
              accessibilityLabel={`Open ${section.title}`}
            >
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center"
                style={{ backgroundColor: colors.compassGold + '20' }}
              >
                <section.icon size={24} style={{ color: colors.compassGold }} />
              </View>
              <View className="flex-1 min-w-0">
                <Text style={{ color: colors.textPrimary }} className="text-base font-heading font-bold mb-1">
                  {section.title}
                </Text>
                <Text style={{ color: colors.textSecondary }} className="text-xs leading-snug">
                  {section.description}
                </Text>
              </View>
              <View className="p-2 rounded-full" style={{ backgroundColor: colors.textMuted + '30' }}>
                <ChevronRight size={16} style={{ color: colors.textPrimary }} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Motivation Note */}
        <View className="mt-10 pt-10 items-center opacity-40">
          <Text style={{ color: colors.textMuted }} className="text-[10px] font-bold uppercase tracking-widest italic">
            "Slow is smooth, smooth is fast."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
