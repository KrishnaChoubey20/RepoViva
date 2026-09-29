import { NextRequest, NextResponse } from 'next/server';
import { getProject } from '@/lib/store';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const project = await getProject(id);
        
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
