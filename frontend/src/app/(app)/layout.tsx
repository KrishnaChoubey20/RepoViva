"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, Folder, Mic, BookOpen, Settings, Bot
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/projects', icon: Folder },
    { name: 'Interviews', href: '/interviews', icon: Mic },
    { name: 'Practice', href: '/practice', icon: BookOpen },
    { name: 'Assistant', href: '/assistant', icon: Bot },
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

            
            <div className="relative group flex flex-col items-end cursor-pointer">
              <div 
                className="w-9 h-9 bg-cover bg-center rounded-full shadow-sm border border-[#E7E5E4] transition-all group-hover:ring-2 group-hover:ring-[#4F46E5] group-hover:ring-offset-2 group-hover:ring-offset-[#FFFFFF]" 
                style={{ backgroundImage: `url(${user?.user_metadata?.avatar_url || 'https://i.pravatar.cc/100?img=11'})` }}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-9 pt-3 w-48 hidden group-hover:block z-50">
                <div className="bg-white border border-[#E7E5E4] rounded-[12px] shadow-lg py-1 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-[#E7E5E4] mb-1">
                    <p className="text-[14px] font-semibold text-[#0F172A] truncate">{user?.user_metadata?.full_name || 'User'}</p>
                    <p className="text-[12px] text-[#64748B] truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  <Link href="/settings" className="block px-4 py-2 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8F6F1] transition-colors">
                    Profile Settings
                  </Link>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sign Out
                  </button>
                </div>
              </div>
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
