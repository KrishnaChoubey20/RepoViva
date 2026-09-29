import { NextRequest, NextResponse } from 'next/server';
import { getProject, saveTurn } from '@/lib/store';
import { generateQuestion } from '@/lib/openrouter';

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await req.json();
        const { session_id, past_questions = [] } = body;

        if (!session_id) {
            return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
        }

        const project = await getProject(id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        let questionData;
        try {
            questionData = await generateQuestion(project.analysis_json, past_questions);
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to generate question: ' + err.message }, { status: 500 });
        }

        const turn = await saveTurn({
            session_id,
            question: questionData.question,
            evidence_json: {
                hint: questionData.evidence_hint,
                internal: questionData.internal_evidence
            }
        });

        return NextResponse.json({
            turn_id: turn.id,
            question: questionData.question,
            evidence_hint: questionData.evidence_hint
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
