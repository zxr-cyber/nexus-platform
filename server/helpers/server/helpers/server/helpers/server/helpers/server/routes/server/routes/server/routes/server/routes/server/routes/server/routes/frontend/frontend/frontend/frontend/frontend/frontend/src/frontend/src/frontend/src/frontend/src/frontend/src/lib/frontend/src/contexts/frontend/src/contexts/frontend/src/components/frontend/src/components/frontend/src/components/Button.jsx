import React from 'react';

export const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/25',
    secondary: 'bg-surface-2 text-text-secondary hover:bg-white/10',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    ghost: 'text-text-secondary hover:text-white hover:bg-white/5',
  };

  return (
    <button
      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
