"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, ArrowRight, Folder, Loader2, Sparkles, Activity, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';



export default function Dashboard() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
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

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    
    setAnalyzing(true);
    setError('');
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: newUrl })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze project');
      }
      
      router.push(`/projects/${data.project_id}`);
    } catch (err: any) {
      setError(err.message);
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-7 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      
      {/* 1. Welcome Card */}
      <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        {/* Subtle background treatment */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-[#EEF0FF]/40 pointer-events-none" />
        
        <div className="relative z-10 w-full md:w-3/5 space-y-4">
          <h1 className="text-3xl font-bold text-[#0F172A]">Welcome to your workspace 👋</h1>
          <p className="text-[15px] text-[#64748B] max-w-md leading-relaxed">
            Analyze your project, practice interviews, and improve how you explain your code.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-all shadow-sm hover:shadow-md flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Add GitHub Repository
            </button>
            <Link href="/projects" className="text-[#4F46E5] font-semibold text-[14px] hover:underline flex items-center gap-1.5 transition-all">
              View Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative z-10 hidden md:block w-2/5 h-40 flex items-center justify-end pr-4 group">
           {/* Soft decorative elements */}
           <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#EEF0FF] rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700" />
           <div className="relative bg-white border border-[#E7E5E4] rounded-[14px] shadow-sm p-4 w-48 rotate-3 transition-all duration-500 group-hover:rotate-0 group-hover:scale-105 group-hover:shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <GithubIcon className="w-5 h-5 text-[#0F172A]" />
                <div className="h-2 w-16 bg-[#EEF0FF] rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-[#F8F6F1] rounded-full" />
                <div className="h-2 w-3/4 bg-[#F8F6F1] rounded-full" />
              </div>
           </div>
           <Sparkles className="absolute top-4 right-20 w-5 h-5 text-[#4F46E5]/40 animate-pulse" />
        </div>
      </section>

      {/* 2. Your Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[17px] font-semibold text-[#0F172A]">Your Projects</h2>
          <Link href="/projects" className="text-[14px] text-[#64748B] hover:text-[#0F172A] font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12 bg-white rounded-[18px] border border-[#E7E5E4]">
            <Loader2 className="w-6 h-6 animate-spin text-[#4F46E5]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
              <Folder className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h3 className="font-semibold text-[#0F172A] text-[16px] mb-2">No projects yet</h3>
            <p className="text-[14px] text-[#64748B] mb-6">Add your first GitHub repository to start analyzing.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-all hover:bg-[#4338CA] mx-auto flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Repository
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map(project => (
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

                <div className="flex items-center justify-between mb-6 border-b border-[#E7E5E4] pb-4">
                  <div className="flex items-center gap-1.5 text-[13px] text-[#0F172A] font-medium">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    {project.analysis_status === 'completed' ? 'Analysis complete' : 'Processing...'}
                  </div>
                  <div className="text-[13px] text-[#64748B] font-medium">
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="flex-1 bg-[#FFFFFF] border border-[#E7E5E4] text-[#0F172A] hover:bg-[#F8F6F1] py-2 rounded-[10px] text-[13px] font-semibold text-center transition-colors"
                  >
                    View Analysis
                  </Link>
                  <Link 
                    href={`/interviews/new?project=${project.id}`}
                    className="flex-1 bg-[#4F46E5] text-white hover:bg-[#4338CA] py-2 rounded-[10px] text-[13px] font-semibold text-center transition-colors border border-transparent"
                  >
                    Start Interview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Repository Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-[20px] p-8 max-w-md w-full shadow-lg border border-[#E7E5E4] animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Add GitHub Repository</h3>
            <p className="text-[#64748B] text-[14px] mb-6">Paste a public GitHub repository to analyze your project.</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
            <form onSubmit={handleAnalyze}>
              <div className="mb-6">
                <input 
                  type="url" 
                  placeholder="https://github.com/username/repository"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] px-4 py-3 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                  required
                />
              </div>
              
              <div className="flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setError('');
                  }}
                  disabled={analyzing}
                  className="px-5 py-2.5 rounded-[12px] text-[#64748B] font-semibold text-[14px] hover:bg-[#F8F6F1] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={analyzing}
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {analyzing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {analyzing ? 'Analyzing...' : 'Analyze Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
