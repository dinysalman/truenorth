# TrueNorth

A direction-first productivity app for iOS, built with calm and clarity as core values.

## Overview

TrueNorth is a productivity system that prioritizes **direction before speed**. It connects quarterly goals to daily action through flexible execution, evening planning, and minimal morning decision-making.

### Core Philosophy

- Direction before speed
- One meaningful win per day (Eat the Frog)
- Plan in the evening, execute in the morning
- Flexible time over rigid schedules
- Progress over perfection
- Systems that adapt to real life

## Tech Stack

- **Framework:** Expo (React Native) with TypeScript
- **Routing:** expo-router (file-based)
- **Styling:** NativeWind v4 (Tailwind syntax for React Native) — see [Design Tokens](.cursor/reference/design-tokens.md)
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **State:** Zustand (UI), React Query (server state)
- **Testing:** Jest + React Native Testing Library (unit/component), Maestro (E2E)
- **Icons:** lucide-react-native
- **Utilities:** date-fns, zod, react-native-reanimated

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Xcode) or Android Emulator

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TrueNorth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on iOS or Android:
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   ```

### NativeWind (Tailwind) and design tokens

Styling uses **NativeWind v4** with Tailwind. Custom design tokens (colors, spacing, typography) are in `tailwind.config.js` and documented in [.cursor/reference/design-tokens.md](.cursor/reference/design-tokens.md).

- Use the `className` prop with Tailwind classes: `className="flex-1 bg-softMist p-safe"`.
- Brand colors: `bg-northBlue`, `text-compassGold`, `bg-softMist`, `bg-evergreen`.
- Priority: `bg-priority1`, `bg-priority2`, `bg-priority3`.
- Spacing: `p-safe`, `p-card`, `p-section`; radius: `rounded-card`, `rounded-button`.
- After changing `tailwind.config.js`, restart with cache clear: `npx expo start --clear`.

## Project Structure

```
TrueNorth/
├── app/                      # Expo Router file-based routing
│   ├── _layout.tsx          # Root layout with Stack navigator
│   ├── index.tsx            # Entry redirect (auth check)
│   ├── (auth)/              # Authentication flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/              # Main app with bottom tabs
│   │   ├── _layout.tsx      # Tab navigator
│   │   ├── index.tsx        # Today's Bearing (home)
│   │   ├── kanban.tsx       # Personal Kanban
│   │   ├── weekly.tsx       # Weekly Planning
│   │   └── polaris.tsx      # Goals & Missions
│   ├── focus/
│   │   └── [id].tsx         # Focus Mode (dynamic route)
│   ├── settings/
│   │   └── index.tsx        # Settings modal
│   └── onboarding/          # First-time user flow
│       ├── _layout.tsx
│       ├── welcome.tsx
│       ├── north-stars.tsx
│       └── first-goal.tsx
├── types/                   # TypeScript type definitions
│   └── navigation.ts        # Route parameters and navigation types
├── assets/                  # Images, fonts, icons
├── docs/                    # Project documentation
└── package.json
```

## Routing

TrueNorth uses **Expo Router** for file-based routing (similar to Next.js). Routes are automatically generated from the `app/` folder structure.

### Route Groups

- `(auth)` - Parentheses create layout group without adding to URL
- `(tabs)` - Groups tab screens under single layout
- `[id]` - Square brackets create dynamic route parameter

### Deep Linking

The app supports deep linking with the `truenorth://` scheme:

- **Tab screens:** `truenorth://kanban`
- **Dynamic routes:** `truenorth://focus/abc-123`
- **Settings:** `truenorth://settings`

### Navigation Examples

```typescript
import { useRouter, Link } from 'expo-router';

// Using Link component
<Link href="/(tabs)/kanban">Go to Kanban</Link>

// Using router programmatically
const router = useRouter();
router.push('/focus/task-123');
router.back();
```

## Key Features (Planned)

### Today's Bearing (Home Screen)
- Shows today's direction with zero planning required
- Highlighted True Step (Priority-1 task)
- Priority 2 and 3 tasks for today
- Entry point to Focus Mode

### Personal Kanban
- Four columns: Horizon, This Week, Today, Done
- Drag & drop task management
- Priority levels (1, 2, 3)
- Max time tracking (Parkinson's Law)

### Weekly Planning
- Guided Weekly Review
- Selection of 1-3 Weekly Headings (focus areas)
- Eisenhower matrix filtering
- Pull tasks from Monthly Missions and Horizon

### Polaris (Goals & Missions)
- Life Areas (North Stars)
- Quarterly Polaris Goals
- Monthly Missions
- Visual hierarchy and drill-down

### Focus Mode
- Full-screen minimal UI for deep work
- Countdown timer based on max time
- Pause / Resume / Complete
- No notifications during focus

## Development Guidelines

See [.cursorrules](.cursorrules) for detailed development standards, including:

- Code style and naming conventions
- Testing standards (TDD approach)
- Ticket-driven development process
- Git workflow and commit message format
- Design principles and UI/UX standards

## Testing

```bash
# Run unit and component tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (Maestro)
maestro test .maestro/
```

## Documentation

- **PRD:** `docs/TrueNorth_PRD.md` - Product Requirements Document
- **Cursor Rules:** `.cursorrules` - Development standards and guidelines

## License

Private project - All rights reserved
