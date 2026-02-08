/**
 * Navigation type definitions for TrueNorth
 * Provides type safety for all routes and navigation parameters
 */

/**
 * Root stack navigation parameters
 * Top-level routes in the app
 */
export type RootStackParamList = {
  '(tabs)': undefined;
  '(auth)': undefined;
  'onboarding': undefined;
  'focus/[id]': { id: string };
  'settings': undefined;
};

/**
 * Auth stack navigation parameters
 * Routes within the authentication flow
 */
export type AuthStackParamList = {
  'login': undefined;
  'signup': undefined;
  'forgot-password': undefined;
};

/**
 * Bottom tabs navigation parameters
 * Main app tabs after authentication
 */
export type TabsParamList = {
  'index': undefined;        // Today's Bearing
  'kanban': undefined;       // Personal Kanban
  'weekly': undefined;       // Weekly Planning
  'polaris': undefined;      // Goals & Missions
};

/**
 * Onboarding stack navigation parameters
 * Routes for first-time user setup
 */
export type OnboardingStackParamList = {
  'welcome': undefined;
  'north-stars': undefined;
  'first-goal': undefined;
};

/**
 * Focus mode route parameters
 * Dynamic route for focus sessions
 */
export type FocusScreenParams = {
  id: string;  // Step ID for the task to focus on
};

/**
 * Combined navigation params for type-safe routing
 */
export type AllRoutesParamList = 
  & RootStackParamList 
  & AuthStackParamList 
  & TabsParamList 
  & OnboardingStackParamList;
