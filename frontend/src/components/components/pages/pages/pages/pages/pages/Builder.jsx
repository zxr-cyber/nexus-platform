import React from 'react';
import { useParams } from 'react-router-dom';

export default function Builder() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Builder {id && `- Project ${id}`}</h1>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-96 flex items-center justify-center text-gray-400">🛠️ Visual Editor akan muncul di sini</div>
    </div>
  );
}
