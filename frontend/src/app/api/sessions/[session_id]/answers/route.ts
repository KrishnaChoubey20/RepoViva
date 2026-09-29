import { NextRequest, NextResponse } from 'next/server';
import { getTurn, updateTurnWithAnswer, getProject } from '@/lib/store';
import { generateFeedback } from '@/lib/openrouter';


// We need to fetch the session to get the project_id. 
// Since we have getProject but no getSession exported in store, let's just pass project_id in body for simplicity, or we update store.ts.
// Let's expect project_id in body for the MVP to avoid adding too much boilerplate, OR update store to fetch session.
// Wait, I will just export getSession from store.ts, I'll update store.ts separately.

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ session_id: string }> }
) {
    try {
        const { session_id } = await context.params;
        const body = await req.json();
        const { turn_id, answer, project_id } = body;

        if (!turn_id || !answer || !project_id) {
            return NextResponse.json({ error: 'turn_id, answer, and project_id are required' }, { status: 400 });
        }

        const project = await getProject(project_id);
        const turn = await getTurn(turn_id);

        if (!project || !turn) {
            return NextResponse.json({ error: 'Project or Turn not found' }, { status: 404 });
        }

        let feedbackData;
        try {
            feedbackData = await generateFeedback(project.analysis_json, turn.question, answer);
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to generate feedback: ' + err.message }, { status: 500 });
        }

        await updateTurnWithAnswer(turn_id, answer, feedbackData);

        return NextResponse.json(feedbackData);

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
