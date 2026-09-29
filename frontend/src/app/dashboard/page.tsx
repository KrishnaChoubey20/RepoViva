"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FolderGit2, MessageSquare, Target, BarChart2, 
  ArrowRight, Plus, Loader2, Sparkles, AlertCircle, PlayCircle, Clock, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add project modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, sessRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/sessions')
        ]);
        if (projRes.ok) setProjects(await projRes.json());
        if (sessRes.ok) setSessions(await sessRes.json());
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newUrl.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL.');
      return;
    }
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: newUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze repository');
      
      router.push(`/dashboard/project/${data.project_id}?session_id=${data.session_id}`);
    } catch (err: any) {
      setError(err.message);
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Welcome Banner */}
      <div className="bg-[#fcfbf9] rounded-[32px] p-10 border border-cream-200 shadow-sm relative overflow-hidden flex items-center">
        <div className="relative z-10 md:w-1/2">
          <h1 className="text-gray-500 font-medium mb-1 text-base">Welcome back,</h1>
          <h2 className="text-4xl font-extrabold text-navy-900 mb-4 flex items-center gap-2">
            Krishna Choubey <span className="text-3xl inline-block">👋</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-sm text-base leading-relaxed">
            Turn your GitHub projects into real interview practice.<br/>
            Let's build your confidence, one project at a time.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#111827] hover:bg-black text-white px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add GitHub Repository
            </button>
            <button className="bg-white hover:bg-gray-50 text-[#111827] border border-gray-200 px-7 py-3 rounded-full font-semibold text-sm transition-all flex items-center gap-2 shadow-sm">
              <PlayCircle className="w-4 h-4 fill-black text-white" /> Watch Demo
            </button>
          </div>
        </div>
        
        {/* Right side illustration replica */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-end pr-10">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-green-50/50 rounded-full blur-3xl -z-10" />
            
            {/* The text floating box */}
            <div className="absolute left-10 top-16 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 shadow-sm border border-white flex gap-2">
               <Sparkles className="w-4 h-4 text-gray-400" />
               <div className="text-left leading-tight">
                 Better<br/>Interviews<br/>Brighter<br/>Future
               </div>
            </div>

            {/* The code floating box */}
            <div className="absolute right-8 top-12 bg-white/70 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white">
              <div className="flex gap-2 mb-2">
                <div className="w-8 h-2 bg-blue-100 rounded-full" />
                <div className="w-4 h-2 bg-blue-100 rounded-full" />
              </div>
              <div className="w-16 h-2 bg-indigo-100 rounded-full mb-2" />
              <div className="w-12 h-2 bg-purple-100 rounded-full" />
            </div>

            {/* Star decorations */}
            <div className="absolute right-32 bottom-20 text-gray-300">
               <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute left-20 bottom-16 text-gray-300">
               <Sparkles className="w-6 h-6" />
            </div>

            {/* Main Character Placeholder */}
            <div className="relative z-10 w-64 h-64">
               {/* 
                 Since we don't have the exact 3D asset from the image, 
                 we create a highly polished CSS representation of the laptop user
               */}
               <div className="absolute inset-x-0 bottom-0 h-32 bg-gray-100 rounded-t-full rounded-b-xl shadow-inner overflow-hidden flex items-end justify-center">
                  <div className="w-32 h-32 bg-gray-800 rounded-full translate-y-10" />
               </div>
               <div className="absolute inset-x-0 bottom-8 flex justify-center z-20">
                 <div className="w-36 h-24 bg-gray-200 border-b-4 border-gray-300 rounded-lg shadow-lg flex flex-col items-center pt-2">
                    <div className="w-32 h-20 bg-gray-800 rounded flex items-center justify-center">
                       <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>
                 </div>
               </div>
               <div className="absolute top-8 inset-x-0 flex justify-center z-0">
                  <div className="w-24 h-24 bg-gradient-to-b from-orange-100 to-orange-200 rounded-full shadow-sm border border-orange-50 flex items-center justify-center overflow-hidden">
                     <div className="w-24 h-10 bg-gray-800 absolute top-0 rounded-b-xl" />
                     <div className="w-3 h-3 bg-gray-800 rounded-full absolute top-10 left-6" />
                     <div className="w-3 h-3 bg-gray-800 rounded-full absolute top-10 right-6" />
                     <div className="w-6 h-3 bg-orange-300 rounded-full absolute top-14" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Your Projects */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-navy-900">Your Projects</h3>
              <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">View All</button>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-cream-200 rounded-2xl bg-cream-50">
                <FolderGit2 className="w-12 h-12 text-cream-300 mx-auto mb-3" />
                <h4 className="font-semibold text-navy-900">No projects yet</h4>
                <p className="text-sm text-navy-500 mt-1 mb-4">Add your first repository to get started</p>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="text-brand-600 font-semibold text-sm hover:underline"
                >
                  + Add Project
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0,3).map(p => (
                  <div key={p.id} className="border border-cream-200 rounded-[24px] p-6 bg-white shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                           <GithubIcon className="w-8 h-8 text-navy-900" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl text-navy-900 mb-1">
                            {p.repo_name}
                          </h4>
                          <a href={p.repo_url} target="_blank" className="text-sm text-gray-500 hover:text-brand-600 flex items-center gap-1.5 mb-4">
                            {p.repo_url} <ArrowRight className="w-3 h-3 -rotate-45" />
                          </a>
                          
                          <div className="inline-flex items-center bg-[#eefcf2] text-[#16a34a] px-3 py-1 rounded-md text-xs font-semibold mb-4">
                            Analysis Completed
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mb-5 leading-relaxed max-w-2xl pr-8">
                            {p.analysis_json?.project_summary || "No summary available."}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {p.analysis_json?.languages?.slice(0,3).map((l: string) => (
                              <span key={l} className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"/>{l}</span>
                            ))}
                            {p.analysis_json?.frameworks?.slice(0,2).map((f: string) => (
                              <span key={f} className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/>{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Link 
                          href={`/dashboard/project/${p.id}`}
                          className="bg-[#111827] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
                        >
                          Start Interview <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center">
                          <span className="text-xl leading-none -mt-2">⋮</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-8 border-t border-gray-100 pt-4 mt-2">
                       <button className="text-sm font-semibold text-brand-600 border-b-2 border-brand-600 pb-2 -mb-4">Overview</button>
                       <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-2">Key Files</button>
                       <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-2">Architecture</button>
                       <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-2">Tech Stack</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start New Interview */}
            <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-navy-900 mb-2">Start a New Interview</h3>
              <p className="text-sm text-navy-500 mb-6">Choose your project and begin your AI-powered interview session.</p>
              
              <div className="flex-1 border border-cream-200 rounded-xl p-4 flex flex-col justify-between bg-cream-50/50">
                {projects.length > 0 ? (
                  <>
                     <div className="bg-white border border-cream-200 rounded-lg p-3 flex justify-between items-center cursor-pointer mb-4">
                       <div className="flex items-center gap-2">
                         <GithubIcon className="w-4 h-4 text-navy-500" />
                         <span className="font-semibold text-sm text-navy-900">{projects[0].repo_name}</span>
                       </div>
                       <ChevronDownIcon className="w-4 h-4 text-navy-400" />
                     </div>
                     <div className="flex gap-2 mb-6">
                        <span className="text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1.5 rounded-lg flex-1 text-center">Project Based</span>
                        <span className="text-xs font-semibold bg-white border border-cream-200 text-navy-600 px-3 py-1.5 rounded-lg flex-1 text-center opacity-50">Architecture</span>
                     </div>
                     <Link href={`/dashboard/project/${projects[0].id}`} className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                       Start Interview <ArrowRight className="w-4 h-4" />
                     </Link>
                  </>
                ) : (
                  <div className="text-center my-auto">
                    <p className="text-sm text-navy-500 mb-4">Add a project first</p>
                    <button onClick={() => setShowAddModal(true)} className="text-brand-600 font-semibold text-sm hover:underline">+ Add Repository</button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Try Practice Question */}
            <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-navy-900 mb-2">Try a Practice Question</h3>
              <p className="text-sm text-navy-500 mb-6">Answer the question and get AI feedback.</p>
              
              <div className="flex-1 bg-brand-50/50 border border-brand-100 rounded-xl p-5 flex flex-col">
                {projects.length > 0 ? (
                   <>
                     <div className="flex items-center gap-1 text-xs font-semibold text-brand-600 mb-3">
                       <Sparkles className="w-3 h-3" /> From: {projects[0].repo_name}
                     </div>
                     <p className="text-sm text-navy-900 font-medium mb-6 leading-relaxed">
                       "Can you explain the main architectural flow of this project as configured in your source files?"
                     </p>
                     <Link href={`/dashboard/project/${projects[0].id}`} className="mt-auto bg-white hover:bg-cream-50 border border-brand-200 text-brand-700 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                       <PlayCircle className="w-4 h-4" /> Start Practice
                     </Link>
                   </>
                ) : (
                   <div className="text-center my-auto text-sm text-navy-500">
                     <Target className="w-8 h-8 mx-auto text-brand-300 mb-2" />
                     Available after you add a project
                   </div>
                )}
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Sidebar Stats) */}
        <div className="space-y-6">
          
          {/* Readiness Score */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm flex items-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e8e8e2" strokeWidth="3" />
                  <path strokeDasharray={`${sessions.length > 0 ? '60' : '0'}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" className="transition-all duration-1000" strokeLinecap="round" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold text-navy-900">{sessions.length > 0 ? '60%' : '0%'}</span>
               </div>
            </div>
            <div>
              <h3 className="font-bold text-navy-900 mb-1">Interview Readiness</h3>
              <p className="text-xs text-navy-500 leading-relaxed">
                {sessions.length > 0 ? "You're on a good path! Keep practicing to improve your score." : "Start practicing to build your readiness score."}
              </p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-cream-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <FolderGit2 className="w-5 h-5 text-brand-500 mb-3" />
              <div className="text-2xl font-bold text-navy-900">{projects.length}</div>
              <div className="text-xs text-navy-500 mt-1">Projects Analyzed</div>
            </div>
            <div className="bg-white border border-cream-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <MessageSquare className="w-5 h-5 text-purple-500 mb-3" />
              <div className="text-2xl font-bold text-navy-900">{sessions.length}</div>
              <div className="text-xs text-navy-500 mt-1">Interviews Completed</div>
            </div>
            <div className="bg-white border border-cream-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <Target className="w-5 h-5 text-amber-500 mb-3" />
              <div className="text-2xl font-bold text-navy-900">{sessions.length * 2}</div>
              <div className="text-xs text-navy-500 mt-1">Practice Sessions</div>
            </div>
            <div className="bg-white border border-cream-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <BarChart2 className="w-5 h-5 text-green-500 mb-3" />
              <div className="text-2xl font-bold text-navy-900">{sessions.length > 0 ? '78%' : '-'}</div>
              <div className="text-xs text-navy-500 mt-1">Average Score</div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-navy-900">Recent Activity</h3>
              <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">View All</button>
            </div>
            
            <div className="space-y-6">
              {projects.length === 0 ? (
                <div className="text-sm text-navy-500 text-center py-4">No recent activity</div>
              ) : (
                <>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">Project analyzed successfully</p>
                      <p className="text-xs text-navy-500">{projects[0].repo_name}</p>
                    </div>
                    <div className="ml-auto text-xs text-navy-400">Just now</div>
                  </div>
                  {sessions.length > 0 && (
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                          <MessageSquare className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-900">Interview completed</p>
                          <p className="text-xs text-navy-500">AI Project Interview</p>
                        </div>
                        <div className="ml-auto text-xs text-navy-400">2 hrs ago</div>
                      </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Your Progress */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-navy-900">Your Progress</h3>
              <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">View Details</button>
            </div>
            
            {sessions.length === 0 ? (
               <div className="text-sm text-navy-500 text-center py-4 bg-cream-50 rounded-xl border border-cream-100">
                 Complete a practice session to see your progress across skills.
               </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-navy-700">Technical Knowledge</span>
                    <span className="text-navy-900">75%</span>
                  </div>
                  <div className="w-full bg-cream-100 rounded-full h-1.5"><div className="bg-brand-500 h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-navy-700">Project Explanation</span>
                    <span className="text-navy-900">68%</span>
                  </div>
                  <div className="w-full bg-cream-100 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '68%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-navy-700">Problem Solving</span>
                    <span className="text-navy-900">62%</span>
                  </div>
                  <div className="w-full bg-cream-100 rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '62%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-navy-700">Communication</span>
                    <span className="text-navy-900">70%</span>
                  </div>
                  <div className="w-full bg-cream-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '70%' }}></div></div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-cream-200 relative"
          >
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-navy-400 hover:text-navy-900">
               ✕
            </button>
            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
              <GithubIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Analyze a Repository</h2>
            <p className="text-sm text-navy-500 mb-6">Paste a public GitHub repository URL to generate your project map and practice questions.</p>
            
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <input
                  type="url"
                  placeholder="https://github.com/owner/repo"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  disabled={analyzing}
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl py-3 px-4 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                  required
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={analyzing || !newUrl}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl py-3 px-4 font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing project files...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Project Map</span>
                  </>
                )}
              </button>
              <p className="text-xs text-center text-navy-400">
                Only public repositories. We do not execute code.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function GithubIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
