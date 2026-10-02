"use client";

import { useEffect, useState } from 'react';
import { User, LogOut, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-8 space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      
      {/* Top Section */}
      <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Settings</h1>
        <p className="text-[15px] text-[#64748B]">
          Manage your profile and RepoViva preferences.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Profile */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-2 mb-6 border-b border-[#E7E5E4] pb-4">
            <User className="w-4 h-4 text-[#4F46E5]" /> Profile
          </h2>
          
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-4 mb-2">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full border border-[#E7E5E4]" />
              ) : (
                <div className="w-16 h-16 bg-[#EEF0FF] rounded-full border border-[#E7E5E4] flex items-center justify-center">
                  <User className="w-6 h-6 text-[#4F46E5]" />
                </div>
              )}
              <div className="text-[13px] text-[#64748B]">Logged in via GitHub</div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#0F172A]">Name</label>
              <input 
                type="text" 
                value={user?.user_metadata?.full_name || user?.user_metadata?.user_name || ''}
                readOnly
                className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[10px] px-3 py-2 text-[#64748B] text-[14px] focus:outline-none cursor-not-allowed"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#0F172A]">Email</label>
              <input 
                type="email" 
                value={user?.email || ''}
                readOnly
                className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[10px] px-3 py-2 text-[#64748B] text-[14px] focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-[#0F172A] mb-1">Sign Out</h2>
            <p className="text-[13px] text-[#64748B]">Sign out of your RepoViva account.</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-[#F8F6F1] hover:bg-[#E7E5E4] text-[#0F172A] px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </section>

      </div>
    </div>
  );
}
