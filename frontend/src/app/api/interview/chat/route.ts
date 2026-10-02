import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateQuestion, generateFeedback } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { session_id, answer } = body;

        if (!session_id) {
            return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
        }

        // 1. Fetch Session & Project
        const { data: session } = await supabase
            .from('practice_sessions')
            .select('*, projects(*)')
            .eq('id', session_id)
            .single();

        if (!session || session.user_id !== user.id) {
            return NextResponse.json({ error: 'Session not found or unauthorized' }, { status: 404 });
        }

        const project = session.projects;
        const analysis = project.analysis_json;

        // 2. Fetch Past Turns
        const { data: pastTurns } = await supabase
            .from('practice_turns')
            .select('*')
            .eq('session_id', session_id)
            .order('sequence', { ascending: true });

        const currentSequence = pastTurns ? pastTurns.length + 1 : 1;
        const pastQuestions = pastTurns ? pastTurns.map((t: any) => t.question) : [];

        let feedback = null;

        // 3. If user provided an answer, evaluate it against the LAST question
        if (answer && pastTurns && pastTurns.length > 0) {
            const lastTurn = pastTurns[pastTurns.length - 1];
            
            try {
                const isPracticeMode = session.mode === 'practice';
                feedback = await generateFeedback(analysis, lastTurn.question, answer, isPracticeMode);
                
                // Update the last turn with the answer and feedback
                await supabase
                    .from('practice_turns')
                    .update({ 
                        answer: answer, 
                        feedback_json: feedback 
                    })
                    .eq('id', lastTurn.id);

                // 3.5. Record any detected weakness
                if (feedback.weakness) {
                    await supabase.from('weaknesses').insert({
                        user_id: user.id,
                        project_id: session.project_id,
                        session_id: session_id,
                        topic: feedback.weakness.topic,
                        issue: feedback.weakness.issue,
                        severity: feedback.weakness.severity || 'medium'
                    });
                }
            } catch (err: any) {
                console.error('Feedback generation error:', err);
                return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 });
            }
        }

        // 4. Generate the NEXT question (if we haven't reached the limit, e.g., 5 questions)
        let nextQuestionData = null;
        if (currentSequence <= 5) {
            try {
                const isPracticeMode = session.mode === 'practice';
                nextQuestionData = await generateQuestion(analysis, pastQuestions, session.topic, isPracticeMode);
                
                // Insert new turn
                await supabase
                    .from('practice_turns')
                    .insert({
                        session_id: session_id,
                        sequence: currentSequence,
                        question: nextQuestionData.question,
                        evidence_json: {
                            evidence: nextQuestionData.evidence,
                            expected_concepts: nextQuestionData.expected_concepts,
                            difficulty: nextQuestionData.difficulty,
                            topic: nextQuestionData.topic
                        }
                    });
            } catch (err: any) {
                console.error('Question generation error:', err);
                return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
            }
        } else {
            // Mark session as completed
            await supabase
                .from('practice_sessions')
                .update({ status: 'completed', completed_at: new Date().toISOString() })
                .eq('id', session_id);
        }

        return NextResponse.json({
            feedback: feedback,
            nextQuestion: nextQuestionData,
            isComplete: currentSequence > 5
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
