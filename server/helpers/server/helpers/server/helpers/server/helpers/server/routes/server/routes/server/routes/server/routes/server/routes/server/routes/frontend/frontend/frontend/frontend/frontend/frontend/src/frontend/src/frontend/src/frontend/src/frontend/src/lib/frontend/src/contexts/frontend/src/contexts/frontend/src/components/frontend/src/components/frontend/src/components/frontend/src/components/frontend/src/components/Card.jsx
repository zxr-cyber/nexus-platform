import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`glass-premium rounded-2xl p-6 transition hover:border-primary/20 ${className}`}>
    {children}
  </div>
);
