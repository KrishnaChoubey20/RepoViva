"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Folder, Mic, BookOpen, Settings, Bell
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/projects', icon: Folder },
    { name: 'Interviews', href: '/interviews', icon: Mic },
    { name: 'Practice', href: '/practice', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-[#F8F6F1] font-sans text-[#0F172A]">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#FFFFFF] border-r border-[#E7E5E4] flex-col hidden md:flex">
        <div className="px-6 h-[72px] flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center text-[#4F46E5]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">RepoViva</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-[14px] transition-colors ${
                  isActive 
                    ? 'bg-[#EEF0FF] text-[#4F46E5] font-semibold' 
                    : 'text-[#64748B] hover:bg-[#F8F6F1] hover:text-[#0F172A] font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#4F46E5]' : 'text-[#64748B]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mb-2">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-[14px] transition-colors ${
              pathname === '/settings'
                ? 'bg-[#EEF0FF] text-[#4F46E5] font-semibold' 
                : 'text-[#64748B] hover:bg-[#F8F6F1] hover:text-[#0F172A] font-medium'
            }`}
          >
            <Settings className={`w-5 h-5 ${pathname === '/settings' ? 'text-[#4F46E5]' : 'text-[#64748B]'}`} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-[72px] bg-[#FFFFFF] border-b border-[#E7E5E4] px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center md:hidden">
            <div className="w-8 h-8 flex items-center justify-center text-[#4F46E5]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            </div>
          </div>
          
          <div className="hidden md:block">
             <h1 className="text-lg font-semibold text-[#0F172A]">RepoViva Dashboard</h1>
          </div>

          <div className="flex items-center gap-5 ml-auto">
            <div className="hidden sm:flex items-center gap-2 bg-[#F8F6F1] text-[#0F172A] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E5E4]">
              <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
              Free Plan
            </div>
            
            <button className="w-10 h-10 rounded-full border border-[#E7E5E4] text-[#64748B] flex items-center justify-center hover:bg-[#F8F6F1] transition-colors bg-[#FFFFFF]">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center cursor-pointer">
              <div className="w-9 h-9 bg-[url('https://i.pravatar.cc/100?img=11')] bg-cover bg-center rounded-full shadow-sm border border-[#E7E5E4]" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8F6F1]">
          {children}
        </main>
      </div>
    </div>
  );
}
