'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginContent() {
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
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
        )}
        Continue with GitHub
      </button>
      
      <p className="mt-6 text-[13px] text-[#64748B]">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <Suspense fallback={
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-8 md:p-10 shadow-sm w-full max-w-[440px] text-center flex justify-center min-h-[300px] items-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  )
}
