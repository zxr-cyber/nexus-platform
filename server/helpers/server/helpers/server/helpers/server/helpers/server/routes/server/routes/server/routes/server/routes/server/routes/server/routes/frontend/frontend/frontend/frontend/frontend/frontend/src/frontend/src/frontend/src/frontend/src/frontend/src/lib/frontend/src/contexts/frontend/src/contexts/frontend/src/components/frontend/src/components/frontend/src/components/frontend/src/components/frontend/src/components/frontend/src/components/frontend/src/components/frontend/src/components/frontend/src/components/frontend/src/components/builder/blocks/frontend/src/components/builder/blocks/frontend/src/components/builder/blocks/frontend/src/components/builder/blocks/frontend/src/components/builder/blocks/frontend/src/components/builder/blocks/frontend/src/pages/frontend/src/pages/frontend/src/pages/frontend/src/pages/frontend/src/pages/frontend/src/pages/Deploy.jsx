// frontend/src/pages/Deploy.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card, Button } from '../components';

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
      <h1 className="text-3xl font-bold gradient-text-pink mb-4">🚀 Deployments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deployments.map(d => (
          <Card key={d.id}>
            <h3 className="font-semibold">{d.name}</h3>
            <p className="text-xs text-text-muted">{d.subdomain}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => window.open(`https://${d.subdomain}.nexuslaunch.app`)}>Visit</Button>
              <Button variant="ghost" size="sm">Download Source</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
