import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function NewInterviewPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; topic?: string; mode?: string }>;
}) {
  const unwrappedParams = await searchParams;
  const project = unwrappedParams.project;
  const topic = unwrappedParams.topic;
  const mode = unwrappedParams.mode || 'chat';
  
  if (!project) {
    redirect('/projects');
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('practice_sessions')
    .insert({
      user_id: user.id,
      project_id: project,
      mode: mode,
      topic: topic || null,
      status: 'started',
      started_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error || !data) {
    console.error('Failed to create session:', error);
    redirect('/projects');
  }

  redirect(`/interviews/${data.id}`);
}
