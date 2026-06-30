import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Layout, Sparkles, Globe, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Sparkles, label: 'Generate', path: '/generate' },
    { icon: Layout, label: 'Builder', path: '/builder' },
    { icon: Globe, label: 'Deploy', path: '/deploy' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-premium border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text-pink">NexusAI</Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm transition ${
                  location.pathname === item.path ? 'text-primary' : 'text-text-secondary hover:text-text'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <button onClick={signOut} className="text-text-secondary hover:text-text">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-premium border-t border-white/5">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                location.pathname === item.path ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
