import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const EnvPopup = ({ keys, sessionId, onResume, onCancel }) => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ sessionId, envVars: values }),
      });
      const data = await res.json();
      onResume(data);
    } catch (e) { alert(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="glass-premium w-full max-w-md p-6">
        <h3 className="text-lg font-bold">🔑 Keys Required</h3>
        {keys.map(k => (
          <input key={k} placeholder={k} className="w-full p-2 bg-surface-2 border border-border rounded mt-2" value={values[k]||''} onChange={e=>setValues({...values,[k]:e.target.value})} />
        ))}
        <button onClick={handleSubmit} className="mt-4 w-full py-2 gradient-pink rounded-xl">Submit</button>
      </div>
    </div>
  );
};
