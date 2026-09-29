-- Supabase Schema for RepoViva MVP

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- Optional, for future use
    repo_url TEXT NOT NULL,
    repo_owner TEXT NOT NULL,
    repo_name TEXT NOT NULL,
    analysis_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create practice_sessions table
CREATE TABLE IF NOT EXISTS public.practice_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create practice_turns table
CREATE TABLE IF NOT EXISTS public.practice_turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.practice_sessions(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    evidence_json JSONB,
    answer TEXT,
    feedback_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
-- For MVP demo mode without auth, we can enable public insert/select for these tables
-- Warning: In a production app with Auth, you would restrict these based on user_id
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_turns ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access for demo
CREATE POLICY "Allow public select on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON public.projects FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on practice_sessions" ON public.practice_sessions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on practice_sessions" ON public.practice_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on practice_sessions" ON public.practice_sessions FOR UPDATE USING (true);

CREATE POLICY "Allow public select on practice_turns" ON public.practice_turns FOR SELECT USING (true);
CREATE POLICY "Allow public insert on practice_turns" ON public.practice_turns FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on practice_turns" ON public.practice_turns FOR UPDATE USING (true);
