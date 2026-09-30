"use client";

import { User, Bell, Shield, Sliders, LogOut } from 'lucide-react';

export default function SettingsPage() {
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
              <div className="w-16 h-16 bg-[url('https://i.pravatar.cc/100?img=11')] bg-cover bg-center rounded-full border border-[#E7E5E4]" />
              <button className="text-[#4F46E5] text-[13px] font-semibold hover:underline">Change Avatar</button>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#0F172A]">Name</label>
              <input 
                type="text" 
                defaultValue="Krishna Choubey"
                className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[10px] px-3 py-2 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#0F172A]">Email</label>
              <input 
                type="email" 
                defaultValue="krishna@example.com"
                className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[10px] px-3 py-2 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
            
            <button className="bg-[#4F46E5] text-white hover:bg-[#4338CA] px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-colors mt-2">
              Save Changes
            </button>
          </div>
        </section>

        {/* Interview Preferences */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-2 mb-6 border-b border-[#E7E5E4] pb-4">
            <Sliders className="w-4 h-4 text-[#4F46E5]" /> Interview Preferences
          </h2>
          
          <div className="space-y-5 max-w-sm">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#0F172A]">Interview style</label>
              <select className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[10px] px-3 py-2.5 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5] appearance-none font-medium">
                <option>Friendly</option>
                <option selected>Professional</option>
                <option>Strict</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#0F172A]">Default difficulty</label>
              <select className="w-full bg-[#F8F6F1] border border-[#E7E5E4] rounded-[10px] px-3 py-2.5 text-[#0F172A] text-[14px] focus:outline-none focus:border-[#4F46E5] appearance-none font-medium">
                <option>Beginner</option>
                <option selected>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-2 mb-6 border-b border-[#E7E5E4] pb-4">
            <Bell className="w-4 h-4 text-[#4F46E5]" /> Notifications
          </h2>
          
          <div className="space-y-4 max-w-sm">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[14px] text-[#0F172A] font-medium">Interview reminders</span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-10 h-6 bg-[#E7E5E4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
              </div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[14px] text-[#0F172A] font-medium">Practice recommendations</span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-10 h-6 bg-[#E7E5E4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
              </div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[14px] text-[#0F172A] font-medium">Project analysis completed</span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-10 h-6 bg-[#E7E5E4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
              </div>
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-2 mb-3 border-b border-[#E7E5E4] pb-4">
            <Shield className="w-4 h-4 text-[#4F46E5]" /> Privacy
          </h2>
          <p className="text-[13px] text-[#64748B] mb-5">
            Manage how RepoViva handles your project analysis data.
          </p>
          
          <div className="space-x-3">
            <button className="bg-[#FFFFFF] border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
              Delete project data
            </button>
            <button className="bg-[#FFFFFF] border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-colors">
              Delete interview history
            </button>
          </div>
        </section>

        {/* Account */}
        <section className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#0F172A] mb-5">Account</h2>
          <button className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] text-[14px] font-semibold transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </section>

      </div>
    </div>
  );
}
