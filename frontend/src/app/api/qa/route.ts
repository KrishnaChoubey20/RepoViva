import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateQA } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { project_id, messages } = body;

        if (!project_id || !messages) {
            return NextResponse.json({ error: 'project_id and messages are required' }, { status: 400 });
        }

        const { data: project } = await supabase
            .from('projects')
            .select('*')
            .eq('id', project_id)
            .single();

        if (!project || project.user_id !== user.id) {
            return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 });
        }

        const analysis = project.analysis_json;
        
        // Pass the conversation history to the Q&A generation function
        const answer = await generateQA(analysis, messages);

        return NextResponse.json({ answer });

    } catch (err: any) {
        console.error('QA Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
