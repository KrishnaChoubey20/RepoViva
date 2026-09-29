import { NextRequest, NextResponse } from 'next/server';
import { parseGithubUrl, fetchRepositoryData } from '@/lib/github';
import { analyzeProject } from '@/lib/openrouter';
import { saveProject, createSession } from '@/lib/store';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { repo_url } = body;

        if (!repo_url) {
            return NextResponse.json({ error: 'repo_url is required' }, { status: 400 });
        }

        const repoInfo = parseGithubUrl(repo_url);
        if (!repoInfo) {
            return NextResponse.json({ error: 'Invalid GitHub repository URL' }, { status: 400 });
        }

        // Fetch from GitHub
        let repoData;
        try {
            repoData = await fetchRepositoryData(repoInfo.owner, repoInfo.repo);
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to retrieve repository. Ensure it is public and exists.' }, { status: 404 });
        }

        // Analyze with OpenRouter
        let analysis;
        try {
            analysis = await analyzeProject(repoData.metadata, repoData.files);
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to analyze project: ' + err.message }, { status: 500 });
        }

        // Save to Database / In-Memory
        const project = await saveProject({
            repo_url,
            repo_owner: repoInfo.owner,
            repo_name: repoInfo.repo,
            analysis_json: analysis
        });

        const session = await createSession(project.id);

        return NextResponse.json({
            project_id: project.id,
            session_id: session.id,
            analysis: analysis
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
