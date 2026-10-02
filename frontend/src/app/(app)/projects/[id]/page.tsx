"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Play, ArrowLeft, Loader2, Lightbulb, FileCode, Construction } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function ProjectAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    async function loadProject() {
      const supabase = createClient();
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      setProject(data);
      setLoading(false);
    }
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Project not found</h1>
        <Link href="/projects" className="text-[#4F46E5] hover:underline">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      
      {/* Back link */}
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">{project.name || project.repo_name}</h1>
          <p className="text-[14px] text-[#64748B] mt-1 mb-3">{project.repo_url.replace('https://', '')}</p>
          <div className="flex items-center gap-1.5 text-[13px] text-[#0F172A] font-medium bg-[#F8F6F1] px-3 py-1 rounded-[8px] w-fit border border-[#E7E5E4]">
            <div className={`w-2 h-2 rounded-full ${project.analysis_status === 'completed' ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'}`} />
            {project.analysis_status === 'completed' ? 'Analysis complete' : 'Processing...'}
          </div>
        </div>
        <Link 
          href={`/interviews/new?project=${project.id}`}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
        >
          <Play className="w-4 h-4 fill-white" /> Start Interview
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Project Overview */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-3">Project Overview</h2>
            <div className="text-[14px] text-[#0F172A] leading-relaxed whitespace-pre-wrap">
              {project.analysis_json?.project_summary || project.description || "No description provided for this repository."}
            </div>
            {project.analysis_json?.purpose && (
              <div className="mt-4 pt-4 border-t border-[#E7E5E4]">
                <h3 className="text-[14px] font-semibold text-[#0F172A] mb-2">Purpose</h3>
                <p className="text-[14px] text-[#64748B]">{project.analysis_json.purpose}</p>
              </div>
            )}
          </section>

          {/* Section 2: Architecture */}
          {project.analysis_json?.architecture && (
            <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0F172A] mb-3">Architecture</h2>
              <div className="mb-4">
                <span className="bg-[#EEF0FF] text-[#4F46E5] px-3 py-1 rounded-full text-[13px] font-semibold">
                  {project.analysis_json.architecture.pattern}
                </span>
              </div>
              <p className="text-[14px] text-[#0F172A] leading-relaxed">
                {project.analysis_json.architecture.description}
              </p>
            </section>
          )}

          {/* Section 3: Tech Stack & DB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.analysis_json?.tech_stack && (
              <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
                <h2 className="text-[16px] font-semibold text-[#0F172A] mb-3">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.analysis_json.tech_stack.map((tech: string) => (
                    <span key={tech} className="bg-[#F8F6F1] border border-[#E7E5E4] text-[#0F172A] px-3 py-1 rounded-[8px] text-[13px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {project.analysis_json?.database && (
              <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
                <h2 className="text-[16px] font-semibold text-[#0F172A] mb-3">Database</h2>
                <div className="mb-2 text-[14px] font-medium text-[#0F172A]">{project.analysis_json.database.type}</div>
                <p className="text-[13px] text-[#64748B]">{project.analysis_json.database.schema_summary}</p>
              </section>
            )}
          </div>

          {/* Section 4: AI Project Insights */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#F59E0B]" /> AI Analysis Evidence
            </h2>
            <div className="space-y-4">
              {project.analysis_json?.evidence && project.analysis_json.evidence.length > 0 ? (
                project.analysis_json.evidence.map((ev: any, idx: number) => (
                  <div key={idx} className="bg-[#F8F6F1] border border-[#E7E5E4] p-4 rounded-[12px]">
                    <h3 className="font-semibold text-[#0F172A] text-[14px] mb-1">{ev.claim}</h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed">Source: {ev.source?.file || JSON.stringify(ev.source)}</p>
                  </div>
                ))
              ) : (
                <div className="bg-[#F8F6F1] border border-[#E7E5E4] p-4 rounded-[12px]">
                  <p className="text-[13px] text-[#0F172A] leading-relaxed">No specific evidence recorded yet.</p>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Start Interview CTA */}
          <section className="bg-[#EEF0FF] border border-[#4F46E5]/20 rounded-[18px] p-8 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-[12px] bg-[#FFFFFF] flex items-center justify-center mb-4 text-[#4F46E5] shadow-sm">
              <Play className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Ready to practice?</h2>
            <p className="text-[14px] text-[#64748B] mb-6">
              Start a project-specific interview based on your repository.
            </p>
            <div className="flex flex-col w-full gap-3">
              <Link 
                href={`/interviews/new?project=${project.id}`}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center justify-center gap-2 w-full"
              >
                <Play className="w-4 h-4 fill-white" /> Start Interview
              </Link>
              <Link 
                href={`/projects/${project.id}/ask`}
                className="bg-[#FFFFFF] hover:bg-[#F8F6F1] text-[#4F46E5] border border-[#E7E5E4] px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center justify-center gap-2 w-full"
              >
                Ask AI Assistant
              </Link>
            </div>
          </section>

          {/* Key Interview Topics */}
          {project.analysis_json?.interview_topics && (
            <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#4F46E5]" /> Challenge Me
              </h2>
              <p className="text-[13px] text-[#64748B] mb-4">
                Select a specific topic below to start a targeted interview focused exclusively on that area.
              </p>
              <div className="flex flex-wrap gap-2">
                {project.analysis_json.interview_topics.map((topic: string) => (
                  <Link 
                    key={topic} 
                    href={`/interviews/new?project=${project.id}&topic=${encodeURIComponent(topic)}`}
                    className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E7E5E4] text-[#4F46E5] hover:bg-[#EEF0FF] hover:border-[#4F46E5]/30 px-3 py-1.5 rounded-[8px] text-[13px] font-medium shadow-sm transition-colors"
                  >
                    <FileCode className="w-3.5 h-3.5" /> {topic}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Risks & Strengths */}
          {(project.analysis_json?.risks || project.analysis_json?.strengths) && (
            <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0F172A] mb-4">Project Evaluation</h2>
              {project.analysis_json?.strengths && (
                <div className="mb-4">
                  <h3 className="text-[13px] font-bold text-[#22C55E] mb-2 uppercase">Strengths</h3>
                  <ul className="text-[13px] text-[#0F172A] space-y-1 list-disc pl-4">
                    {project.analysis_json.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
              {project.analysis_json?.risks && (
                <div>
                  <h3 className="text-[13px] font-bold text-[#F59E0B] mb-2 uppercase">Potential Risks</h3>
                  <ul className="text-[13px] text-[#0F172A] space-y-1 list-disc pl-4">
                    {project.analysis_json.risks.map((r: string, i: number) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
            </section>
          )}

        </div>

      </div>
    </div>
  );
}
