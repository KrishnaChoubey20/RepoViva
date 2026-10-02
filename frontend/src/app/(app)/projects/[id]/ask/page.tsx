"use client";

import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AskAIPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id: project_id } = unwrappedParams;
  
  const [project, setProject] = useState<any>(null);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data } = await supabase.from('projects').select('*').eq('id', project_id).single();
      setProject(data);
      setLoading(false);
      setMessages([{ role: 'assistant', content: "Hello! I am your AI project assistant. You can ask me anything about your repository's architecture, issues, or code."}]);
    }
    init();
  }, [project_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newMessages = [...messages, { role: 'user', content: input.trim() }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          project_id, 
          // We only send recent context to the AI (filter out the greeting if we want, but it's fine)
          messages: newMessages.filter(m => m.role === 'user' || m.role === 'assistant')
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error while processing that." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center h-[50vh] items-center"><Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" /></div>;
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-8 flex flex-col h-[calc(100vh-72px)] pb-10">
      
      <div className="flex items-center justify-between shrink-0 mb-6">
        <Link href={`/projects/${project_id}`} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Project
        </Link>
        <div className="text-[14px] font-semibold text-[#0F172A] flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#4F46E5]" /> AI Assistant
        </div>
      </div>

      <div className="flex-1 bg-white border border-[#E7E5E4] rounded-[18px] shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#EEF0FF] text-[#4F46E5]' : 'bg-[#F8F6F1] text-[#0F172A] border border-[#E7E5E4]'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-[14px] px-5 py-3.5 text-[14px] leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#4F46E5] text-white' : 'bg-[#F8F6F1] text-[#0F172A] border border-[#E7E5E4]'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F8F6F1] text-[#0F172A] border border-[#E7E5E4] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#F8F6F1] border border-[#E7E5E4] rounded-[14px] px-5 py-3.5 flex items-center gap-2 text-[#64748B]">
                <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="p-4 bg-white border-t border-[#E7E5E4]">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about this project..."
              className="w-full bg-[#F8F6F1] border border-[#E7E5E4] text-[#0F172A] text-[14px] rounded-[12px] pl-4 pr-12 py-3.5 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-[8px] bg-[#4F46E5] text-white disabled:opacity-50 transition-opacity"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
