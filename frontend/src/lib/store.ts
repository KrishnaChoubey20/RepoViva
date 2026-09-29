import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// If we don't have keys, we fall back to an in-memory store
export const hasSupabase = Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));

// Using service role key for backend operations if available to bypass RLS, otherwise use anon key
export const supabase = hasSupabase 
    ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey) 
    : null;

// In-memory fallback
const inMemoryStore = {
    projects: new Map<string, any>(),
    sessions: new Map<string, any>(),
    turns: new Map<string, any>(),
};

function generateUUID() {
    return crypto.randomUUID();
}

export async function saveProject(data: any) {
    const project = {
        id: generateUUID(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    if (hasSupabase && supabase) {
        const { data: inserted, error } = await supabase
            .from('projects')
            .insert(project)
            .select()
            .single();
        if (error) {
            console.error('Supabase save error:', error);
            // fallback to memory if error? No, let's just return what we have
        } else if (inserted) {
            return inserted;
        }
    }
    
    inMemoryStore.projects.set(project.id, project);
    return project;
}

export async function getProject(id: string) {
    if (hasSupabase && supabase) {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        if (data) return data;
    }
    return inMemoryStore.projects.get(id);
}

export async function createSession(projectId: string) {
    const session = {
        id: generateUUID(),
        project_id: projectId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    if (hasSupabase && supabase) {
        const { data: inserted, error } = await supabase
            .from('practice_sessions')
            .insert(session)
            .select()
            .single();
        if (inserted) return inserted;
    }

    inMemoryStore.sessions.set(session.id, session);
    return session;
}

export async function saveTurn(data: { session_id: string, question: string, evidence_json?: any }) {
    const turn = {
        id: generateUUID(),
        ...data,
        created_at: new Date().toISOString()
    };

    if (hasSupabase && supabase) {
        const { data: inserted } = await supabase
            .from('practice_turns')
            .insert(turn)
            .select()
            .single();
        if (inserted) return inserted;
    }

    inMemoryStore.turns.set(turn.id, turn);
    return turn;
}

export async function updateTurnWithAnswer(turnId: string, answer: string, feedbackJson: any) {
    if (hasSupabase && supabase) {
        const { data: updated } = await supabase
            .from('practice_turns')
            .update({ answer, feedback_json: feedbackJson })
            .eq('id', turnId)
            .select()
            .single();
        if (updated) return updated;
    }

    const turn = inMemoryStore.turns.get(turnId);
    if (turn) {
        turn.answer = answer;
        turn.feedback_json = feedbackJson;
        inMemoryStore.turns.set(turnId, turn);
        return turn;
    }
    return null;
}

export async function getTurn(turnId: string) {
    if (hasSupabase && supabase) {
        const { data } = await supabase
            .from('practice_turns')
            .select('*')
            .eq('id', turnId)
            .single();
        if (data) return data;
    }
    return inMemoryStore.turns.get(turnId);
}
