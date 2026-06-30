import React from 'react';

export const BlockPalette = ({ onAddBlock }) => {
  const blocks = ['hero', 'text', 'image', 'form', 'gallery', 'table'];
  return (
    <div className="flex flex-wrap gap-2">
      {blocks.map(type => (
        <button key={type} onClick={() => onAddBlock(type)} className="px-3 py-1 bg-surface-2 rounded-lg text-sm hover:bg-white/10 transition capitalize">
          {type}
        </button>
      ))}
    </div>
  );
};
