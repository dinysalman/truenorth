# TrueNorth – Product Requirements Document (PRD)

## 1. Overview

**Product Name:** TrueNorth
**Platform:** iOS (iPhone-first)
**Audience:** Knowledge workers, parents, creators, engineers seeking calm, aligned productivity

### Problem

Most productivity tools optimize task completion, not life alignment. Users feel busy but disconnected from long-term goals, especially when life is unpredictable (work + family, interruptions, limited energy).

### Solution

TrueNorth is a **direction-first productivity system**. It connects quarterly goals to daily action through flexible execution, evening planning, and minimal morning decision-making. The system prioritizes clarity, calm, and consistency over hustle.

---

## 2. Core Philosophy

* Direction before speed
* One meaningful win per day (Eat the Frog)
* Plan in the evening, execute in the morning
* Flexible time over rigid schedules
* Progress over perfection
* Systems that adapt to real life

---

## 3. Core Model (Goal Hierarchy)

```
North Star (Life Area)
→ Polaris Goal (Quarterly Direction)
→ Monthly Mission (Theme)
→ Weekly Heading (Focus)
→ Daily Steps (Tasks)
```

Every task must trace upward to a higher purpose.

---

## 4. Core Features

### 4.1 Today’s Bearing (Home Screen)

**Purpose:** Show today’s direction with zero planning required.

**Features:**

* Today’s date
* Highlighted True Step (single Priority-1 task)
* Priority 2 and 3 tasks for today
* Entry point to Focus Mode
* Calm, encouraging microcopy

**Rules:**

* Tasks appear here only if planned the night before
* No task creation or prioritization in the morning

---

### 4.2 Personal Kanban (Steps)

**Columns:**

* Horizon (Inbox / GTD capture)
* This Week
* Today (prepared the night before)
* Done

**Each Step Includes:**

* Title
* Priority (1 / 2 / 3)
* Max time (Parkinson’s Law)
* Linked North Star / Goal
* Tag (Work, Family, Health, Learning, YouTube)

**Rules:**

* Max 1 Priority-1 per day
* Soft limits on Today and This Week
* Drag & drop between columns

---

### 4.3 Weekly Heading (Weekly Planning)

**Purpose:** Decide what matters *this* week.

**Features:**

* Guided Weekly Review
* Selection of 1–3 Weekly Headings (focus areas)
* Pulling tasks from Monthly Missions and Horizon
* Light Eisenhower filtering (Important vs Urgent)

---

### 4.4 Polaris (Goals & Missions)

**Purpose:** Maintain direction and alignment.

**Features:**

* Life Areas (North Stars)
* Quarterly Polaris Goals
* Monthly Missions
* Visual hierarchy and drill-down
* Clear linkage from daily steps upward

---

### 4.5 Focus Mode

**Purpose:** Enable deep, interruption-friendly execution.

**Features:**

* Full-screen minimal UI
* Task name
* Countdown timer (based on max time)
* Pause / Resume / Complete
* No notifications

---

## 5. Planning & Execution Flow

### Evening (Primary Planning Time)

* Clear Horizon inbox
* Review This Week
* Choose tomorrow’s True Step
* Populate Tomorrow’s Today column

### Morning (Execution Only)

* Review Today’s Bearing
* Start Focus Mode when time allows
* No prioritization or reshuffling unless forced by life

### Weekly

* Weekly Review
* Select Weekly Headings
* Populate This Week

### Monthly

* Execute Monthly Missions
* Adjust scope if needed

### Quarterly

* Set Polaris Goals
* Reflect and realign

---

## 6. Success Metrics

* Daily True Step completion rate
* Weekly planning completion rate
* User-reported clarity and calm
* Retention over 4+ weeks

---

## 7. Design Specification (for Figma / AI)

### Brand Identity

* **Tone:** Calm, guiding, respectful
* **Primary Color:** Deep North Blue (#1E2A38)
* **Accent:** Compass Gold (#D4A017)
* **Background:** Soft Mist (#F5F7FA)
* **Success:** Evergreen (#2E7D32)

### Typography

* Headings: SF Pro / Inter
* Body: Neutral, readable, low contrast

### UX Principles

* Reduce cognitive load
* No guilt-driven messaging
* Soft constraints, not hard failures
* Designed for interruption-friendly life

---

## 8. MVP Scope

**Included:**

* Onboarding
* Today’s Bearing
* Personal Kanban
* Weekly Planning
* Goals hierarchy
* Focus Mode

**Post-MVP:**

* iCloud sync
* Calendar (read-only)
* Templates
* AI-assisted suggestions

---

## 9. Non-Goals

* Social feeds or sharing
* Competitive leaderboards
* Rigid hour-by-hour scheduling
* Overly granular analytics

---

## 10. Risks & Mitigations

**Risk:** Over-complexity
**Mitigation:** Progressive disclosure, calm defaults

**Risk:** User guilt when falling behind
**Mitigation:** Language, forgiveness flows, evening-first planning
