"use client";

import { Play, FileText, CheckCircle2, Clock, Inbox } from 'lucide-react';
import Link from 'next/link';

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
              <option>No projects analyzed yet</option>
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

          <button disabled className="w-full md:w-auto bg-[#4F46E5] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shrink-0 text-center opacity-50 cursor-not-allowed">
            Start Interview
          </button>
        </div>
      </section>

      {/* Previous Interviews */}
      <section>
        <h2 className="text-[17px] font-semibold text-[#0F172A] mb-5">Recent Interviews</h2>
        
        <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-6 h-6 text-[#4F46E5]" />
          </div>
          <h3 className="font-semibold text-[#0F172A] text-[16px] mb-2">No past interviews</h3>
          <p className="text-[14px] text-[#64748B]">You haven't practiced any interviews yet.</p>
        </div>
      </section>

    </div>
  );
}
