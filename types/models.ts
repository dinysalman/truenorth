/**
 * Core domain models for TrueNorth goal hierarchy (PRD Section 3).
 * North Star → Polaris Goal → Monthly Mission → Weekly Heading → Daily Steps.
 */

/** Life area; top of the hierarchy. */
export interface NorthStar {
  id: string;
  title: string;
  createdAt?: string;
}

/** Quarterly direction under a North Star. */
export interface PolarisGoal {
  id: string;
  title: string;
  northStarId: string;
  createdAt?: string;
}

/** Monthly theme under a Polaris Goal. */
export interface MonthlyMission {
  id: string;
  title: string;
  polarisGoalId: string;
  createdAt?: string;
}

/** Weekly focus under a Monthly Mission. */
export interface WeeklyHeading {
  id: string;
  title: string;
  monthlyMissionId?: string;
  createdAt?: string;
}

/** Daily task (step); links up to Weekly Heading / Polaris. */
export interface Step {
  id: string;
  title: string;
  priority?: 1 | 2 | 3;
  weeklyHeadingId?: string;
  polarisGoalId?: string;
  createdAt?: string;
}
