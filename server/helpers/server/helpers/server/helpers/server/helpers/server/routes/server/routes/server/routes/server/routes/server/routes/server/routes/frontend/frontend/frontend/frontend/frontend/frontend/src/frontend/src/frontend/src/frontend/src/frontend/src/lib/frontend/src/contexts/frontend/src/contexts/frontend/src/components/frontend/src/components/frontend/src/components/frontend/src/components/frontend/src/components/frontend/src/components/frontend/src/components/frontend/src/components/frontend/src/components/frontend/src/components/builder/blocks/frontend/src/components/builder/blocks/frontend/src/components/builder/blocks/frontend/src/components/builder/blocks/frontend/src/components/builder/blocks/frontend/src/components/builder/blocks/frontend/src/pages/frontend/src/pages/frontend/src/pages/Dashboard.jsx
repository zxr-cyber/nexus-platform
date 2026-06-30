// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components';

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold gradient-text-pink">Dashboard</h1>
        <Button>New Project</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <Card key={p.id}>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-xs text-text-muted">{p.subdomain}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
