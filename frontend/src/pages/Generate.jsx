import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate/app`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) { alert(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-500 mb-4">✨ AI Generator</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe your app..." rows={4} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" />
        <button onClick={handleGenerate} disabled={loading} className="mt-4 w-full py-3 bg-pink-600 rounded-xl">{loading ? 'Generating...' : 'Generate & Deploy'}</button>
        {result && <div className="mt-4 p-4 bg-green-500/20 rounded-xl"><p className="text-green-400">✅ Deployed!</p><a href={result.url} target="_blank" className="text-pink-500 underline">{result.url}</a></div>}
      </div>
    </div>
  );
}
