import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Deploy() {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('deployments').select('*');
      setDeployments(data || []);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-500 mb-4">🚀 Deployments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deployments.map(d => (
          <div key={d.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <h3 className="font-semibold">{d.name}</h3>
            <p className="text-sm text-gray-400">{d.subdomain}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
