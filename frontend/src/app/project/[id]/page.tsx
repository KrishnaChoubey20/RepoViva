"use client";

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Cpu, Layers, HelpCircle, FileSearch, ArrowLeft, 
  MessageSquare, Loader2, CheckCircle2, AlertCircle, RefreshCw 
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
        body: JSON.stringify({ session_id: sessionId })
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
      const res = await fetch(`/api/sessions/${sessionId}/answers`, {
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-semibold text-slate-100">Error</h2>
          <p className="text-slate-400">{error || 'Project not found'}</p>
          <button 
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const analysis = project.analysis_json || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <button 
              onClick={() => isPracticing ? setIsPracticing(false) : router.push('/')}
              className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isPracticing ? 'Back to Project Map' : 'New Analysis'}</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-100">
              {project.repo_owner}/{project.repo_name}
            </h1>
          </div>
          {!isPracticing && (
            <button 
              onClick={loadQuestion}
              disabled={questionLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              {questionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
              <span>Practice Interview</span>
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
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-100 flex items-center space-x-2 mb-4">
                    <FileSearch className="w-5 h-5 text-blue-400" />
                    <span>Project Purpose</span>
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-300">
                    {analysis.project_summary}
                  </p>
                </div>

                {/* Architecture */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-100 flex items-center space-x-2 mb-4">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <span>Architecture & Flow</span>
                  </h2>
                  <p className="leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {analysis.architecture_or_flow}
                  </p>
                </div>

                {/* Evidence */}
                {analysis.evidence && analysis.evidence.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-slate-100 flex items-center space-x-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Evidence</span>
                    </h2>
                    <ul className="space-y-4">
                      {analysis.evidence.map((ev: any, idx: number) => (
                        <li key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <p className="font-medium text-slate-200 mb-2">{ev.claim}</p>
                          <div className="flex flex-wrap gap-2">
                            {ev.file_paths.map((path: string, pIdx: number) => (
                              <span key={pIdx} className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">
                                {path}
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
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-slate-100 flex items-center space-x-2 mb-4">
                    <Cpu className="w-5 h-5 text-orange-400" />
                    <span>Tech Stack</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-slate-500 mb-2 uppercase tracking-wider font-semibold">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.languages?.map((l: string, i: number) => (
                          <span key={i} className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm">
                            {l}
                          </span>
                        )) || <span className="text-slate-500 italic">None detected</span>}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-slate-500 mb-2 uppercase tracking-wider font-semibold">Frameworks</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.frameworks?.map((f: string, i: number) => (
                          <span key={i} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
                            {f}
                          </span>
                        )) || <span className="text-slate-500 italic">None detected</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Files */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-slate-100 flex items-center space-x-2 mb-4">
                    <FileCode className="w-5 h-5 text-indigo-400" />
                    <span>Key Files</span>
                  </h2>
                  <ul className="space-y-3">
                    {analysis.key_files?.map((kf: any, i: number) => (
                      <li key={i} className="text-sm">
                        <div className="font-mono text-indigo-300 break-all">{kf.path}</div>
                        <div className="text-slate-400 mt-1">{kf.responsibility}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Uncertainties */}
                {analysis.uncertainties && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-slate-100 flex items-center space-x-2 mb-4">
                      <HelpCircle className="w-5 h-5 text-yellow-400" />
                      <span>Uncertainties</span>
                    </h2>
                    <p className="text-sm text-slate-400 italic">
                      {analysis.uncertainties}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="practice-mode"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              {/* Question Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl mt-1">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100 leading-snug">
                      {currentTurn.question}
                    </h2>
                    {currentTurn.evidence_hint && (
                      <p className="mt-4 text-sm text-slate-400 bg-slate-950 p-3 rounded-lg inline-flex items-center space-x-2 border border-slate-800">
                        <FileCode className="w-4 h-4 text-indigo-400" />
                        <span>Hint: {currentTurn.evidence_hint}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Answer Box or Feedback */}
              {!feedback ? (
                <form onSubmit={submitAnswer} className="space-y-4">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[200px] resize-y"
                    disabled={submittingAnswer}
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submittingAnswer || !answer.trim()}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all disabled:opacity-50"
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
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-green-500/10 border-b border-green-500/20 p-4">
                      <h3 className="font-semibold text-green-400 flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>What was good</span>
                      </h3>
                    </div>
                    <div className="p-6 text-slate-200">
                      {feedback.what_was_good}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-orange-500/10 border-b border-orange-500/20 p-4">
                      <h3 className="font-semibold text-orange-400 flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>Missing or Unclear</span>
                      </h3>
                    </div>
                    <div className="p-6 text-slate-200">
                      {feedback.missing_or_unclear}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-blue-500/10 border-b border-blue-500/20 p-4">
                      <h3 className="font-semibold text-blue-400 flex items-center space-x-2">
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                        <span>Suggested Improvement</span>
                      </h3>
                    </div>
                    <div className="p-6 text-slate-200">
                      {feedback.suggested_improvement}
                    </div>
                  </div>

                  {feedback.follow_up_question && (
                    <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6">
                      <h3 className="font-semibold text-indigo-400 mb-2">Follow-up Thought:</h3>
                      <p className="text-slate-300 italic">"{feedback.follow_up_question}"</p>
                    </div>
                  )}

                  <div className="flex justify-center pt-4">
                    <button
                      onClick={loadQuestion}
                      disabled={questionLoading}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors disabled:opacity-50"
                    >
                      {questionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                      <span>Next Question</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
