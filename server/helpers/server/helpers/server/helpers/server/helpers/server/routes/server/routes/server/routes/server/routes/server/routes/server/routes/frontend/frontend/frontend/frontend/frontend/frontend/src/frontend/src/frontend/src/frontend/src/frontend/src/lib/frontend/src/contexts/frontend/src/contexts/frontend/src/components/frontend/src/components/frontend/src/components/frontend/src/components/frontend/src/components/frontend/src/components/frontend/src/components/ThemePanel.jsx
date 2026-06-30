import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemePanel = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="glass-premium p-4 space-y-3">
      <h4 className="font-semibold">Theme</h4>
      <input
        type="color"
        value={theme.primary}
        onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
        className="w-full"
      />
      <p className="text-xs text-text-muted">Primary color</p>
    </div>
  );
};
