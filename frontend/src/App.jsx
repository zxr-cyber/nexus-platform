import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

// Import pages directly (no lazy loading - more stable)
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import Builder from './pages/Builder';
import Deploy from './pages/Deploy';
import PublishedPage from './pages/PublishedPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/p/:slug" element={<PublishedPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/builder/:id?" element={<Builder />} />
              <Route path="/deploy" element={<Deploy />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
