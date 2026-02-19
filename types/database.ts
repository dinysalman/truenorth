/**
 * Supabase database row types for TrueNorth.
 * Keep in sync with supabase/migrations/001_initial_schema.sql.
 */

export type KanbanColumn = 'horizon' | 'this_week' | 'today' | 'done';

export interface NorthStarRow {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface PolarisGoalRow {
  id: string;
  user_id: string;
  north_star_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface MonthlyMissionRow {
  id: string;
  user_id: string;
  polaris_goal_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface WeeklyHeadingRow {
  id: string;
  user_id: string;
  monthly_mission_id: string | null;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface StepRow {
  id: string;
  user_id: string;
  title: string;
  priority: 1 | 2 | 3 | null;
  weekly_heading_id: string | null;
  polaris_goal_id: string | null;
  north_star_id: string | null;
  max_minutes: number | null;
  tag: string | null;
  kanban_column: KanbanColumn;
  week_start_date: string | null;
  sort_order: number;
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface FocusSessionRow {
  id: string;
  user_id: string;
  step_id: string;
  started_at: string;
  ended_at: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

/** Database shape for typed Supabase client (e.g. supabase.from('steps').select()). */
export interface Database {
  public: {
    Tables: {
      north_stars: { Row: NorthStarRow; Insert: Omit<NorthStarRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<NorthStarRow> };
      polaris_goals: { Row: PolarisGoalRow; Insert: Omit<PolarisGoalRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<PolarisGoalRow> };
      monthly_missions: { Row: MonthlyMissionRow; Insert: Omit<MonthlyMissionRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<MonthlyMissionRow> };
      weekly_headings: { Row: WeeklyHeadingRow; Insert: Omit<WeeklyHeadingRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<WeeklyHeadingRow> };
      steps: { Row: StepRow; Insert: Omit<StepRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<StepRow> };
      focus_sessions: { Row: FocusSessionRow; Insert: Omit<FocusSessionRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }; Update: Partial<FocusSessionRow> };
    };
  };
}
