# TrueNorth — Architecture Overview

> **Last Updated:** 2026-02-19  
> **Audience:** Full-stack web developers who want to understand how this mobile app works

---

## Table of Contents

1. [What Is TrueNorth?](#1-what-is-truenorth)
2. [High-Level Architecture](#2-high-level-architecture)
3. [File Structure](#3-file-structure)
4. [Technology Stack](#4-technology-stack)
5. [Data Flow: How It All Connects](#5-data-flow-how-it-all-connects)
6. [Key Architectural Patterns](#6-key-architectural-patterns)

---

## 1. What Is TrueNorth?

TrueNorth is a **direction-first productivity app** for iOS. Think of it as a todo app that forces you to connect every task to a bigger purpose. Instead of a flat task list, there's a goal hierarchy:

```
North Star (Life Area, e.g. "Career")
  → Polaris Goal (Quarterly, e.g. "Launch side project")
    → Monthly Mission (e.g. "Build MVP")
      → Weekly Heading (e.g. "Set up backend")
        → Daily Steps (e.g. "Create database schema")
```

The core screens are:
- **Today's Bearing** — your daily dashboard. Shows only tasks you planned last night. No creating tasks in the morning.
- **Kanban Board** — a 4-column board (Horizon → This Week → Today → Done) where you drag tasks between stages.
- **Weekly Planning** — pick 1–3 focus areas for the week.
- **Polaris** — manage your goals, missions, and life areas.
- **Focus Mode** — full-screen timer for deep work on a single task.

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         MOBILE APP (iOS)                         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Screens     │  │  Components  │  │  State Management    │   │
│  │  (expo-      │──│  (React      │──│                      │   │
│  │   router)    │  │   Native)    │  │  UI State → Zustand  │   │
│  │              │  │  + NativeWind│  │  Server  → React     │   │
│  │  /today      │  │   (Tailwind) │  │  State    Query      │   │
│  │  /kanban     │  │              │  │                      │   │
│  │  /weekly     │  └──────────────┘  └──────────┬───────────┘   │
│  │  /polaris    │                               │               │
│  │  /focus/[id] │                    ┌──────────▼───────────┐   │
│  │  /settings   │                    │  Supabase JS Client  │   │
│  └──────────────┘                    └──────────┬───────────┘   │
│                                                 │               │
│  ┌──────────────────────────────────────────────▼───────────┐   │
│  │  AsyncStorage (offline cache)                            │   │
│  │  React Query persists server data here for offline use   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────┬────────────────────────────────┘
                                  │ HTTPS (REST API)
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                        SUPABASE (Cloud)                          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  PostgreSQL   │  │  Auth        │  │  Row Level Security  │   │
│  │  (Database)   │  │  (JWT-based) │  │  (per-user isolation)│   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

**The mental model:** If you've built a Next.js + PostgreSQL app, think of it this way:
- **expo-router** = Next.js file-based routing, but for mobile screens instead of web pages
- **Supabase** = your backend (Postgres + Auth + REST API, hosted for you — like Firebase but SQL)
- **React Query** = server state cache (like SWR or tRPC query layer)
- **Zustand** = lightweight Redux alternative for UI-only state
- **NativeWind** = Tailwind CSS, but it compiles down to React Native styles

---

## 3. File Structure

```
TrueNorth/
├── app/                          # SCREENS (file-based routing)
│   ├── _layout.tsx               #   Root layout (providers, nav structure)
│   ├── index.tsx                 #   App entry redirect
│   ├── (auth)/                   #   Auth screens group
│   │   ├── login.tsx             #     Login screen
│   │   ├── signup.tsx            #     Sign-up screen
│   │   └── forgot-password.tsx   #     Password reset
│   ├── (tabs)/                   #   Main app (bottom tab bar)
│   │   ├── _layout.tsx           #     Tab bar configuration
│   │   ├── index.tsx             #     Today's Bearing (home)
│   │   ├── kanban.tsx            #     Kanban board
│   │   ├── weekly.tsx            #     Weekly planning
│   │   └── polaris.tsx           #     Goals hierarchy
│   ├── focus/
│   │   └── [id].tsx              #   Focus mode (dynamic route per task)
│   ├── onboarding/               #   First-time user flow
│   │   ├── welcome.tsx
│   │   ├── north-stars.tsx
│   │   └── first-goal.tsx
│   └── settings/
│       └── index.tsx             #   Settings (opens as modal)
│
├── components/                   # REUSABLE UI COMPONENTS
│   ├── common/                   #   Shared components (buttons, cards)
│   ├── kanban/                   #   Kanban-specific components
│   ├── focus/                    #   Focus mode components
│   ├── system/                   #   System-level (NetworkStatusIndicator)
│   └── ui/                       #   Low-level UI primitives
│
├── lib/                          # CORE LOGIC (non-visual)
│   ├── api/
│   │   └── queryClient.ts        #   React Query setup + offline config
│   ├── auth/                     #   Auth utilities (future)
│   ├── hooks/
│   │   └── useNetworkStatus.ts   #   Network detection hook
│   ├── store/
│   │   ├── uiStore.ts            #   Zustand store (filters, modals, focus)
│   │   └── index.ts              #   Barrel export
│   ├── supabase.ts               #   Supabase client init
│   ├── theme.ts                  #   Theme hook (colors, dark mode)
│   └── utils/                    #   Pure utility functions
│
├── types/                        # TYPESCRIPT TYPES
│   ├── models.ts                 #   Domain models (Step, NorthStar, etc.)
│   ├── database.ts               #   Supabase-generated DB types
│   └── navigation.ts             #   Navigation param types
│
├── constants/                    # APP-WIDE CONSTANTS
│   ├── colors.ts                 #   Color tokens (light/dark)
│   └── config.ts                 #   Feature flags, limits
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema (PostgreSQL)
│
├── __tests__/                    # TEST FILES
│   ├── unit/                     #   Unit tests (stores, utils)
│   ├── components/               #   Component tests
│   ├── integration/              #   Integration tests (API, hooks)
│   └── setup/                    #   Test utilities & MSW mocks
│
├── docs/                         # DOCUMENTATION
│   ├── TrueNorth_PRD.md          #   Product requirements
│   ├── tasks.md                  #   Task backlog
│   ├── current-plan.md           #   Current implementation plan
│   └── architecture.md           #   This file
│
├── tailwind.config.js            # NativeWind/Tailwind theme tokens
├── jest.config.js                # Jest test runner config
├── app.json                      # Expo app manifest
└── tsconfig.json                 # TypeScript config
```

---

## 4. Technology Stack

### 4.1 Expo (React Native) — The App Framework

**What it is:** Expo is a framework built on top of React Native that lets you build iOS (and Android) apps using React and TypeScript. React Native renders **real native UI components** (not a webview), so it feels like a native app.

**Web analogy:** If React is for building web UIs, React Native is for building mobile UIs with the same component model. Expo is the "create-react-app" / "Next.js" of the React Native world — it handles the build tooling, bundling, device APIs, and deployment.

**What it looks like in practice:**

```tsx
// This looks like React, but renders native iOS/Android components
import { View, Text, ScrollView } from 'react-native';

export default function TodayScreen() {
  return (
    <ScrollView>         {/* Native scrollable container (not a <div>) */}
      <View>             {/* Native container (like a <div>) */}
        <Text>Hello</Text>  {/* Native text (like a <p>) */}
      </View>
    </ScrollView>
  );
}
```

Key differences from web React:
- `<View>` instead of `<div>`, `<Text>` instead of `<p>/<span>`
- No CSS files — styles are objects or (in our case) Tailwind classes via NativeWind
- No browser APIs — instead you get device APIs (camera, GPS, haptics, etc.)

---

### 4.2 Expo Router — File-Based Navigation

**What it is:** Expo Router provides file-based routing, similar to Next.js. Each file in `app/` becomes a screen. Folders with parentheses like `(tabs)` create layout groups.

**Web analogy:** It's almost identical to Next.js App Router. Folders are routes, `_layout.tsx` files define shared layouts (like `layout.tsx` in Next.js), and dynamic segments use `[param]` syntax.

**How our routing works:**

```
app/
├── _layout.tsx          → Root layout (wraps everything with providers)
├── (auth)/
│   ├── _layout.tsx      → Auth layout (no tab bar)
│   ├── login.tsx         → /auth/login
│   └── signup.tsx        → /auth/signup
├── (tabs)/
│   ├── _layout.tsx      → Tab layout (bottom navigation bar)
│   ├── index.tsx         → /  (Today's Bearing — the home tab)
│   ├── kanban.tsx        → /kanban
│   ├── weekly.tsx        → /weekly
│   └── polaris.tsx       → /polaris
├── focus/
│   └── [id].tsx          → /focus/abc-123  (dynamic step ID)
└── settings/
    └── index.tsx         → /settings (opens as a modal overlay)
```

**Real flow:** When a user taps "Focus" on a task with `id: "abc-123"`, the app navigates to `/focus/abc-123`. The `[id].tsx` file reads that param:

```tsx
// app/focus/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function FocusModeScreen() {
  const { id } = useLocalSearchParams();  // id = "abc-123"
  // Fetch the step, show countdown timer, etc.
}
```

---

### 4.3 NativeWind (Tailwind for React Native)

**What it is:** NativeWind lets you write Tailwind CSS classes in React Native. Under the hood, it compiles `className="p-4 bg-blue-500 rounded-lg"` into native style objects that React Native understands.

**Web analogy:** It's exactly Tailwind CSS syntax-wise, but instead of generating CSS it generates React Native `StyleSheet` objects. Same class names, same utility-first approach.

**How it works in our app:**

```tsx
// Web Tailwind:          <div className="p-4 bg-white rounded-lg shadow">
// TrueNorth (NativeWind): 
<View className="p-4 bg-surface rounded-card shadow-card">
  <Text className="text-2xl font-heading text-northBlue">
    Today's Bearing
  </Text>
  <Text className="text-base text-textSecondary mt-2">
    Direction before speed
  </Text>
</View>
```

We define our own design tokens in `tailwind.config.js`:
- `northBlue`, `compassGold`, `softMist` — brand colors
- `priority1`, `priority2`, `priority3` — task priority colors
- `rounded-card`, `p-section` — custom spacing/radius values
- `dark:` prefix for dark mode variants (e.g. `dark:bg-surfaceDark`)

---

### 4.4 Supabase — The Backend

**What it is:** Supabase is an open-source Firebase alternative that gives you a PostgreSQL database, authentication, auto-generated REST API, and realtime subscriptions — all hosted for you. You write SQL for your schema, and Supabase gives you a REST API automatically.

**Web analogy:** Think of it as Postgres + Express API + Passport.js auth, but you don't write any backend code. You just define tables and Supabase generates the API. It's like Prisma + a hosted database + auth, all in one.

**How our backend is set up:**

```
Client (app) ──HTTPS──▶ Supabase REST API ──▶ PostgreSQL
                              │
                              ▼
                        Row Level Security
                        (each user can only
                         see their own rows)
```

**Database schema (simplified):**

```sql
-- The goal hierarchy lives in these tables:
north_stars        →  Life areas ("Career", "Health", "Family")
  polaris_goals    →  Quarterly goals ("Launch side project")
    monthly_missions →  Monthly themes ("Build MVP")
      weekly_headings →  Weekly focus ("Set up backend")

-- Tasks live here:
steps              →  Individual tasks with Kanban column, priority, tags
focus_sessions     →  Time tracking for Focus Mode
```

**Security:** Every table has Row Level Security (RLS) enabled. The policy `auth.uid() = user_id` means users can only read/write their own data — enforced at the database level. No backend code needed.

**How we query from the app:**

```tsx
// lib/supabase.ts — one-time setup
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fetching steps from the database (used inside React Query hooks)
const { data, error } = await supabase
  .from('steps')
  .select('*')
  .eq('kanban_column', 'today')
  .order('sort_order');

// Inserting a new step
const { data, error } = await supabase
  .from('steps')
  .insert({ title: 'Review quarterly goals', priority: 1, kanban_column: 'horizon' });
```

This is equivalent to writing a REST endpoint that runs `SELECT * FROM steps WHERE kanban_column = 'today' ORDER BY sort_order`, but you do it from the client with the Supabase SDK. The JWT token in the request tells Supabase who the user is, and RLS filters the data.

---

### 4.5 React Query (TanStack Query) — Server State Management

**What it is:** React Query manages all data that comes from the server (Supabase). It handles fetching, caching, background refetching, offline persistence, and synchronization. You never write `useState` + `useEffect` for API calls.

**Web analogy:** If you've used SWR, Apollo Client, or tRPC's query hooks — it's the same concept. Define a query key + fetch function, and React Query gives you `data`, `isLoading`, `error` with automatic caching and revalidation.

**Why not just fetch in useEffect?** Because in a mobile app, the user:
- Opens the app on the subway (no internet) — React Query serves cached data from AsyncStorage
- Goes online — React Query silently refetches in the background
- Navigates between screens — data is shared via cache, no duplicate fetches
- Creates a task while offline — React Query queues the mutation and retries when online

**Our configuration (`lib/api/queryClient.ts`):**

```tsx
export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,      // Data is "fresh" for 5 minutes
        gcTime: 24 * 60 * 60 * 1000,    // Keep unused data for 24 hours
        retry: 3,                        // Retry failed requests 3 times
        networkMode: 'offlineFirst',     // Serve cache first, then refetch
      },
    },
  });
}
```

**How a data-fetching hook will look (future):**

```tsx
// lib/hooks/useSteps.ts
export function useSteps(column: string) {
  return useQuery({
    queryKey: ['steps', column],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('steps')
        .select('*')
        .eq('kanban_column', column)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });
}

// In a component:
function KanbanColumn({ column }: { column: string }) {
  const { data: steps, isLoading } = useSteps(column);
  
  if (isLoading) return <ActivityIndicator />;
  return steps.map(step => <StepCard key={step.id} step={step} />);
}
```

**Offline persistence:** In the root layout, React Query's cache is persisted to AsyncStorage:

```tsx
// app/_layout.tsx
<PersistQueryClientProvider
  client={queryClient}
  persistOptions={{ persister, maxAge: 24 * 60 * 60 * 1000 }}  // 24h cache
  onSuccess={() => queryClient.resumePausedMutations()}  // Retry offline writes
>
  <App />
</PersistQueryClientProvider>
```

This means if you kill the app and reopen it without internet, you still see all your tasks and goals from the last 24 hours. The moment you're back online, React Query syncs.

---

### 4.6 Zustand — UI State Management

**What it is:** Zustand is a tiny (~1KB) state management library. It stores **UI-only state** — things like "which filter is selected" or "is a modal open". This data never goes to the server; it only lives in memory while the app is running.

**Web analogy:** Think of it as a simpler, lighter Redux with no boilerplate. No actions, no reducers, no dispatch. You define state + updater functions in one object, and call them directly from any component.

**Why two state systems (Zustand + React Query)?**
- **React Query** = server data (steps, goals, user profile) — needs fetching, caching, syncing
- **Zustand** = UI data (filters, modals, focus mode active) — no server involved, instant updates

This is a common pattern. Using React Query for server state and Zustand for UI state avoids the complexity of trying to manage everything in one global store.

**Our actual store (`lib/store/uiStore.ts`):**

```tsx
import { create } from 'zustand';

// Types prevent invalid values at compile time
type KanbanFilter = 'all' | 'work' | 'family' | 'health' | 'learning' | 'youtube';
type ModalType = 'createStep' | 'editStep' | 'deleteStep' | 'weeklyReview' | null;

export const useUIStore = create<UIStore>((set) => ({
  // State
  kanbanFilter: 'all',
  selectedDate: new Date(),
  activeModal: null,
  isFocusModeActive: false,

  // Actions
  setKanbanFilter: (filter) => set({ kanbanFilter: filter }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  openModal: (modalType) => set({ activeModal: modalType }),
  closeModal: () => set({ activeModal: null }),
  startFocusMode: () => set({ isFocusModeActive: true }),
  endFocusMode: () => set({ isFocusModeActive: false }),
  resetUIState: () => set(initialState),
}));
```

**How it will be used in components (future):**

```tsx
// Kanban screen — read filter, render filtered list
function KanbanBoard() {
  const { kanbanFilter, setKanbanFilter } = useUIStore();
  
  return (
    <View>
      {/* Filter buttons */}
      <FilterBar selected={kanbanFilter} onSelect={setKanbanFilter} />
      
      {/* Columns filtered by the selected tag */}
      <KanbanColumns filter={kanbanFilter} />
    </View>
  );
}

// A "New Task" button somewhere — opens the create modal
function AddTaskButton() {
  const openModal = useUIStore(state => state.openModal);
  
  return (
    <Pressable onPress={() => openModal('createStep')}>
      <Text>+ New Step</Text>
    </Pressable>
  );
}

// Modal component — reads which modal is active
function AppModals() {
  const { activeModal, closeModal } = useUIStore();
  
  if (activeModal === 'createStep') return <CreateStepModal onClose={closeModal} />;
  if (activeModal === 'editStep')   return <EditStepModal onClose={closeModal} />;
  return null;
}
```

The key insight: `setKanbanFilter('work')` updates the state instantly, all subscribed components re-render, and no API call is made. This is pure client-side UI state.

---

### 4.7 TypeScript — Type Safety

**What it is:** Strict TypeScript across the entire codebase. No `any` types allowed.

**How it helps:** Every database table has a matching TypeScript model. If you try to set `priority: 4` (only 1/2/3 are valid), TypeScript catches it at compile time. Same for Zustand store actions, Supabase queries, and component props.

```tsx
// types/models.ts — matches the database schema
interface Step {
  id: string;
  title: string;
  priority?: 1 | 2 | 3;       // Only 1, 2, or 3 — enforced by TS
  weeklyHeadingId?: string;
  polarisGoalId?: string;
}

// This would be a compile error:
const step: Step = { id: '1', title: 'Test', priority: 4 };
//                                                    ^ Error: 4 is not 1 | 2 | 3
```

---

### 4.8 Jest + React Native Testing Library — Testing

**What it is:** Jest runs the tests. React Native Testing Library provides utilities to render components and simulate user interactions. MSW (Mock Service Worker) intercepts API calls in tests so you don't need a real Supabase instance.

**Web analogy:** It's exactly Jest + React Testing Library, which you've likely used. The difference is `render()` produces native component trees instead of DOM nodes, and you use `fireEvent.press()` instead of `fireEvent.click()`.

**Test types we use:**

```
__tests__/
├── unit/              # Pure logic: stores, utilities, hooks
│   └── store/
│       └── uiStore.test.ts    ← Tests Zustand store directly
├── components/        # UI components rendered in isolation
│   └── NetworkStatusIndicator.test.tsx
├── integration/       # Multiple pieces working together
│   └── queryClientDefaults.test.ts
└── setup/
    ├── testUtils.tsx  # renderWithProviders() helper
    └── mocks/
        ├── handlers.ts  # Fake Supabase API responses (MSW)
        └── server.ts    # MSW server lifecycle
```

**Real test example — testing the Zustand store:**

```tsx
// __tests__/unit/store/uiStore.test.ts
import { useUIStore } from '@/lib/store/uiStore';

it('should update kanban filter', () => {
  // Call the action directly on the store
  useUIStore.getState().setKanbanFilter('work');
  
  // Read the updated state
  expect(useUIStore.getState().kanbanFilter).toBe('work');
});
```

**Real test example — testing a component:**

```tsx
// __tests__/components/NetworkStatusIndicator.test.tsx
import { renderWithProviders } from '../setup/testUtils';
import { NetworkStatusIndicator } from '@/components/system/NetworkStatusIndicator';

// Mock the hook to simulate being offline
jest.mock('@/lib/hooks/useNetworkStatus', () => ({
  useNetworkStatus: () => ({ isOnline: false }),
}));

it('should show offline message when not connected', () => {
  const { getByText } = renderWithProviders(<NetworkStatusIndicator />);
  expect(getByText('Offline — showing saved data')).toBeTruthy();
});
```

**MSW for API mocking:** Instead of mocking `supabase.from('steps').select()`, MSW intercepts the HTTP request itself. This means your test exercises the real Supabase client code — only the network layer is faked:

```tsx
// __tests__/setup/mocks/handlers.ts
export const handlers = [
  http.get(`${SUPABASE_URL}/rest/v1/steps`, () => {
    return HttpResponse.json([
      { id: '1', title: 'Review goals', priority: 1, kanban_column: 'today' },
    ]);
  }),
];
```

---

### 4.9 Other Libraries

| Library | What It Does | Web Equivalent |
|---------|-------------|----------------|
| `date-fns` | Date formatting and manipulation | Same (`date-fns` or `dayjs`) |
| `zod` | Runtime schema validation | Same (Zod for form validation, API responses) |
| `react-native-reanimated` | Smooth 60fps animations (drag-and-drop, transitions) | CSS animations / Framer Motion |
| `lucide-react-native` | Icon library (600+ icons) | `lucide-react` (same icons, native renderers) |
| `react-native-gesture-handler` | Touch gestures (swipe, drag, pinch) | Browser touch/pointer events |
| `react-native-safe-area-context` | Avoids rendering under the iPhone notch/status bar | No web equivalent |
| `expo-secure-store` | Encrypted key-value storage (for auth tokens) | `httpOnly` cookies / encrypted localStorage |
| `AsyncStorage` | Unencrypted key-value storage (for React Query cache) | `localStorage` |

---

## 5. Data Flow: How It All Connects

### Flow 1: User Opens the App (Offline-First)

```
1. App launches
2. Root _layout.tsx mounts:
   └── PersistQueryClientProvider restores React Query cache from AsyncStorage
   └── initializeOnlineManager() starts listening to network changes
3. If OFFLINE:
   └── React Query serves cached steps/goals from AsyncStorage
   └── NetworkStatusIndicator shows "Offline — showing saved data"
   └── User can still view all data from their last session
4. If ONLINE:
   └── React Query silently refetches all stale queries in the background
   └── UI updates automatically when fresh data arrives
```

### Flow 2: User Creates a New Task (Optimistic + Offline)

```
1. User taps "+" on Kanban screen
2. Zustand: openModal('createStep') → CreateStepModal appears
3. User fills in: title, priority, tag
4. Zustand: closeModal() → modal disappears
5. React Query mutation fires:
   └── Optimistic update: new task appears in Kanban immediately
   └── Supabase INSERT runs in background
   └── If OFFLINE: mutation is queued, retried when online
   └── If it fails: rollback the optimistic update
6. React Query invalidates 'steps' cache → fresh data refetched
```

### Flow 3: User Filters the Kanban Board

```
1. User taps "Work" filter button
2. Zustand: setKanbanFilter('work')
3. Kanban component re-renders (subscribed to kanbanFilter)
4. Component filters the React Query cached steps by tag === 'work'
5. Display updates instantly — NO server call, purely client-side
```

### Flow 4: User Enters Focus Mode

```
1. User taps "Focus" on a step with id: "abc-123"
2. expo-router: navigate to /focus/abc-123
3. FocusModeScreen reads useLocalSearchParams() → { id: "abc-123" }
4. React Query: fetch step details from cache (or server)
5. Zustand: startFocusMode() → full-screen timer UI
6. User completes the task:
   └── Zustand: endFocusMode()
   └── React Query mutation: update step.kanban_column = 'done'
   └── React Query mutation: create focus_session record
   └── Navigate back to Kanban
```

### Flow 5: Evening Planning (The Core Loop)

```
1. User opens Kanban (evening)
2. React Query fetches steps from Supabase
3. User drags tasks from "Horizon" / "This Week" → "Today" column
   └── Each drag = React Query mutation (update kanban_column + sort_order)
4. User sets one task as Priority 1 (the "True Step")
5. Next morning: Today's Bearing screen shows only "Today" column tasks
   └── No creation/prioritization allowed in the morning
```

---

## 6. Key Architectural Patterns

### Offline-First
The app works without internet. React Query + AsyncStorage caches all server data. Mutations queue and retry. The user never sees a loading spinner on a screen they've visited before.

### State Separation
Two state systems with clear boundaries:
- **Zustand** → ephemeral UI state (lives in memory, resets when app restarts)
- **React Query** → server data (persisted to AsyncStorage, synced with Supabase)

### Provider Stack
All providers wrap the app at the root level (`app/_layout.tsx`):

```tsx
<ThemeOverrideProvider>                    {/* Dark/light mode */}
  <PersistQueryClientProvider>              {/* React Query + offline cache */}
    <Stack>                                 {/* Navigation structure */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="focus" />
      <Stack.Screen name="settings" />
    </Stack>
  </PersistQueryClientProvider>
</ThemeOverrideProvider>
```

Note: Zustand does NOT need a provider. Stores are module-level singletons — any component can `import { useUIStore } from '@/lib/store'` directly.

### Row Level Security
No backend API code. Supabase auto-generates REST endpoints from the PostgreSQL schema, and RLS policies (`auth.uid() = user_id`) handle authorization at the database level.

---

> **TL;DR for web developers:** Replace Express routes with Supabase tables + RLS. Replace React DOM with React Native. Replace CSS with NativeWind. Replace Redux with Zustand (UI) + React Query (server). Replace Next.js pages with expo-router screens. Everything else (TypeScript, Jest, hooks, components) works the same way you already know.
