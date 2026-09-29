import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/store';

export async function GET() {
    try {
        const projects = await listProjects();
        return NextResponse.json(projects);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
