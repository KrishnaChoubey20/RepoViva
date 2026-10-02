"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Folder, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function PracticePage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [weaknesses, setWeaknesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      
      const { data: projData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (projData) {
        setProjects(projData);
      }

      const { data: weakData } = await supabase
        .from('weaknesses')
        .select('*, projects(name, repo_name)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (weakData) {
        setWeaknesses(weakData);
      }

      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-7 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Practice Mode</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl">
            Targeted AI mentoring sessions to improve on your project's weakest architectural areas.
          </p>
        </div>
      </div>

      {/* Weaknesses Section */}
      {!loading && weaknesses.length > 0 && (
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-[18px] font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Your Weakest Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weaknesses.map(weakness => (
              <div key={weakness.id} className="bg-[#FFFFFF] border border-[#FCA5A5] rounded-[16px] p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-[#0F172A] text-[15px]">{weakness.topic}</h3>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[6px] ${
                    weakness.severity === 'high' ? 'bg-[#FEE2E2] text-[#EF4444]' : 
                    weakness.severity === 'medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' : 
                    'bg-[#F3F4F6] text-[#6B7280]'
                  }`}>
                    {weakness.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-[13px] text-[#64748B] mb-3 line-clamp-2">{weakness.issue}</p>
                <div className="text-[12px] text-[#94A3B8] mb-4 flex items-center gap-1">
                  <Folder className="w-3.5 h-3.5" /> {weakness.projects?.name || weakness.projects?.repo_name || 'Project'}
                </div>
                <Link 
                  href={`/interviews/new?project=${weakness.project_id}&topic=${encodeURIComponent(weakness.topic)}&mode=practice`}
                  className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-2 rounded-[8px] text-[13px] font-semibold text-center transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" /> Practice Topic
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project List */}
      <div>
        <h2 className="text-[18px] font-bold text-[#0F172A] mb-4">Practice by Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {loading ? (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center p-12 bg-white rounded-[18px] border border-[#E7E5E4]">
              <Loader2 className="w-6 h-6 animate-spin text-[#4F46E5]" />
            </div>
          ) : projects.length === 0 ? (
          <div className="col-span-1 md:col-span-2 bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h3 className="font-semibold text-[#0F172A] text-[16px] mb-2">No projects available for practice</h3>
            <p className="text-[14px] text-[#64748B] mb-6">Add a GitHub repository in the Projects tab first.</p>
            <Link 
              href="/projects"
              className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-all hover:bg-[#4338CA] mx-auto inline-flex items-center gap-2"
            >
              Go to Projects
            </Link>
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-default">
              
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center shrink-0">
                  <Folder className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#0F172A] text-[16px] truncate">{project.name || project.repo_name}</h3>
                  <p className="text-[13px] text-[#64748B] truncate mt-0.5">{project.repo_url.replace('https://', '')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/interviews/new?project=${project.id}&mode=practice`}
                  className="flex-1 bg-[#22C55E] text-white hover:bg-[#16A34A] py-2.5 rounded-[10px] text-[13px] font-semibold text-center transition-colors border border-transparent flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" /> Start AI Practice Agent
                </Link>
              </div>
            </div>
          ))
        )}
        </div>
      </div>

    </div>
  );
}
