"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, FolderGit2, MessageSquare, Target, 
  BarChart2, Settings, Bell, ChevronDown, CheckCircle2 
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Projects', href: '#', icon: FolderGit2, disabled: true },
    { name: 'Interviews', href: '#', icon: MessageSquare, disabled: true },
    { name: 'Practice', href: '#', icon: Target, disabled: true },
    { name: 'Reports', href: '#', icon: BarChart2, disabled: true },
    { name: 'Settings', href: '#', icon: Settings, disabled: true },
  ];

  return (
    <div className="flex h-screen bg-cream-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-cream-200 flex flex-col hidden md:flex">
        <div className="p-6 h-20 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center text-indigo-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-navy-900">RepoViva</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.disabled ? '#' : item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-brand-50 text-brand-700 font-medium' 
                    : 'text-navy-500 hover:bg-cream-100 hover:text-navy-900'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : ''}`} />
                <span>{item.name}</span>
                {item.disabled && <span className="ml-auto text-[10px] uppercase bg-cream-200 text-navy-400 px-2 py-0.5 rounded-full">Soon</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream-200 m-4 rounded-2xl bg-cream-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">👑</div>
            <div>
              <div className="text-sm font-semibold text-navy-900">Upgrade to Pro</div>
              <div className="text-xs text-navy-500">Get unlimited interviews</div>
            </div>
          </div>
          <button disabled className="w-full bg-navy-900 text-white rounded-xl py-2 text-sm font-medium opacity-50 cursor-not-allowed">
            Coming Soon
          </button>
        </div>
        
        <div className="p-6 border-t border-cream-200 text-xs text-navy-500 flex items-center gap-2">
          <GithubIcon className="w-4 h-4" /> Built with <span className="text-red-500">♥</span> for developers
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-cream-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center md:hidden">
            <div className="w-8 h-8 flex items-center justify-center text-indigo-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            </div>
          </div>
          
          <div className="hidden md:block">
            {/* Context/Breadcrumbs could go here */}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex items-center gap-1 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-brand-100">
              <CheckCircle2 className="w-3 h-3" /> Free Plan
            </div>
            
            <button className="w-10 h-10 rounded-full border border-cream-200 text-navy-500 flex items-center justify-center hover:bg-cream-100 transition-colors bg-white">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 cursor-pointer">
              <div className="w-9 h-9 bg-[url('https://i.pravatar.cc/100?img=11')] bg-cover bg-center rounded-full shadow-sm" />
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-navy-900 flex items-center gap-1">
                  Krishna Choubey <ChevronDown className="w-4 h-4 text-navy-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-cream-50 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
