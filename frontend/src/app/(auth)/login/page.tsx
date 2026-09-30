'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Github, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleGitHubLogin = async () => {
    setLoading(true)
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] p-4">
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-8 md:p-10 shadow-sm w-full max-w-[440px] text-center animate-in fade-in zoom-in-95 duration-500">
        
        <div className="mb-8 flex justify-center">
          <div className="w-12 h-12 bg-[#4F46E5] text-white flex items-center justify-center rounded-[12px] font-bold text-xl shadow-sm">
            R
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Welcome to RepoViva</h1>
        <p className="text-[15px] text-[#64748B] mb-8 leading-relaxed">
          AI that knows the project you built and prepares you to defend it.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            Authentication failed. Please try again.
          </div>
        )}

        <button
          onClick={handleGitHubLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-3 rounded-[12px] font-semibold text-[15px] transition-all disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Github className="w-5 h-5" />
          )}
          Continue with GitHub
        </button>
        
        <p className="mt-6 text-[13px] text-[#64748B]">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
