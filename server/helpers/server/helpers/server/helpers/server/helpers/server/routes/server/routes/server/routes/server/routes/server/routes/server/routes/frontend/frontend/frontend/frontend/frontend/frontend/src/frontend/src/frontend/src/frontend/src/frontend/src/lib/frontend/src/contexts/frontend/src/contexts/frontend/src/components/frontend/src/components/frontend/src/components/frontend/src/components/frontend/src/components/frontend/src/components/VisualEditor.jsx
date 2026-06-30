import React, { useState } from 'react';

export const VisualEditor = ({ previewUrl }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="relative w-full h-full">
      <button
        onClick={() => setEditMode(!editMode)}
        className="absolute top-2 right-2 z-20 px-3 py-1 glass-premium text-xs"
      >
        {editMode ? 'Exit Edit' : 'Edit'}
      </button>
      <iframe src={previewUrl} className="w-full h-full rounded-xl border border-white/5" />
    </div>
  );
};
