import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('deployments').select('*');
      setProjects(data || []);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-500 mb-6">Dashboard</h1>
      <p className="text-gray-400 mb-4">Welcome, {user?.email}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-400">{p.subdomain}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
