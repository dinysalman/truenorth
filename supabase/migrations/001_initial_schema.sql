-- TrueNorth initial schema (TASK-007).
-- Goal hierarchy: north_stars → polaris_goals → monthly_missions → weekly_headings.
-- Steps live in Kanban buckets; Horizon is global (week_start_date NULL), this_week/today/done are weekly-scoped.
-- RLS: all tables use user_id = auth.uid() for SELECT/INSERT/UPDATE/DELETE.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper: set updated_at on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Life areas (top of hierarchy)
CREATE TABLE north_stars (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER north_stars_updated_at
  BEFORE UPDATE ON north_stars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Quarterly goals
CREATE TABLE polaris_goals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  north_star_id uuid NOT NULL REFERENCES north_stars(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER polaris_goals_updated_at
  BEFORE UPDATE ON polaris_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Monthly missions
CREATE TABLE monthly_missions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  polaris_goal_id uuid NOT NULL REFERENCES polaris_goals(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER monthly_missions_updated_at
  BEFORE UPDATE ON monthly_missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Weekly headings (focus areas for a week)
CREATE TABLE weekly_headings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  monthly_mission_id uuid REFERENCES monthly_missions(id) ON DELETE SET NULL,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER weekly_headings_updated_at
  BEFORE UPDATE ON weekly_headings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Steps (tasks): Kanban bucket in kanban_column; Horizon = global (week_start_date NULL), else weekly.
CREATE TABLE steps (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  priority smallint CHECK (priority IN (1, 2, 3)),
  weekly_heading_id uuid REFERENCES weekly_headings(id) ON DELETE SET NULL,
  polaris_goal_id uuid REFERENCES polaris_goals(id) ON DELETE SET NULL,
  north_star_id uuid REFERENCES north_stars(id) ON DELETE SET NULL,
  max_minutes integer,
  tag text,
  kanban_column text NOT NULL CHECK (kanban_column IN ('horizon', 'this_week', 'today', 'done')),
  week_start_date date,
  sort_order integer NOT NULL DEFAULT 0,
  scheduled_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER steps_updated_at
  BEFORE UPDATE ON steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Focus Mode sessions
CREATE TABLE focus_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step_id uuid NOT NULL REFERENCES steps(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER focus_sessions_updated_at
  BEFORE UPDATE ON focus_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE north_stars ENABLE ROW LEVEL SECURITY;
ALTER TABLE polaris_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_headings ENABLE ROW LEVEL SECURITY;
ALTER TABLE steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY north_stars_user ON north_stars
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY polaris_goals_user ON polaris_goals
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY monthly_missions_user ON monthly_missions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY weekly_headings_user ON weekly_headings
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY steps_user ON steps
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY focus_sessions_user ON focus_sessions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
