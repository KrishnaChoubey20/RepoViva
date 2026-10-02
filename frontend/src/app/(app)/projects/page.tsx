"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, ArrowRight, Folder, Loader2 
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function ProjectsPage() {
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
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">My Projects</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl">
            Your GitHub projects, analyzed and ready for interview practice.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-all shadow-sm hover:shadow-md flex items-center gap-2 shrink-0 hover:-translate-y-0.5 animate-in fade-in slide-in-from-right-4 duration-500 delay-150 fill-mode-both"
        >
          <Plus className="w-4 h-4" /> Add GitHub Repository
        </button>
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
          ))
        )}
      </div>

      {/* Add Repository Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-[20px] p-8 max-w-md w-full shadow-lg border border-[#E7E5E4] animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Add your GitHub repository</h3>
            <p className="text-[#64748B] text-[14px] mb-6">RepoViva will analyze your project and create personalized interview questions.</p>
            
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
                  {analyzing ? 'Analyzing Repository...' : 'Analyze Repository'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
