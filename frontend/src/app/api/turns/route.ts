import { NextRequest, NextResponse } from 'next/server';
import { listTurns } from '@/lib/store';

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.nextUrl.searchParams.get('session_id') || undefined;
        const turns = await listTurns(sessionId);
        return NextResponse.json(turns);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
