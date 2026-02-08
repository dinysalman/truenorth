# TrueNorth – Technical Specification

## 1. Overview

This document captures all technical decisions for building TrueNorth, a direction-first productivity app for iOS (with Android potential via React Native).

**Target:** Public release on App Store  
**Approach:** Cloud-first with offline support  
**Primary Development Environment:** Cursor IDE + Xcode (for builds)

---

## 2. Tech Stack

### Core Framework

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Expo | SDK 52+ | Managed React Native workflow |
| Language | TypeScript | 5.x | Type safety, IDE support |
| Runtime | React Native | 0.76+ | Cross-platform mobile |

### Navigation & Routing

| Technology | Purpose |
|------------|---------|
| expo-router | File-based routing, deep linking, type-safe navigation |

### Styling & UI

| Technology | Purpose |
|------------|---------|
| NativeWind v4 | Tailwind CSS syntax for React Native |
| lucide-react-native | Icon library (clean, minimal aesthetic) |
| react-native-reanimated | Smooth animations (Kanban drag-drop, Focus Mode) |
| react-native-gesture-handler | Touch gestures |

### State Management

| Technology | Purpose |
|------------|---------|
| Zustand | Local UI state (current screen, modals, filters) |
| React Query (TanStack Query) | Server state, caching, offline persistence |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| Supabase | Backend-as-a-Service |
| PostgreSQL | Primary database (via Supabase) |
| Supabase Auth | Authentication (Apple, Google, Email) |
| Supabase Realtime | Multi-device sync |
| Row Level Security (RLS) | Data isolation per user |

### Utilities

| Technology | Purpose |
|------------|---------|
| date-fns | Date manipulation (lightweight, immutable) |
| zod | Runtime validation, form schemas |
| expo-secure-store | Secure token storage |
| expo-notifications | Evening planning reminders (post-MVP) |

---

## 3. Architecture Decisions

### 3.1 Why React Native (Expo) over Native Swift

- **Cross-platform:** iOS first, Android later without rewrite
- **Developer velocity:** Hot reload, TypeScript, npm ecosystem
- **Cursor compatibility:** Full IDE support (Swift/Xcode less integrated)
- **Expo managed workflow:** Simplified builds, OTA updates, EAS

### 3.2 Why Supabase over Local-Only

- **Public release requires:** User accounts, data sync, backup
- **Multi-device sync:** Users expect data on all devices
- **Row Level Security:** Built-in data isolation
- **Generous free tier:** Scales with growth
- **TypeScript integration:** Auto-generated types from schema

### 3.3 Offline-First Strategy

The app must feel fast and work without internet (especially for morning execution).

**Approach:**
1. React Query caches all data locally
2. UI updates optimistically (instant feedback)
3. Background sync to Supabase when online
4. Conflict resolution: last-write-wins (simple, predictable)

```
User Action → Update Local Cache → Render UI → Sync to Cloud (async)
```

### 3.4 Why NativeWind over Styled Components / StyleSheet

- **Familiar syntax:** Tailwind classes (fast iteration)
- **Design tokens:** Easy to maintain brand colors
- **Responsive:** Built-in breakpoint support
- **Performance:** Compiles to native StyleSheet

---

## 4. Project Structure

