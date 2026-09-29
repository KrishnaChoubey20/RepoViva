"use client";

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Cpu, Layers, HelpCircle, FileSearch, ArrowLeft, 
  MessageSquare, Loader2, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Target
} from 'lucide-react';

export default function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { id } = params;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Practice state
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<any>(null);
  const [questionLoading, setQuestionLoading] = useState(false);
  
  const [answer, setAnswer] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        setProject(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const loadQuestion = async () => {
    setQuestionLoading(true);
    setError('');
    setFeedback(null);
    setAnswer('');
    try {
      const res = await fetch(`/api/projects/${id}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId || 'demo-session' })
      });
      if (!res.ok) throw new Error('Failed to load question');
      const data = await res.json();
      setCurrentTurn(data);
      setIsPracticing(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setQuestionLoading(false);
    }
  };

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    
    setSubmittingAnswer(true);
    try {
      const res = await fetch(`/api/sessions/${sessionId || 'demo-session'}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          turn_id: currentTurn.turn_id, 
          answer,
          project_id: id 
        })
      });
      if (!res.ok) throw new Error('Failed to submit answer');
      const data = await res.json();
      setFeedback(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="bg-white border border-red-200 p-8 rounded-3xl max-w-md w-full text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-navy-900">Error</h2>
          <p className="text-navy-500">{error || 'Project not found'}</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="text-brand-600 hover:text-brand-700 font-semibold"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const analysis = project.analysis_json || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <button 
            onClick={() => isPracticing ? setIsPracticing(false) : router.push('/dashboard')}
            className="flex items-center space-x-2 text-navy-500 hover:text-navy-900 transition-colors mb-2 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isPracticing ? 'Back to Project Map' : 'Dashboard'}</span>
          </button>
          <h1 className="text-3xl font-bold text-navy-900 flex items-center gap-2">
            <GithubIcon className="w-6 h-6 text-navy-900" />
            {project.repo_owner}/{project.repo_name}
          </h1>
        </div>
        {!isPracticing && (
          <button 
            onClick={loadQuestion}
            disabled={questionLoading}
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-md shadow-brand-500/20"
          >
            {questionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
            <span>Start Interview</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isPracticing ? (
          <motion.div 
            key="project-map"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Main Column */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Summary */}
              <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><FileSearch className="w-4 h-4" /></div>
                  <span>Project Purpose</span>
                </h2>
                <p className="text-[15px] leading-relaxed text-navy-700">
                  {analysis.project_summary}
                </p>
              </div>

              {/* Architecture */}
              <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><Layers className="w-4 h-4" /></div>
                  <span>Architecture & Flow</span>
                </h2>
                <p className="text-[15px] leading-relaxed text-navy-700 whitespace-pre-wrap">
                  {analysis.architecture_or_flow}
                </p>
              </div>

              {/* Evidence */}
              {analysis.evidence && analysis.evidence.length > 0 && (
                <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-navy-900 flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                    <span>Evidence Map</span>
                  </h2>
                  <ul className="space-y-4">
                    {analysis.evidence.map((ev: any, idx: number) => (
                      <li key={idx} className="bg-cream-50 p-4 rounded-2xl border border-cream-100">
                        <p className="font-medium text-navy-900 mb-3 text-sm">{ev.claim}</p>
                        <div className="flex flex-wrap gap-2">
                          {ev.file_paths.map((path: string, pIdx: number) => (
                            <span key={pIdx} className="text-xs font-mono bg-white border border-cream-200 text-navy-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                              <FileCode className="w-3 h-3 text-brand-500" /> {path}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Tech Stack */}
              <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center"><Cpu className="w-4 h-4" /></div>
                  <span>Tech Stack</span>
                </h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[11px] text-navy-400 mb-2 uppercase tracking-widest font-bold">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.languages?.map((l: string, i: number) => (
                        <span key={i} className="bg-white border border-cream-200 shadow-sm text-navy-700 px-3 py-1 rounded-full text-sm font-medium">
                          {l}
                        </span>
                      )) || <span className="text-navy-400 text-sm italic">None detected</span>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] text-navy-400 mb-2 uppercase tracking-widest font-bold">Frameworks</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.frameworks?.map((f: string, i: number) => (
                        <span key={i} className="bg-brand-50 border border-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {f}
                        </span>
                      )) || <span className="text-navy-400 text-sm italic">None detected</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Files */}
              <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 flex items-center space-x-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><FileCode className="w-4 h-4" /></div>
                  <span>Key Files</span>
                </h2>
                <ul className="space-y-4">
                  {analysis.key_files?.map((kf: any, i: number) => (
                    <li key={i} className="text-sm">
                      <div className="font-mono text-brand-600 font-medium break-all mb-1">{kf.path}</div>
                      <div className="text-navy-600 text-xs leading-relaxed">{kf.responsibility}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Uncertainties */}
              {analysis.uncertainties && (
                <div className="bg-amber-50 border border-amber-200/50 rounded-3xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-amber-900 flex items-center space-x-2 mb-3">
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                    <span>Uncertainties</span>
                  </h2>
                  <p className="text-sm text-amber-800/80 leading-relaxed">
                    {analysis.uncertainties}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="practice-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* Question Card */}
            <div className="bg-white border border-cream-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-purple-500" />
              <div className="flex items-start space-x-4">
                <div className="bg-brand-50 p-3 rounded-2xl mt-1 flex-shrink-0 text-brand-600">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 leading-snug">
                    {currentTurn.question}
                  </h2>
                  {currentTurn.evidence_hint && (
                    <p className="mt-5 text-sm text-navy-600 bg-cream-50 px-4 py-3 rounded-xl inline-flex items-center space-x-2 border border-cream-200 shadow-sm">
                      <Sparkles className="w-4 h-4 text-brand-500" />
                      <span><strong>Context:</strong> {currentTurn.evidence_hint}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm border border-red-100">
                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
              </div>
            )}

            {/* Answer Box or Feedback */}
            {!feedback ? (
              <form onSubmit={submitAnswer} className="space-y-4">
                <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500 transition-all">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your explanation here. Focus on the 'why' and 'how' based on your code..."
                    className="w-full bg-transparent p-6 text-navy-900 placeholder:text-navy-400 focus:outline-none min-h-[240px] resize-y text-base"
                    disabled={submittingAnswer}
                    required
                  />
                  <div className="bg-cream-50 px-6 py-4 flex justify-between items-center border-t border-cream-100">
                    <span className="text-xs font-semibold text-navy-400 uppercase tracking-widest">Text Response</span>
                    <button
                      type="submit"
                      disabled={submittingAnswer || !answer.trim()}
                      className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all disabled:opacity-50 shadow-md shadow-brand-500/20"
                    >
                      {submittingAnswer ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Evaluating...</span>
                        </>
                      ) : (
                        <span>Submit Answer</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-white border border-green-200 rounded-3xl overflow-hidden shadow-sm">
                     <div className="bg-green-50/50 p-5 flex items-center gap-3 border-b border-green-100">
                       <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                       <h3 className="font-bold text-green-900 text-lg">What went well</h3>
                     </div>
                     <div className="p-6 text-navy-700 leading-relaxed text-sm">
                       {feedback.what_was_good}
                     </div>
                   </div>

                   <div className="bg-white border border-orange-200 rounded-3xl overflow-hidden shadow-sm">
                     <div className="bg-orange-50/50 p-5 flex items-center gap-3 border-b border-orange-100">
                       <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center"><AlertCircle className="w-4 h-4" /></div>
                       <h3 className="font-bold text-orange-900 text-lg">Missing or Unclear</h3>
                     </div>
                     <div className="p-6 text-navy-700 leading-relaxed text-sm">
                       {feedback.missing_or_unclear}
                     </div>
                   </div>
                </div>

                <div className="bg-white border border-brand-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-brand-50/50 p-5 flex items-center gap-3 border-b border-brand-100">
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center"><ArrowLeft className="w-4 h-4 rotate-180" /></div>
                    <h3 className="font-bold text-brand-900 text-lg">Suggested Improvement</h3>
                  </div>
                  <div className="p-6 text-navy-800 leading-relaxed font-medium">
                    {feedback.suggested_improvement}
                  </div>
                </div>

                {feedback.follow_up_question && (
                  <div className="bg-purple-50 border border-purple-200/50 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                       <HelpCircle className="w-4 h-4" /> Follow-up Thought
                    </h3>
                    <p className="text-purple-800 italic leading-relaxed">"{feedback.follow_up_question}"</p>
                  </div>
                )}

                <div className="flex justify-center pt-6">
                  <button
                    onClick={loadQuestion}
                    disabled={questionLoading}
                    className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-3.5 rounded-xl font-bold flex items-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-navy-900/10"
                  >
                    {questionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                    <span>Next Practice Question</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
