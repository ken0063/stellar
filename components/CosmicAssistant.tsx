
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const CosmicAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const insight = await geminiService.getCosmicInsight(input);
      setResponse(insight);
    } catch (err) {
      console.error(err);
      setResponse("The cosmic connection was interrupted. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Stellar AI Assistant
        </h2>
        <p className="text-slate-400 text-lg">Ask anything about the cosmos, and let the AI guide your curiosity.</p>
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] border-slate-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="relative mb-8">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What is a neutron star? / Explain the expansion of the universe..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Seek Insight</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </>
            )}
          </button>
        </form>

        {response && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
               </div>
               <div className="flex-1 bg-slate-900/80 rounded-3xl p-6 border border-slate-700/50">
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{response}</p>
               </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Black Holes', 'Exoplanets', 'Dark Matter'].map((topic) => (
          <button
            key={topic}
            onClick={() => setInput(topic)}
            className="p-4 rounded-2xl glass-panel border-slate-800 hover:border-slate-600 transition-all text-slate-400 hover:text-white text-sm"
          >
            Quick Ask: {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CosmicAssistant;
