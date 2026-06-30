import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// === PAGES (Ringkas, Tanpa Auth Dulu) ===
function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#ec4899' }}>🚀 Nexus AI</h1>
      <p>Platform Siap! 🎉</p>
      <p style={{ fontSize: '14px', color: '#888' }}>Klik menu di bawah untuk navigasi.</p>
    </div>
  );
}

function Login() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#ec4899' }}>🔐 Login</h1>
      <p>Halaman login (ringkas).</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#ec4899' }}>📊 Dashboard</h1>
      <p>Selamat datang! Ini dashboard anda.</p>
    </div>
  );
}

function Generate() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#ec4899' }}>✨ AI Generator</h1>
      <p>Taip arahan untuk hasilkan app.</p>
    </div>
  );
}

function Deploy() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#ec4899' }}>🚀 Deploy</h1>
      <p>Senarai deployment anda.</p>
    </div>
  );
}

function Builder() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', padding: '20px' }}>
      <h1 style={{ color: '#ec4899' }}>🛠️ Builder</h1>
      <p>Visual editor akan muncul di sini.</p>
    </div>
  );
}

// === NAVIGATION ===
function Nav() {
  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '12px 20px',
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      borderBottom: '1px solid #333'
    }}>
      <Link to="/" style={{ color: '#ec4899', textDecoration: 'none' }}>🏠 Home</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/generate" style={{ color: 'white', textDecoration: 'none' }}>Generate</Link>
      <Link to="/builder" style={{ color: 'white', textDecoration: 'none' }}>Builder</Link>
      <Link to="/deploy" style={{ color: 'white', textDecoration: 'none' }}>Deploy</Link>
    </nav>
  );
}

// === MAIN APP ===
function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/deploy" element={<Deploy />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
