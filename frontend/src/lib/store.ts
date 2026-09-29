import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const hasSupabase = Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));

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
        } else if (inserted) {
            return inserted;
        }
    }
    
    inMemoryStore.projects.set(project.id, project);
    return project;
}

export async function getProject(id: string) {
    if (hasSupabase && supabase) {
        const { data } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        if (data) return data;
    }
    return inMemoryStore.projects.get(id) || null;
}

export async function listProjects() {
    if (hasSupabase && supabase) {
        const { data } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) return data;
    }
    return Array.from(inMemoryStore.projects.values()).sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function createSession(projectId: string) {
    const session = {
        id: generateUUID(),
        project_id: projectId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    if (hasSupabase && supabase) {
        const { data: inserted } = await supabase
            .from('practice_sessions')
            .insert(session)
            .select()
            .single();
        if (inserted) return inserted;
    }

    inMemoryStore.sessions.set(session.id, session);
    return session;
}

export async function getSession(id: string) {
    if (hasSupabase && supabase) {
        const { data } = await supabase
            .from('practice_sessions')
            .select('*')
            .eq('id', id)
            .single();
        if (data) return data;
    }
    return inMemoryStore.sessions.get(id) || null;
}

export async function listSessions() {
    if (hasSupabase && supabase) {
        const { data } = await supabase
            .from('practice_sessions')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) return data;
    }
    return Array.from(inMemoryStore.sessions.values()).sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
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
    return inMemoryStore.turns.get(turnId) || null;
}

export async function listTurns(sessionId?: string) {
    if (hasSupabase && supabase) {
        let query = supabase.from('practice_turns').select('*').order('created_at', { ascending: true });
        if (sessionId) {
            query = query.eq('session_id', sessionId);
        }
        const { data } = await query;
        if (data) return data;
    }
    let turns = Array.from(inMemoryStore.turns.values());
    if (sessionId) {
        turns = turns.filter(t => t.session_id === sessionId);
    }
    return turns.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}
