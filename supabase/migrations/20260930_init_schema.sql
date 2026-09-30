-- Drop existing tables to ensure a clean slate (if they exist)
DROP TABLE IF EXISTS interview_reports CASCADE;
DROP TABLE IF EXISTS practice_turns CASCADE;
DROP TABLE IF EXISTS practice_sessions CASCADE;
DROP TABLE IF EXISTS project_topics CASCADE;
DROP TABLE IF EXISTS project_evidence CASCADE;
DROP TABLE IF EXISTS project_chunks CASCADE;
DROP TABLE IF EXISTS project_files CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  repo_url TEXT NOT NULL,
  repo_owner TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  default_branch TEXT,
  repo_sha TEXT,
  name TEXT,
  description TEXT,
  analysis_status TEXT DEFAULT 'pending',
  analysis_progress TEXT,
  analysis_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project Files
CREATE TABLE project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  path TEXT NOT NULL,
  language TEXT,
  size INTEGER,
  sha TEXT,
  importance FLOAT,
  category TEXT,
  content_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project Chunks
CREATE TABLE project_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  file_id UUID REFERENCES project_files(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  symbol TEXT,
  start_line INTEGER,
  end_line INTEGER,
  language TEXT,
  category TEXT,
  importance FLOAT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project Evidence
CREATE TABLE project_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  path TEXT NOT NULL,
  start_line INTEGER,
  end_line INTEGER,
  symbol TEXT,
  snippet TEXT,
  topic TEXT,
  relevance FLOAT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project Topics
CREATE TABLE project_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  confidence FLOAT,
  evidence_ids JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Practice Sessions
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  mode TEXT NOT NULL,
  topic TEXT,
  status TEXT DEFAULT 'created',
  score FLOAT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Practice Turns
CREATE TABLE practice_turns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE NOT NULL,
  sequence INTEGER NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT,
  evidence_json JSONB,
  answer TEXT,
  feedback_json JSONB,
  score FLOAT,
  follow_up TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Interview Reports
CREATE TABLE interview_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE NOT NULL,
  overall_score FLOAT,
  technical_score FLOAT,
  communication_score FLOAT,
  ownership_score FLOAT,
  reasoning_score FLOAT,
  evidence_alignment_score FLOAT,
  strengths_json JSONB,
  weaknesses_json JSONB,
  recommendations_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Enablement
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own project files" ON project_files FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own project files" ON project_files FOR INSERT WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own project chunks" ON project_chunks FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own project chunks" ON project_chunks FOR INSERT WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own project evidence" ON project_evidence FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own project evidence" ON project_evidence FOR INSERT WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own project topics" ON project_topics FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own project topics" ON project_topics FOR INSERT WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own practice sessions" ON practice_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own practice sessions" ON practice_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own practice sessions" ON practice_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own practice sessions" ON practice_sessions FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own practice turns" ON practice_turns FOR SELECT USING (session_id IN (SELECT id FROM practice_sessions WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own practice turns" ON practice_turns FOR INSERT WITH CHECK (session_id IN (SELECT id FROM practice_sessions WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own practice turns" ON practice_turns FOR UPDATE USING (session_id IN (SELECT id FROM practice_sessions WHERE user_id = auth.uid()));

CREATE POLICY "Users can view own interview reports" ON interview_reports FOR SELECT USING (session_id IN (SELECT id FROM practice_sessions WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own interview reports" ON interview_reports FOR INSERT WITH CHECK (session_id IN (SELECT id FROM practice_sessions WHERE user_id = auth.uid()));

-- Automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
