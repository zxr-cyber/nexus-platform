import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm text-text-secondary">{label}</label>}
    <input
      className={`w-full px-4 py-3 bg-surface-2 border ${
        error ? 'border-red-500' : 'border-border'
      } rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${className}`}
      {...props}
    />
    {error && <p className="text-sm text-red-400">{error}</p>}
  </div>
);
