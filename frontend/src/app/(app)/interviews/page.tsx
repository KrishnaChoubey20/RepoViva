"use client";

import { Play, FileText, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

const mockInterviews = [
  {
    id: 1,
    project: "ProofPay",
    type: "Technical Project Interview",
    score: 78,
    questions: 10,
    minutes: 18,
    status: "Completed"
  },
  {
    id: 2,
    project: "Dev Portfolio",
    type: "Technical Project Interview",
    score: 71,
    questions: 8,
    minutes: 14,
    status: "Completed"
  }
];

export default function InterviewsPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Interviews</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl">
            Practice explaining the projects you actually built.
          </p>
        </div>
        <Link 
          href="/interviews/new"
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-[12px] font-semibold text-[14px] transition-all shadow-sm hover:shadow-md flex items-center gap-2 shrink-0 w-fit hover:-translate-y-0.5 animate-in fade-in slide-in-from-right-4 duration-500 delay-150 fill-mode-both"
        >
          <Play className="w-4 h-4 fill-white" /> Start Interview
        </Link>
      </div>

      {/* Start Interview Section */}
      <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-[17px] font-semibold text-[#0F172A] mb-1">Start a new interview</h2>
          <p className="text-[14px] text-[#64748B]">Choose a project and practice answering questions based on your actual code.</p>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-5">
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-[13px] font-semibold text-[#0F172A]">Project</label>
            <select className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] px-4 py-3 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] appearance-none font-medium">
              <option>ProofPay</option>
              <option>Dev Portfolio</option>
            </select>
          </div>
          
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-[13px] font-semibold text-[#0F172A]">Interview type</label>
            <select className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] px-4 py-3 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] appearance-none font-medium" disabled>
              <option>Technical Project Interview</option>
            </select>
          </div>
          
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-[13px] font-semibold text-[#0F172A]">Difficulty</label>
            <select className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] px-4 py-3 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] appearance-none font-medium">
              <option>Intermediate</option>
            </select>
          </div>

          <Link href="/interviews/new" className="w-full md:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shrink-0 text-center">
            Start Interview
          </Link>
        </div>
      </section>

      {/* Previous Interviews */}
      <section>
        <h2 className="text-[17px] font-semibold text-[#0F172A] mb-5">Recent Interviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockInterviews.map((interview) => (
            <div key={interview.id} className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-default">
              
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-[#0F172A] text-[16px]">{interview.project}</h3>
                  <p className="text-[13px] text-[#64748B] mt-0.5">{interview.type}</p>
                </div>
                <div className="bg-[#F8F6F1] border border-[#E7E5E4] px-3 py-1.5 rounded-[10px] text-center">
                  <div className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider mb-0.5">Score</div>
                  <div className="text-[18px] font-bold text-[#0F172A] leading-none">{interview.score}%</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                  <FileText className="w-4 h-4" /> {interview.questions} questions
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                  <Clock className="w-4 h-4" /> {interview.minutes} minutes
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 border-b border-[#E7E5E4] pb-4">
                <div className="flex items-center gap-1.5 text-[13px] text-[#0F172A] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  {interview.status}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/interviews/${interview.id}/report`}
                  className="flex-1 bg-[#FFFFFF] border border-[#E7E5E4] text-[#0F172A] hover:bg-[#F8F6F1] py-2 rounded-[10px] text-[13px] font-semibold text-center transition-colors"
                >
                  View Report
                </Link>
                <Link 
                  href={`/interviews/new?project=${interview.project.toLowerCase()}`}
                  className="flex-1 bg-[#4F46E5] text-white hover:bg-[#4338CA] py-2 rounded-[10px] text-[13px] font-semibold text-center transition-colors border border-transparent"
                >
                  Practice Again
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
