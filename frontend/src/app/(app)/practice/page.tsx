"use client";

import { BookOpen, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PracticePage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 space-y-10 pb-20">
      
      {/* Top Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Practice</h1>
        <p className="text-[15px] text-[#64748B] max-w-xl">
          Strengthen the areas where you need more confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Practice Areas) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Continue Practice */}
          <section>
            <h2 className="text-[17px] font-semibold text-[#0F172A] mb-4">Continue where you left off</h2>
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-[12px] bg-[#EEF0FF] flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A] text-[18px] mb-1">ProofPay — Architecture</h3>
                  <p className="text-[14px] text-[#64748B] max-w-sm">Practice explaining how your application components communicate.</p>
                </div>
              </div>
              <Link href="/practice/continue" className="w-full md:w-auto bg-[#4F46E5] text-white hover:bg-[#4338CA] px-6 py-3 rounded-[12px] text-[14px] font-semibold transition-colors shrink-0 text-center shadow-sm">
                Continue Practice
              </Link>
            </div>
          </section>

          {/* Recommended Practice */}
          <section>
            <h2 className="text-[17px] font-semibold text-[#0F172A] mb-4">Recommended for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1 */}
              <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm flex flex-col h-full">
                <h3 className="font-bold text-[#0F172A] text-[16px] mb-3">Architecture</h3>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Why practice this?</p>
                  <p className="text-[13px] text-[#0F172A] leading-relaxed">Your last interview answer could explain the request flow more clearly.</p>
                </div>
                <Link href="/practice/architecture" className="mt-6 flex items-center justify-center gap-1.5 w-full bg-[#F8F6F1] hover:bg-[#EEF0FF] hover:text-[#4F46E5] text-[#0F172A] py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
                  Practice <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm flex flex-col h-full">
                <h3 className="font-bold text-[#0F172A] text-[16px] mb-3">Database</h3>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Why practice this?</p>
                  <p className="text-[13px] text-[#0F172A] leading-relaxed">Practice explaining your database choices and trade-offs.</p>
                </div>
                <Link href="/practice/database" className="mt-6 flex items-center justify-center gap-1.5 w-full bg-[#F8F6F1] hover:bg-[#EEF0FF] hover:text-[#4F46E5] text-[#0F172A] py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
                  Practice <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm flex flex-col h-full">
                <h3 className="font-bold text-[#0F172A] text-[16px] mb-3">Error Handling</h3>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Why practice this?</p>
                  <p className="text-[13px] text-[#0F172A] leading-relaxed">Practice explaining how your application handles failures.</p>
                </div>
                <Link href="/practice/errors" className="mt-6 flex items-center justify-center gap-1.5 w-full bg-[#F8F6F1] hover:bg-[#EEF0FF] hover:text-[#4F46E5] text-[#0F172A] py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
                  Practice <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column (Skill Progress) */}
        <div className="lg:col-span-1">
          <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm sticky top-28">
            <h2 className="text-[15px] font-semibold text-[#0F172A] flex items-center gap-2 mb-6">
              <Target className="w-4 h-4 text-[#4F46E5]" /> Your Focus Areas
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[13px] font-medium mb-2">
                  <span className="text-[#0F172A]">Architecture</span>
                  <span className="text-[#64748B]">72%</span>
                </div>
                <div className="w-full h-2 bg-[#F8F6F1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[13px] font-medium mb-2">
                  <span className="text-[#0F172A]">Database</span>
                  <span className="text-[#64748B]">84%</span>
                </div>
                <div className="w-full h-2 bg-[#F8F6F1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[13px] font-medium mb-2">
                  <span className="text-[#0F172A]">Error Handling</span>
                  <span className="text-[#64748B]">58%</span>
                </div>
                <div className="w-full h-2 bg-[#F8F6F1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '58%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[13px] font-medium mb-2">
                  <span className="text-[#0F172A]">Communication</span>
                  <span className="text-[#64748B]">76%</span>
                </div>
                <div className="w-full h-2 bg-[#F8F6F1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '76%' }} />
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>

    </div>
  );
}
