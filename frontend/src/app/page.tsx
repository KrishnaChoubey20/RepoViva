"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GitBranch, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!url.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL.');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: url })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze repository');
      }

      router.push(`/project/${data.project_id}?session_id=${data.session_id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl mb-4">
            <GitBranch className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            RepoViva
          </h1>
          <p className="text-lg text-slate-400">
            Your code. Your voice. Your interview. <br/>
            Practice explaining your GitHub projects with AI-driven questions.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <GitBranch className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="url"
              placeholder="https://github.com/owner/repo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !url}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-4 px-8 font-semibold flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Reading project files...</span>
              </>
            ) : (
              <>
                <span>Analyze Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          RepoViva analyzes repository text only. Do not submit code you do not have permission to share.
        </p>
      </motion.div>
    </div>
  );
}
