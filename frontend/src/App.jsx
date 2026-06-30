import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div style={{ color: 'white', padding: '20px' }}>🏠 Home Page</div>;
}

function About() {
  return <div style={{ color: 'white', padding: '20px' }}>📄 About Page</div>;
}

function App() {
  return (
    <HashRouter>
      <nav style={{ padding: '10px', background: '#222', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white' }}>Home</Link>
        <Link to="/about" style={{ color: 'white' }}>About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
