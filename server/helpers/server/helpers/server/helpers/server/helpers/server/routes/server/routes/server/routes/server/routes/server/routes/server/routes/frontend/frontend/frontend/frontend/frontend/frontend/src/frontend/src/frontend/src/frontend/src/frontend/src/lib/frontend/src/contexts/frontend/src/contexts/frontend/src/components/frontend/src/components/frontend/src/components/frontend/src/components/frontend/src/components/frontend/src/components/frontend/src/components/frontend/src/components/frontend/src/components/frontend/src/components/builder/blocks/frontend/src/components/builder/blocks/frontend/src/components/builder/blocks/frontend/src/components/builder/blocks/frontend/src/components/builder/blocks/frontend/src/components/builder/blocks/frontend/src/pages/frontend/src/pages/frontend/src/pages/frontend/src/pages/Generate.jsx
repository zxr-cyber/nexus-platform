// frontend/src/pages/Generate.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, Button, Input } from '../components';

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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.status === 'missing_env') {
        alert('Missing keys: ' + data.keys.join(', '));
        return;
      }
      setResult(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text-pink mb-4">✨ AI Generator</h1>
      <Card className="mb-6">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your app..."
          rows={4}
          className="w-full p-3 bg-surface-2 border border-border rounded-xl text-text"
        />
        <Button onClick={handleGenerate} disabled={loading} className="mt-3">
          {loading ? 'Generating...' : 'Generate & Deploy'}
        </Button>
      </Card>
      {result && (
        <Card>
          <p className="text-green-400">✅ Deployed!</p>
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{result.url}</a>
        </Card>
      )}
    </div>
  );
}
