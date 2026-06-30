import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// Simple pages (no lazy, no auth)
function Home() {
  return <div style={{ color: 'white', padding: '20px' }}>🏠 Home - Test</div>;
}

function Login() {
  return <div style={{ color: 'white', padding: '20px' }}>🔐 Login Page</div>;
}

function Dashboard() {
  return <div style={{ color: 'white', padding: '20px' }}>📊 Dashboard (No Auth)</div>;
}

function App() {
  return (
    <HashRouter>
      <nav style={{ padding: '10px', background: '#222', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white' }}>Home</Link>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
        <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
