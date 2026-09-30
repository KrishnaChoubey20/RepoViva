"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, ArrowRight, Folder, Loader2 
} from 'lucide-react';
import Link from 'next/link';

const mockProjects = [
  {
    id: "proofpay",
    name: "ProofPay",
    repo: "github.com/krishna/proofpay",
    technologies: ["Next.js", "Supabase", "TypeScript"],
    status: "Analysis complete",
    readiness: 72
  },
  {
    id: "dev-portfolio",
    name: "Dev Portfolio",
    repo: "github.com/krishna/dev-portfolio",
    technologies: ["Next.js", "Tailwind", "Framer Motion"],
    status: "Analysis complete",
    readiness: 64
  }
];

export default function ProjectsPage() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setAnalyzing(true);
    setLoadingStep(1); // Connecting to repository...
    setTimeout(() => {
      setLoadingStep(2); // Analyzing project...
      setTimeout(() => {
        setLoadingStep(3); // Building interview questions...
        setTimeout(() => {
          router.push(`/projects/mock-id`);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-7 pb-20">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">My Projects</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl">
            Your GitHub projects, analyzed and ready for interview practice.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add GitHub Repository
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {mockProjects.map(project => (
          <div key={project.id} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center shrink-0">
                <Folder className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-[#0F172A] text-[16px] truncate">{project.name}</h3>
                <p className="text-[13px] text-[#64748B] truncate mt-0.5">{project.repo}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map(tech => (
                <span key={tech} className="bg-[#F8F6F1] border border-[#E7E5E4] text-[#64748B] text-[12px] px-2.5 py-1 rounded-[8px] font-medium">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6 border-b border-[#E7E5E4] pb-4">
              <div className="flex items-center gap-1.5 text-[13px] text-[#0F172A] font-medium">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                {project.status}
              </div>
              <div className="text-[13px] text-[#64748B] font-medium">
                {project.readiness}% ready
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

      {/* Add Repository Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-[20px] p-8 max-w-md w-full shadow-lg border border-[#E7E5E4] animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Add your GitHub repository</h3>
            <p className="text-[#64748B] text-[14px] mb-6">RepoViva will analyze your project and create personalized interview questions.</p>
            
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
                  onClick={() => setShowAddModal(false)}
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
                  {analyzing && loadingStep === 1 ? 'Connecting to repository...' :
                   analyzing && loadingStep === 2 ? 'Analyzing project...' :
                   analyzing && loadingStep === 3 ? 'Building interview questions...' : 
                   'Analyze Repository'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
