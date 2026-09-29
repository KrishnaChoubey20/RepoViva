import { NextResponse } from 'next/server';
import { listSessions } from '@/lib/store';

export async function GET() {
    try {
        const sessions = await listSessions();
        return NextResponse.json(sessions);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
