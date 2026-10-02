"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Folder, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function AssistantPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (data) {
        setProjects(data);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-7 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">AI Assistant</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl">
            Select a repository below to ask instant questions about architecture, code flows, or potential issues.
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {loading ? (
          <div className="col-span-1 md:col-span-2 flex items-center justify-center p-12 bg-white rounded-[18px] border border-[#E7E5E4]">
            <Loader2 className="w-6 h-6 animate-spin text-[#4F46E5]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-1 md:col-span-2 bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h3 className="font-semibold text-[#0F172A] text-[16px] mb-2">No projects available</h3>
            <p className="text-[14px] text-[#64748B] mb-6">Add a GitHub repository in the Projects tab to chat with the AI.</p>
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
                  href={`/projects/${project.id}/ask`}
                  className="flex-1 bg-[#4F46E5] text-white hover:bg-[#4338CA] py-2.5 rounded-[10px] text-[13px] font-semibold text-center transition-colors border border-transparent flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4" /> Start AI Chat
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
