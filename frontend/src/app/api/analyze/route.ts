import { NextRequest, NextResponse } from 'next/server';
import { parseGithubUrl, fetchRepositoryData } from '@/lib/github';
import { analyzeProject } from '@/lib/openrouter';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { repo_url } = body;

        if (!repo_url) {
            return NextResponse.json({ error: 'repo_url is required' }, { status: 400 });
        }

        const repoInfo = parseGithubUrl(repo_url);
        if (!repoInfo) {
            return NextResponse.json({ error: 'Invalid GitHub repository URL' }, { status: 400 });
        }

        // Check if project exists for user
        const { data: existingProject } = await supabase
            .from('projects')
            .select('id, repo_sha, analysis_json')
            .eq('user_id', user.id)
            .eq('repo_owner', repoInfo.owner)
            .eq('repo_name', repoInfo.repo)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // Fetch from GitHub
        let repoData;
        try {
            repoData = await fetchRepositoryData(repoInfo.owner, repoInfo.repo);
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to retrieve repository. Ensure it is public and exists.' }, { status: 404 });
        }

        const currentSha = repoData.metadata.commit_sha;

        // If repository has not changed since last analysis
        if (existingProject && existingProject.repo_sha === currentSha && existingProject.analysis_json) {
            return NextResponse.json({
                project_id: existingProject.id,
                analysis: existingProject.analysis_json,
                message: "Your repository has not changed since the last analysis."
            });
        }

        // Analyze with OpenRouter
        let analysis;
        try {
            analysis = await analyzeProject(repoData.metadata, repoData.files);
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to analyze project: ' + err.message }, { status: 500 });
        }

        // Save to Database
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .insert({
                user_id: user.id,
                repo_url,
                repo_owner: repoInfo.owner,
                repo_name: repoInfo.repo,
                name: repoData.metadata.name,
                description: repoData.metadata.description,
                default_branch: repoData.metadata.default_branch,
                repo_sha: currentSha,
                analysis_status: 'completed',
                analysis_json: analysis
            })
            .select()
            .single();

        if (projectError || !project) {
            console.error('Project save error:', projectError);
            return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
        }

        // Save project files
        const filesToInsert = Object.entries(repoData.files).map(([path, content]) => ({
            project_id: project.id,
            path: path,
            size: Buffer.byteLength(content as string, 'utf8'),
            language: path.split('.').pop() || 'unknown',
            content_hash: 'raw' // Simplified for MVP
        }));

        if (filesToInsert.length > 0) {
            const { error: filesError } = await supabase
                .from('project_files')
                .insert(filesToInsert);
            
            if (filesError) {
                console.error('Files save error:', filesError);
            }
        }

        return NextResponse.json({
            project_id: project.id,
            analysis: analysis,
            message: existingProject ? "Repository changes detected. Analysis updated." : "Repository analyzed successfully."
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
