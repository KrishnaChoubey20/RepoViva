"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mic, Type, ArrowRight, X, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export default function LiveInterviewPage({ params }: { params: { id: string } }) {
  const [answerMode, setAnswerMode] = useState<'voice' | 'type'>('type');
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans text-[#0F172A] flex flex-col">
      
      {/* Interview Header */}
      <header className="h-[72px] bg-[#FFFFFF] border-b border-[#E7E5E4] px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/interviews" className="p-2 hover:bg-[#F8F6F1] rounded-full transition-colors text-[#64748B]">
            <X className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-[15px] font-bold text-[#0F172A] leading-tight">RepoViva Interview</h1>
            <p className="text-[13px] text-[#64748B]">ProofPay</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-medium text-[#64748B] hidden sm:block">Question 4 of 10</span>
          <div className="w-32 h-2 bg-[#F8F6F1] rounded-full overflow-hidden border border-[#E7E5E4]">
            <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col max-w-[800px] mx-auto w-full space-y-8">
        
        {/* Question */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 md:p-10 shadow-sm text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-snug">
            Why did you choose Supabase for this project?
          </h2>
        </section>

        {/* Answer Area */}
        {!submitted ? (
          <section className="flex flex-col flex-1">
            
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setAnswerMode('type')}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors flex items-center gap-2 ${answerMode === 'type' ? 'bg-[#EEF0FF] text-[#4F46E5]' : 'bg-[#FFFFFF] border border-[#E7E5E4] text-[#64748B] hover:bg-[#F8F6F1]'}`}
              >
                <Type className="w-4 h-4" /> Type Answer
              </button>
              <button 
                onClick={() => setAnswerMode('voice')}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors flex items-center gap-2 ${answerMode === 'voice' ? 'bg-[#EEF0FF] text-[#4F46E5]' : 'bg-[#FFFFFF] border border-[#E7E5E4] text-[#64748B] hover:bg-[#F8F6F1]'}`}
              >
                <Mic className="w-4 h-4" /> Record Voice
              </button>
            </div>

            {answerMode === 'type' ? (
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your explanation here..."
                className="w-full flex-1 min-h-[200px] bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 text-[#0F172A] text-[15px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] shadow-sm resize-none"
              />
            ) : (
              <div className="w-full flex-1 min-h-[200px] bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-[#EEF0FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-all flex items-center justify-center shadow-sm">
                  <Mic className="w-8 h-8" />
                </button>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSubmitted(true)}
                disabled={answerMode === 'type' && !answer.trim()}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[15px] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            </div>
          </section>
        ) : (
          <section className="space-y-6">
            
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" /> What you did well
              </h3>
              <p className="text-[14px] text-[#0F172A] leading-relaxed">
                You clearly mentioned that Supabase provides a Postgres database out-of-the-box and handles authentication efficiently. Good job connecting the choice back to developer velocity.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#F59E0B]" /> What could be clearer
              </h3>
              <p className="text-[14px] text-[#0F172A] leading-relaxed">
                You didn't mention Row Level Security (RLS) which is one of the main security benefits of Supabase. Adding this detail would show a deeper understanding of the tool's architecture.
              </p>
            </div>

            <div className="bg-[#EEF0FF] border border-[#4F46E5]/20 rounded-[18px] p-6 shadow-sm">
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#4F46E5]" /> Follow-up question
              </h3>
              <p className="text-[14px] text-[#0F172A] leading-relaxed italic">
                "How did you structure your Row Level Security policies to ensure users could only access their own practice sessions?"
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[15px] transition-colors shadow-sm flex items-center gap-2">
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </section>
        )}
      </main>

    </div>
  );
}
