import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Simple pages (no auth)
const Login = () => <div style={{ color: 'white', padding: '20px' }}>🔐 Login</div>;
const Dashboard = () => <div style={{ color: 'white', padding: '20px' }}>📊 Dashboard</div>;

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
