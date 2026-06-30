// frontend/src/pages/Builder.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, BlockPalette } from '../components';

export default function Builder() {
  const { id } = useParams();
  const [blocks, setBlocks] = useState([]);

  const addBlock = (type) => {
    setBlocks([...blocks, { id: Date.now(), type, content: {} }]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text-pink mb-4">Builder {id && `- Project ${id}`}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Card>
            <BlockPalette onAddBlock={addBlock} />
          </Card>
          <Card className="mt-4">
            <h4 className="font-semibold">Blocks</h4>
            <ul className="text-sm space-y-1">
              {blocks.map((b, i) => <li key={b.id}>#{i+1} {b.type}</li>)}
            </ul>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Card className="h-[600px] bg-surface-2/50 flex items-center justify-center text-text-muted">
            Preview Area
          </Card>
        </div>
      </div>
    </div>
  );
}
