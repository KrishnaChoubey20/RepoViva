"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, ArrowRight, Folder, Loader2, Sparkles, Code2, 
  PlayCircle, BookOpen, Clock, Activity, Target
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
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

const mockRecentActivity = [
  {
    label: "ProofPay analyzed",
    time: "2 hours ago"
  },
  {
    label: "Completed technical interview",
    time: "Yesterday"
  },
  {
    label: "Practiced architecture questions",
    time: "2 days ago"
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setAnalyzing(true);
    // Simulate analyzing then redirect
    setTimeout(() => {
      router.push(`/dashboard/project/mock-id`);
    }, 1500);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-7 pb-20">
      
      {/* 1. Welcome Card */}
      <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        {/* Subtle background treatment */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-[#EEF0FF]/40 pointer-events-none" />
        
        <div className="relative z-10 w-full md:w-3/5 space-y-4">
          <h1 className="text-3xl font-bold text-[#0F172A]">Welcome back, Krishna 👋</h1>
          <p className="text-[15px] text-[#64748B] max-w-md leading-relaxed">
            Analyze your project, practice interviews, and improve how you explain your code.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add GitHub Repository
            </button>
            <Link href="/projects" className="text-[#4F46E5] font-semibold text-[14px] hover:underline flex items-center gap-1.5">
              View Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative z-10 hidden md:block w-2/5 h-40 flex items-center justify-end pr-4">
           {/* Soft decorative elements */}
           <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#EEF0FF] rounded-full blur-2xl -z-10" />
           <div className="relative bg-white border border-[#E7E5E4] rounded-[14px] shadow-sm p-4 w-48 rotate-3 transition-transform hover:rotate-0">
              <div className="flex items-center gap-2 mb-3">
                <GithubIcon className="w-5 h-5 text-[#0F172A]" />
                <div className="h-2 w-16 bg-[#EEF0FF] rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-[#F8F6F1] rounded-full" />
                <div className="h-2 w-3/4 bg-[#F8F6F1] rounded-full" />
              </div>
           </div>
           <Sparkles className="absolute top-4 right-20 w-5 h-5 text-[#4F46E5]/40" />
        </div>
      </section>

      {/* 2. Your Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[17px] font-semibold text-[#0F172A]">Your Projects</h2>
          <Link href="/projects" className="text-[14px] text-[#64748B] hover:text-[#0F172A] font-medium flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  href={`/dashboard/project/${project.id}`}
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
      </section>

      {/* 3 & 4. Interview Readiness & Continue Practice */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Interview Readiness */}
        <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm flex flex-col justify-between">
          <h2 className="text-[15px] font-semibold text-[#0F172A] mb-5">Interview Readiness</h2>
          <div className="flex items-center gap-5 flex-1">
            <div className="relative w-[72px] h-[72px] shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#F8F6F1]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-[#4F46E5]" strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-[#0F172A]">
                72%
              </div>
            </div>
            <div>
              <p className="text-[14px] text-[#0F172A] font-medium leading-snug mb-1">You're getting better at explaining your project.</p>
              <p className="text-[13px] text-[#64748B]">Next focus: Architecture</p>
            </div>
          </div>
          <div className="mt-5">
            <Link href="/practice" className="inline-block bg-[#F8F6F1] border border-[#E7E5E4] text-[#0F172A] hover:bg-[#EEF0FF] hover:border-[#4F46E5]/20 hover:text-[#4F46E5] px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
              Practice now
            </Link>
          </div>
        </div>

        {/* Continue Practice */}
        <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm flex flex-col justify-between">
          <h2 className="text-[15px] font-semibold text-[#0F172A] mb-5">Continue where you left off</h2>
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-[10px] bg-[#EEF0FF] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] text-[15px]">ProofPay — Architecture Practice</h3>
              <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">You struggled explaining database flow in your last session.</p>
            </div>
          </div>
          <div className="mt-5">
            <Link href="/practice/continue" className="inline-block bg-[#4F46E5] text-white hover:bg-[#4338CA] px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
              Continue Practice
            </Link>
          </div>
        </div>

      </section>

      {/* 5. Recent Activity */}
      <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E7E5E4]">
           <h2 className="text-[15px] font-semibold text-[#0F172A]">Recent Activity</h2>
        </div>
        <div className="divide-y divide-[#E7E5E4]">
          {mockRecentActivity.map((activity, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-[#F8F6F1]/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F8F6F1] border border-[#E7E5E4] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-[#64748B]" />
                </div>
                <span className="text-[14px] text-[#0F172A] font-medium">{activity.label}</span>
              </div>
              <span className="text-[13px] text-[#64748B]">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Add Repository Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-[20px] p-8 max-w-md w-full shadow-lg border border-[#E7E5E4] animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Add GitHub Repository</h3>
            <p className="text-[#64748B] text-[14px] mb-6">Paste a public GitHub repository to analyze your project.</p>
            
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
                  {analyzing ? 'Analyzing repository...' : 'Analyze Project'}
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