```
TrueNorth/
├── app/                        # expo-router (file-based routing)
│   ├── (auth)/                 # Unauthenticated routes
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                 # Main app (authenticated)
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # Today's Bearing (home)
│   │   ├── kanban.tsx          # Personal Kanban
│   │   ├── weekly.tsx          # Weekly Planning
│   │   └── polaris.tsx         # Goals hierarchy
│   ├── focus/
│   │   └── [id].tsx            # Focus Mode (full-screen timer)
│   ├── onboarding/             # First-time setup flow
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── north-stars.tsx
│   │   └── first-goal.tsx
│   ├── settings/
│   │   └── index.tsx
│   └── _layout.tsx             # Root layout
│
├── components/                 # Reusable UI components
│   ├── ui/                     # Primitives (Button, Card, Input)
│   ├── kanban/                 # Kanban-specific (Column, StepCard)
│   ├── focus/                  # Focus Mode components
│   └── common/                 # Shared (Header, EmptyState)
│
├── lib/                        # Core logic
│   ├── supabase.ts             # Supabase client initialization
│   ├── auth/                   # Auth helpers, hooks
│   ├── api/                    # React Query hooks (useSteps, useGoals)
│   ├── store/                  # Zustand stores (UI state)
│   └── utils/                  # Helper functions
│
├── constants/                  # Static values
│   ├── colors.ts               # Brand colors
│   ├── typography.ts           # Font styles
│   └── config.ts               # App configuration
│
├── types/                      # TypeScript types
│   ├── database.ts             # Supabase-generated types
│   ├── navigation.ts           # Route params
│   └── models.ts               # Domain models
│
├── assets/                     # Images, fonts
│
├── __tests__/                  # Test files
│   ├── unit/
│   ├── components/
│   └── integration/
├── mocks/                      # MSW API mocks
├── .maestro/                   # E2E test flows
│
├── app.json                    # Expo configuration
├── tailwind.config.js          # NativeWind configuration
├── jest.config.js              # Jest configuration
├── tsconfig.json
└── package.json
```

---

## 5. Database Schema (Supabase/PostgreSQL)

### Tables

```sql
-- North Stars (Life Areas)
-- Stable domains like Work, Family, Health
CREATE TABLE north_stars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,                    -- Hex color for UI
  icon TEXT,                     -- Icon name from lucide
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Polaris Goals (Quarterly Direction)
CREATE TABLE polaris_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  north_star_id UUID REFERENCES north_stars(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  quarter INTEGER CHECK (quarter BETWEEN 1 AND 4),
  year INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Monthly Missions (Monthly Theme)
CREATE TABLE monthly_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  polaris_goal_id UUID REFERENCES polaris_goals(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  month INTEGER CHECK (month BETWEEN 1 AND 12),
  year INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Weekly Headings (Weekly Focus)
CREATE TABLE weekly_headings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  week_start DATE,               -- Monday of the week
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Steps (Tasks)
CREATE TABLE steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  priority INTEGER CHECK (priority BETWEEN 1 AND 3),
  max_minutes INTEGER,           -- Parkinson's Law time limit
  column TEXT CHECK (column IN ('horizon', 'this_week', 'today', 'done')),
  "order" INTEGER DEFAULT 0,     -- Position within column
  
  -- Linkages (all optional)
  north_star_id UUID REFERENCES north_stars(id) ON DELETE SET NULL,
  polaris_goal_id UUID REFERENCES polaris_goals(id) ON DELETE SET NULL,
  monthly_mission_id UUID REFERENCES monthly_missions(id) ON DELETE SET NULL,
  weekly_heading_id UUID REFERENCES weekly_headings(id) ON DELETE SET NULL,
  
  -- Dates
  scheduled_date DATE,           -- When task is scheduled
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Focus Sessions (Time tracking)
CREATE TABLE focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  step_id UUID REFERENCES steps(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)

All tables have RLS enabled with policy:
```sql
CREATE POLICY "Users can only access their own data"
ON table_name FOR ALL
USING (auth.uid() = user_id);
```

---

## 6. Authentication Flow

### Supported Providers
1. **Apple Sign-In** (required for iOS App Store)
2. **Google Sign-In** (optional, common)
3. **Email/Password** (fallback)

### Flow
1. User opens app → Check for stored session
2. No session → Show auth screen
3. User authenticates → Supabase returns JWT
4. Store JWT securely (expo-secure-store)
5. Attach JWT to all API requests
6. On token refresh → Supabase handles automatically

---

## 7. Design Tokens

From the PRD brand identity:

```typescript
// constants/colors.ts
export const colors = {
  // Primary
  northBlue: '#1E2A38',      // Deep North Blue (primary)
  compassGold: '#D4A017',    // Compass Gold (accent)
  
  // Background
  softMist: '#F5F7FA',       // Light background
  white: '#FFFFFF',
  
  // Semantic
  success: '#2E7D32',        // Evergreen (task complete)
  warning: '#F59E0B',
  error: '#DC2626',
  
  // Neutral
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Priority colors
  priority: {
    1: '#DC2626',            // Red (True Step)
    2: '#F59E0B',            // Amber
    3: '#6B7280',            // Gray
  },
};
```

---

## 8. Development Environment

### Required
- macOS (you have darwin 25.2.0)
- Node.js v20+ (you have v20.19.4)
- Xcode (you have it installed)
- Cursor IDE (primary editor)

### Setup Commands
```bash
# Fix Xcode CLI path (one-time)
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# Create Expo project
npx create-expo-app@latest TrueNorth --template blank-typescript

