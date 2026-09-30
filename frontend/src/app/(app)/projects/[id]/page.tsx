"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, ArrowLeft, Loader2, Lightbulb, FileCode } from 'lucide-react';

export default function ProjectAnalysisPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-8 pb-20">
      
      {/* Back link */}
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">ProofPay</h1>
          <p className="text-[14px] text-[#64748B] mt-1 mb-3">github.com/krishna/proofpay</p>
          <div className="flex items-center gap-1.5 text-[13px] text-[#0F172A] font-medium bg-[#F8F6F1] px-3 py-1 rounded-[8px] w-fit border border-[#E7E5E4]">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            Analysis complete
          </div>
        </div>
        <Link 
          href={`/interviews/new?project=${params.id}`}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
        >
          <Play className="w-4 h-4 fill-white" /> Start Interview
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Project Overview */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-3">Project Overview</h2>
            <p className="text-[14px] text-[#0F172A] leading-relaxed">
              ProofPay is a payment-focused web application built with Next.js, TypeScript and Supabase.
            </p>
          </section>

          {/* Section 3: Project Structure */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-5">Project Structure</h2>
            <div className="flex flex-col items-center max-w-sm mx-auto space-y-2">
              <div className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] p-4 text-center">
                <span className="font-semibold text-[#0F172A] text-[14px]">Frontend</span>
              </div>
              <div className="text-[#64748B]">↓</div>
              <div className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] p-4 text-center">
                <span className="font-semibold text-[#0F172A] text-[14px]">API / Server Logic</span>
              </div>
              <div className="text-[#64748B]">↓</div>
              <div className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] p-4 text-center">
                <span className="font-semibold text-[#0F172A] text-[14px]">Supabase</span>
              </div>
              <div className="text-[#64748B]">↓</div>
              <div className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[12px] p-4 text-center">
                <span className="font-semibold text-[#0F172A] text-[14px]">Database</span>
              </div>
            </div>
          </section>

          {/* Section 5: AI Project Insights */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#F59E0B]" /> AI Project Insights
            </h2>
            <div className="space-y-4">
              <div className="bg-[#EEF0FF] p-4 rounded-[12px]">
                <h3 className="font-semibold text-[#0F172A] text-[14px] mb-1">Strong project structure</h3>
                <p className="text-[13px] text-[#0F172A] leading-relaxed">The application separates UI and backend responsibilities clearly.</p>
              </div>
              <div className="bg-[#F8F6F1] border border-[#E7E5E4] p-4 rounded-[12px]">
                <h3 className="font-semibold text-[#0F172A] text-[14px] mb-1">Potential interview topic</h3>
                <p className="text-[13px] text-[#0F172A] leading-relaxed">Be prepared to explain why Supabase was selected.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Start Interview CTA */}
          <section className="bg-[#EEF0FF] border border-[#4F46E5]/20 rounded-[18px] p-8 shadow-sm flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Ready to practice?</h2>
            <p className="text-[14px] text-[#64748B] mb-6">
              Start a project-specific interview based on your repository.
            </p>
            <Link 
              href={`/interviews/new?project=${params.id}`}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-[12px] font-semibold text-[14px] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Interview
            </Link>
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Section 2: Tech Stack */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'TypeScript', 'Supabase', 'Tailwind'].map(tech => (
                <span key={tech} className="bg-[#F8F6F1] border border-[#E7E5E4] text-[#0F172A] px-3 py-1.5 rounded-[8px] text-[13px] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Section 4: Key Interview Topics */}
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-4">Key Interview Topics</h2>
            <div className="flex flex-wrap gap-2">
              {['Architecture', 'Database', 'Authentication', 'API Design', 'Error Handling'].map(topic => (
                <span key={topic} className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E7E5E4] text-[#0F172A] px-3 py-1.5 rounded-[8px] text-[13px] font-medium shadow-sm">
                  <FileCode className="w-3.5 h-3.5 text-[#64748B]" /> {topic}
                </span>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
