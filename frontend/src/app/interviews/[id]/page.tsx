"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Type, ArrowRight, X, CheckCircle2, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LiveInterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [question, setQuestion] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  
  const [isComplete, setIsComplete] = useState(false);
  const [currentView, setCurrentView] = useState<'question' | 'feedback'>('question');
  const [error, setError] = useState('');

  // Fetch initial question
  useEffect(() => {
    async function fetchChat() {
      try {
        const res = await fetch('/api/interview/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: id })
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Failed to fetch interview');
        
        if (data.isComplete) {
          setIsComplete(true);
          setCurrentView('feedback'); // Just to show completion state if they land here
        } else {
          setQuestion(data.nextQuestion);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchChat();
  }, [id]);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: id, answer })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to submit answer');
      
      setFeedback(data.feedback);
      setQuestion(data.nextQuestion); // Pre-load next question
      setIsComplete(data.isComplete);
      setCurrentView('feedback');
      setAnswer('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F6F1]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans text-[#0F172A] flex flex-col">
      
      {/* Interview Header */}
      <header className="h-[72px] bg-[#FFFFFF] border-b border-[#E7E5E4] px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="p-2 hover:bg-[#F8F6F1] rounded-full transition-colors text-[#64748B]">
            <X className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-[15px] font-bold text-[#0F172A] leading-tight">AI Technical Interview</h1>
            <p className="text-[13px] text-[#64748B]">Chat Mode (MVP)</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col max-w-[800px] mx-auto w-full space-y-8 animate-in fade-in zoom-in-95 duration-700">
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-[12px] text-sm text-center">
            {error}
          </div>
        )}

        {currentView === 'question' && question && !isComplete && (
          <>
            <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 md:p-10 shadow-sm text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-snug">
                {question.question}
              </h2>
              {question.evidence && question.evidence.length > 0 && (
                <p className="mt-4 text-[14px] text-[#64748B] italic">
                  Hint: Refer to {question.evidence.join(', ')}
                </p>
              )}
            </section>

            <section className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-4 py-2 rounded-[10px] text-[13px] font-semibold bg-[#EEF0FF] text-[#4F46E5] flex items-center gap-2">
                  <Type className="w-4 h-4" /> Type Answer
                </div>
              </div>

              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your explanation here..."
                disabled={submitting}
                className="w-full flex-1 min-h-[200px] bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 text-[#0F172A] text-[15px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] shadow-sm resize-none disabled:opacity-50"
              />

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleSubmit}
                  disabled={!answer.trim() || submitting}
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[15px] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Analyzing Answer...' : 'Submit Answer'}
                </button>
              </div>
            </section>
          </>
        )}

        {currentView === 'feedback' && feedback && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-[#0F172A] text-center mb-6">Feedback on your answer</h2>
            
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" /> Strengths
              </h3>
              <div className="text-[14px] text-[#0F172A] leading-relaxed">
                {feedback.strengths && feedback.strengths.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {feedback.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                ) : 'Good attempt.'}
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#F59E0B]" /> Gaps
              </h3>
              <div className="text-[14px] text-[#0F172A] leading-relaxed">
                {feedback.gaps && feedback.gaps.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {feedback.gaps.map((g: string, i: number) => <li key={i}>{g}</li>)}
                  </ul>
                ) : 'Nothing major missed.'}
              </div>
            </div>

            {feedback.follow_up && feedback.follow_up.should_ask && (
              <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
                <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#4F46E5]" /> Follow-up
                </h3>
                <p className="text-[14px] text-[#0F172A] leading-relaxed">
                  {feedback.follow_up.question}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => {
                  if (isComplete) {
                    router.push('/dashboard');
                  } else {
                    setCurrentView('question');
                  }
                }}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[15px] transition-colors shadow-sm flex items-center gap-2"
              >
                {isComplete ? 'Finish Interview' : 'Next Question'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {isComplete && !feedback && (
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-10 shadow-sm text-center">
            <div className="w-16 h-16 rounded-[16px] bg-[#EEF0FF] flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Interview Complete!</h2>
            <p className="text-[14px] text-[#64748B] mb-8">
              Great job! You have completed the MVP interview flow.
            </p>
            <Link 
              href="/dashboard"
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm inline-flex"
            >
              Back to Dashboard
            </Link>
          </section>
        )}

      </main>
    </div>
  );
}