# Install dependencies
cd TrueNorth
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install nativewind tailwindcss
npx expo install @supabase/supabase-js react-native-url-polyfill
npm install @tanstack/react-query zustand date-fns zod
npm install lucide-react-native react-native-svg
```

### Development Workflow
1. `npx expo start` — Start dev server
2. Scan QR with Expo Go (iPhone) for quick testing
3. `npx expo run:ios` — Build native iOS (requires Xcode)

---

## 9. App Store Requirements

### Apple Developer Account
- Cost: $99/year
- Required for: TestFlight, App Store distribution

### Required for Submission
- [ ] Privacy Policy URL
- [ ] App icons (1024x1024 + sizes)
- [ ] Screenshots (6.5" and 5.5" displays)
- [ ] App description, keywords
- [ ] Apple Sign-In (if any social login offered)

### Build & Distribution
- Use **EAS Build** (Expo Application Services)
- Free tier: 30 builds/month
- Handles signing, provisioning profiles

---

## 10. Testing Strategy

### Test Types & Tools

| Type | Tool | Purpose |
|------|------|---------|
| Unit | Jest | Pure functions, utilities, hooks |
| Component | React Native Testing Library | UI components in isolation |
| Integration | Jest + MSW | API calls, database operations |
| E2E | Maestro | Full user flows on device/simulator |
| Manual | Checklist | Device-specific, UX validation |

### Test Stack

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
npm install --save-dev msw @types/jest
```

### Test Folder Structure

```
TrueNorth/
├── __tests__/                    # Test files
│   ├── unit/                     # Unit tests
│   │   ├── utils/
│   │   └── hooks/
│   ├── components/               # Component tests
│   ├── integration/              # API/integration tests
│   └── setup.ts                  # Jest setup
├── mocks/                        # MSW handlers
│   ├── handlers.ts
│   └── server.ts
├── .maestro/                     # E2E test flows
│   ├── auth-flow.yaml
│   ├── daily-flow.yaml
│   └── kanban-flow.yaml
└── jest.config.js
```

### Coverage Goals

| Layer | Target | Notes |
|-------|--------|-------|
| Utilities (`lib/utils/`) | 90%+ | Pure functions, easy to test |
| API hooks (`lib/api/`) | 80%+ | Mock Supabase with MSW |
| Components | Key interactions | Focus on user behavior |
| E2E | Critical paths | Signup, daily flow, kanban |

### Testing Approach

1. **Unit Tests:** Test pure functions in isolation
   - Timer logic, date utilities, validation
   - Run fast, no external dependencies

2. **Component Tests:** Test UI behavior
   - User interactions (tap, swipe, type)
   - Use Testing Library's user-centric queries

3. **Integration Tests:** Test API layer
   - Mock Supabase responses with MSW
   - Test React Query hooks

4. **E2E Tests:** Test real user flows
   - Maestro for visual flow testing
   - Run on Simulator before release

### Running Tests

```bash
# Unit & integration tests
npm test

# With coverage
npm test -- --coverage

# Watch mode during development
npm test -- --watch

# E2E tests (requires Maestro CLI)
maestro test .maestro/
```

---

## 12. Future Considerations (Post-MVP)

### Planned
- iCloud sync (alternative to Supabase for Apple purists)
- Calendar integration (read-only, show busy times)
- Push notifications (evening planning reminders)
- Widget (iOS home screen)
- Apple Watch companion (view Today's Bearing)

### Not Planned
- Android (deferred, but architecture supports it)
- Social features
- AI suggestions (maybe later)

---

## 13. Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-07 | Din Salman | Initial technical specification |
| 2026-02-07 | Din Salman | Added testing strategy (Section 10) |
