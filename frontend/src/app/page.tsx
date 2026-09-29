'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, GitBranch, Menu, Mic, Play, Sparkles, Target, X, BarChart3, Brain, MessageCircle, Link2, ShieldCheck, Rocket, Code2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const features = [
  { icon: GitBranch, title: 'GitHub Integration', copy: 'Simply paste your repository URL and let RepoViva analyze your project structure and codebase.', tone: 'blue' },
  { icon: Sparkles, title: 'AI Project Analysis', copy: 'Get a detailed summary of your project, including key files, technologies, and architecture.', tone: 'peach' },
  { icon: MessageCircle, title: 'Smart Interview Questions', copy: 'Receive project-specific questions with evidence from your code.', tone: 'green' },
  { icon: Mic, title: 'Text & Voice Practice', copy: 'Practice your answers with real-time feedback and improvement tips.', tone: 'purple' },
  { icon: BarChart3, title: 'Track Progress', copy: 'Monitor your performance and see where you can improve.', tone: 'pink' },
]

const steps = [
  ['01', 'Add Repository', 'Paste your GitHub repository URL and click analyze.'],
  ['02', 'Get Insights', 'AI analyzes your code and creates a project map.'],
  ['03', 'Practice Interview', 'Answer project-specific questions with AI feedback.'],
  ['04', 'Improve & Grow', 'Track your progress and build your confidence.'],
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveStep((step) => (step + 1) % steps.length), 3200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="site-shell">
      <header className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-3 md:py-4 bg-[#fffcf9] relative z-50">
        <Link href="/" className="flex items-center" aria-label="RepoViva home">
          <BrandMark />
        </Link>
        <nav className={`md:flex items-center gap-8 text-sm font-semibold text-slate-500 ${menuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white shadow-xl py-6 border-t border-slate-100' : 'hidden md:flex'}`}>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#features" className="hover:text-slate-900 transition-colors" onClick={() => setMenuOpen(false)}>Features</a>
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 bg-[#0f172a] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10">
            <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Connect GitHub
          </Link>
        </div>
        <button className="md:hidden text-slate-900 p-2" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section id="about" className="relative bg-[#fffcf9] flex flex-col items-center text-center px-6 pt-6 md:pt-10 pb-16 overflow-hidden">
        {/* Premium ambient background glow to fill the space beautifully */}
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[400px] bg-gradient-to-b from-indigo-100/80 to-transparent blur-3xl -z-10 rounded-full pointer-events-none"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-purple-100/60 to-transparent blur-3xl -z-10 rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1000px] flex flex-col items-center relative z-10">
          <div className="text-indigo-700 bg-indigo-50 font-bold px-4 py-2 rounded-full text-xs md:text-sm mb-4 flex items-center gap-2 border border-indigo-100 shadow-sm">
            <Sparkles size={14} /> AI-Powered Project Interview Coach <Sparkles size={14} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mt-2 mb-6 font-extrabold text-slate-900">
            <span>Your Code. Your Voice.</span><br />
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">Your Interview.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-[700px]">
            RepoViva turns your GitHub repository into a personalized technical interview experience. Get AI-powered insights, practice real questions, and build the confidence to explain your project.
          </p>
          <div className="hero-actions flex flex-col sm:flex-row gap-4 justify-center mb-12 w-full sm:w-auto">
            <Link href="/dashboard" className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 text-sm flex items-center justify-center">Start Your First Interview &rarr;</Link>
            <button className="bg-white text-slate-900 border border-slate-200 font-bold px-6 py-3 rounded-full hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2"><Play size={16} fill="currentColor" /> Watch Demo</button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-2 justify-center items-center">
            <div className="flex gap-4 text-left items-center">
               <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                 <GitBranch className="text-slate-900 w-5 h-5 shrink-0" />
               </div>
               <div>
                 <div className="text-[15px] font-bold text-slate-900">GitHub Integration</div>
                 <div className="text-[14px] text-slate-500">Connect in seconds</div>
               </div>
            </div>
            <div className="flex gap-4 text-left items-center">
               <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                 <Sparkles className="text-slate-900 w-5 h-5 shrink-0" />
               </div>
               <div>
                 <div className="text-[15px] font-bold text-slate-900">AI-Powered Analysis</div>
                 <div className="text-[14px] text-slate-500">Deep project insights</div>
               </div>
            </div>
            <div className="flex gap-4 text-left items-center">
               <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                 <Mic className="text-slate-900 w-5 h-5 shrink-0" />
               </div>
               <div>
                 <div className="text-[15px] font-bold text-slate-900">Text & Voice Practice</div>
                 <div className="text-[14px] text-slate-500">Real interview experience</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Powerful Features for Your Success</h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">Everything you need to understand, practice, and master your project.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
            {features.map(({ icon: Icon, title, copy, tone }, index) => {
              let bgClass = "bg-blue-50";
              let textClass = "text-blue-600";
              
              if (tone === 'purple') { bgClass = 'bg-purple-50'; textClass = 'text-purple-600'; }
              if (tone === 'green') { bgClass = 'bg-emerald-50'; textClass = 'text-emerald-600'; }
              if (tone === 'pink') { bgClass = 'bg-pink-50'; textClass = 'text-pink-600'; }
              if (tone === 'orange' || tone === 'peach') { bgClass = 'bg-orange-50'; textClass = 'text-orange-600'; }
              
              // Bento layout: first 2 take 3 columns each (half), last 3 take 2 columns each (one third)
              const spanClass = (index === 0 || index === 1) ? 'lg:col-span-3' : 'lg:col-span-2';
              
              return (
                <article key={title} className={`p-6 md:p-8 rounded-[24px] bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col ${spanClass}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${bgClass} ${textClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed">{copy}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto w-full">
        <div className="mb-10 md:mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">How It Works</h2>
          <p className="text-base md:text-lg text-slate-500">Get started in 4 simple steps to transform your GitHub repository into a practice playground.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col gap-3 md:gap-4">
            {steps.map(([number, title, copy], index) => (
              <button 
                key={number} 
                onClick={() => setActiveStep(index)}
                className={`flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-2xl text-left transition-all duration-300 w-full ${activeStep === index ? 'bg-white shadow-xl shadow-indigo-900/5 ring-1 ring-slate-100 scale-[1.02] md:scale-105 z-10' : 'hover:bg-slate-50/80 opacity-70 hover:opacity-100'}`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors duration-300 ${activeStep === index ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'bg-slate-100 text-slate-500'}`}>
                  {number}
                </div>
                <div>
                  <h3 className={`text-sm md:text-base font-bold mb-1 md:mb-1.5 transition-colors duration-300 ${activeStep === index ? 'text-slate-900' : 'text-slate-700'}`}>{title}</h3>
                  <p className="text-[13px] md:text-sm text-slate-500 leading-relaxed">{copy}</p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-center w-full mt-8 lg:mt-0 relative z-0">
            <InterviewVisual activeStep={activeStep} />
          </div>
          
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="bg-white text-slate-900 p-8 md:p-12 rounded-[32px] shadow-xl shadow-indigo-900/5 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-[100px] opacity-60 -mr-20 -mt-20"></div>
          
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-3 leading-tight relative z-10">Build confidence from the code you already wrote.</h2>
          <p className="text-slate-500 text-base mb-8 leading-relaxed relative z-10">RepoViva turns your real projects into a focused practice room, so every answer feels familiar, useful, and ready for the room.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-[#0f172a] text-white font-bold px-5 py-3 text-sm rounded-full hover:bg-slate-800 transition-colors relative z-10 shadow-md">
            Connect your first repository <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-indigo-600 font-bold text-xs tracking-wider uppercase mb-3">Built for real projects</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-tight">Practice with context, not generic quizzes.</h3>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-base font-bold text-slate-900 mb-1">Code-aware questions</strong>
                <span className="text-slate-500 text-sm leading-relaxed">AI reads your files to quiz you accurately on your architecture.</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-base font-bold text-slate-900 mb-1">Focused growth</strong>
                <span className="text-slate-500 text-sm leading-relaxed">Track how well you explain complex logic over time.</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-base font-bold text-slate-900 mb-1">One-click GitHub setup</strong>
                <span className="text-slate-500 text-sm leading-relaxed">No configuration required. Just paste your repository link.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white mt-12 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <BrandMark />
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-slate-500">
            <a href="#about" className="hover:text-slate-900 transition-colors">Home</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
          </nav>
          
          <div className="flex items-center">
            <a href="https://github.com/KrishnaChoubey20/RepoViva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-full transition-all border border-slate-200 shadow-sm hover:shadow">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span className="font-semibold text-sm">KrishnaChoubey20/RepoViva</span>
            </a>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-100 text-sm text-slate-500">
          <span>© 2026 RepoViva. All rights reserved.</span>
          <span>Made with <b className="text-red-500">♥</b> for developers</span>
        </div>
      </footer>
    </main>
  )
}

function BrandMark() { return <img src="/logo.png" alt="RepoViva" className="h-12 md:h-14 w-auto object-contain" /> }
function XIcon() { return <span className="x-icon">𝕏</span> }
function HeroVisual() { return <div className="hero-visual"><div className="orb orb-a" /><div className="orb orb-b" /><div className="floating-note"><Sparkles /> Inspire<br />Build<br />Grow</div><div className="app-window"><div className="window-top"><GitBranch /> <strong>GitHub</strong><div className="window-input">https://github.com/username/sample-project <ArrowRight /></div></div><div className="window-body"><aside><span className="active"><Target /> Dashboard</span><span><GitBranch /> My Projects</span><span><MessageCircle /> Interviews</span><span><Target /> Practice</span><span><BarChart3 /> Profile</span></aside><div className="analysis"><div className="analysis-head"><strong>Project Analysis</strong><span>Overview</span><span>Structure</span><span>Technologies</span></div><div className="analysis-panels"><div><h4>Project Summary <em>+ Analysis Complete</em></h4><p>This is a full-stack web application built with React and Node.js. It provides a platform for managing tasks with user authentication, real-time updates, and a clean, responsive UI.</p><div className="mini-tags"><small>React</small><small>Node.js</small><small>Express</small><small>MongoDB</small></div><h4>Key Files</h4><p>frontend/src/App.jsx　›<br />backend/controllers/auth.js　›<br />backend/models/user.js　›</p></div><div className="structure"><h4>Project Structure</h4><p>📁 src/<br />　📁 components/<br />　📁 pages/<br />　📁 utils/<br />📁 backend/<br />　📁 models/<br />　📁 routes/</p></div></div><button className="start-mini">Start Interview <ArrowRight /></button></div></div></div><div className="hero-plant">✦</div></div> }
function InterviewVisual({ activeStep }: { activeStep: number }) {
  const content = [
    ['Add repository', 'Connect GitHub and watch your project appear in a live workspace.', 'repo.analyze()', 'repository'],
    ['Get insights', 'RepoViva builds a visual map of your stack, files, and architecture.', 'project.map()', 'insights'],
    ['Practice interview', 'Switch between a focused chat interview and a voice interview room.', 'interview.start()', 'interview'],
    ['Improve and grow', 'Review your score, spot patterns, and turn feedback into your next win.', 'progress.track()', 'growth'],
  ][activeStep]
  
  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl bg-white shadow-xl overflow-hidden min-h-[400px] xl:min-h-[480px] w-full max-w-[800px]" key={activeStep}>
      <div className="flex justify-between items-center px-4 md:px-6 py-3 border-b border-slate-100 bg-slate-50/50">
         <img src="/logo.png" alt="RepoViva" className="h-6 md:h-7 w-auto object-contain" />
         <span className="text-[10px] md:text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Step {activeStep + 1} of 4</span>
      </div>
      
      <div className="flex-1 p-6 md:p-10 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        {activeStep === 0 && <RepositoryVisual />}
        {activeStep === 1 && <InsightsVisual />}
        {activeStep === 2 && <InterviewModeVisual />}
        {activeStep === 3 && <GrowthVisual />}
      </div>
      
      <div className="px-4 md:px-6 py-4 border-t border-slate-100 flex justify-between items-center text-xs md:text-sm bg-slate-50/50">
        <span className="font-mono text-slate-400">{content[2]}</span>
        <b className="text-slate-700">{content[0]}</b>
      </div>
    </div>
  )
}

function RepositoryVisual() { 
  return (
    <div className="w-full max-w-md text-center">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
        <GitBranch className="w-8 h-8" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Connect your GitHub repository</h3>
      <p className="text-sm md:text-base text-slate-500 mb-8">Paste a URL to bring your real code into practice.</p>
      
      <div className="flex items-center gap-3 p-3 md:p-4 border border-slate-200 rounded-xl bg-white shadow-sm mb-6 text-left">
        <GitBranch className="w-5 h-5 text-blue-500 shrink-0" />
        <span className="text-sm text-slate-600 font-mono truncate flex-1">github.com/username/sample-project</span>
        <ArrowRight className="w-5 h-5 text-blue-500 shrink-0" />
      </div>
      
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <span className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold"><Code2 className="w-4 h-4" /> src/</span>
        <span className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold"><Code2 className="w-4 h-4" /> package.json</span>
        <span className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold"><Code2 className="w-4 h-4" /> README.md</span>
      </div>
    </div>
  ) 
}

function InsightsVisual() { 
  return (
    <div className="w-full max-w-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0"><Brain className="w-6 h-6" /></div>
          <div>
            <h3 className="font-bold text-slate-900 text-base md:text-lg">Project insights ready</h3>
            <p className="text-xs md:text-sm text-slate-500">Smart map generated from your codebase</p>
          </div>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">+98%</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
         <div className="border border-indigo-100 bg-indigo-50/50 p-4 md:p-5 rounded-xl text-center">
            <div className="font-bold text-indigo-900 text-sm mb-1">Frontend</div>
            <div className="text-xs text-indigo-500 font-medium">React, Tailwind, Next.js</div>
         </div>
         <div className="border border-purple-100 bg-purple-50/50 p-4 md:p-5 rounded-xl text-center">
            <div className="font-bold text-purple-900 text-sm mb-1">API Routes</div>
            <div className="text-xs text-purple-500 font-medium">Node.js, Express</div>
         </div>
         <div className="border border-emerald-100 bg-emerald-50/50 p-4 md:p-5 rounded-xl text-center md:col-span-2">
            <div className="font-bold text-emerald-900 text-sm mb-1">Database Layer</div>
            <div className="text-xs text-emerald-500 font-medium">PostgreSQL, Prisma ORM</div>
         </div>
      </div>
    </div>
  ) 
}

function InterviewModeVisual() { 
  return (
    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      <div className="border border-slate-200 p-5 rounded-2xl bg-white shadow-sm flex flex-col h-full min-h-[220px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[13px] md:text-sm"><MessageCircle className="w-4 h-4 md:w-5 md:h-5" /> Chat Interview</div>
          <span className="text-[10px] md:text-xs text-slate-400 font-bold">2 / 5</span>
        </div>
        <div className="bg-slate-100 text-slate-700 p-3 md:p-4 rounded-xl rounded-tl-sm text-xs md:text-sm mb-4 w-[90%] leading-relaxed">
          Why did you choose this architecture?
        </div>
        <div className="bg-indigo-50 text-indigo-900 p-3 md:p-4 rounded-xl rounded-tr-sm text-xs md:text-sm w-[90%] ml-auto leading-relaxed">
          Because it keeps each feature independent...
        </div>
        <div className="w-6 h-1.5 bg-indigo-500 mt-4 rounded-full animate-pulse" />
      </div>
      
      <div className="border border-slate-200 p-5 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[220px] relative">
        <div className="flex justify-between items-center w-full mb-6 absolute top-5 px-5">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-[13px] md:text-sm"><Mic className="w-4 h-4 md:w-5 md:h-5" /> Voice</div>
          <span className="text-[10px] md:text-xs text-emerald-500 font-bold animate-pulse">Listening</span>
        </div>
        
        <div className="text-purple-400 tracking-[0.3em] text-2xl font-bold animate-pulse mb-6 mt-10">
          ••• ∿∿∿ •••
        </div>
        
        <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-200 mb-4">
          <Mic className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <p className="text-[10px] md:text-xs text-slate-500 font-medium">Speak naturally. Get feedback instantly.</p>
      </div>
    </div>
  ) 
}

function GrowthVisual() { 
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-slate-900 text-base md:text-lg">Your progress</h3>
          <p className="text-xs md:text-sm text-slate-500">Keep building momentum</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">+12%</div>
      </div>
      
      <div className="w-24 h-24 rounded-full border-8 border-slate-100 border-r-blue-500 flex flex-col items-center justify-center mx-auto mb-8 relative">
        <strong className="text-3xl font-black text-slate-900">78</strong>
      </div>
      
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex justify-between text-[11px] md:text-xs font-bold text-slate-600 mb-2"><span>Technical knowledge</span> <span>82%</span></div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[82%]" /></div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] md:text-xs font-bold text-slate-600 mb-2"><span>Project explanation</span> <span>68%</span></div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[68%]" /></div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] md:text-xs font-bold text-slate-600 mb-2"><span>Communication</span> <span>76%</span></div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[76%]" /></div>
        </div>
      </div>
    </div>
  ) 
}
