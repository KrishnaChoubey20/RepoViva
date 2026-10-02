-- Weaknesses Table
CREATE TABLE weaknesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES practice_sessions(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  issue TEXT NOT NULL,
  severity TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE weaknesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own weaknesses" ON weaknesses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own weaknesses" ON weaknesses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own weaknesses" ON weaknesses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own weaknesses" ON weaknesses FOR DELETE USING (auth.uid() = user_id);
