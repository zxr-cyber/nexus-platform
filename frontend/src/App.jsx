import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

// Lazy load pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Generate = lazy(() => import('./pages/Generate'));
const Builder = lazy(() => import('./pages/Builder'));
const Deploy = lazy(() => import('./pages/Deploy'));
const PublishedPage = lazy(() => import('./pages/PublishedPage'));

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Suspense fallback={<div className="flex items-center justify-center h-screen text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/p/:slug" element={<PublishedPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/builder/:id?" element={<Builder />} />
                <Route path="/deploy" element={<Deploy />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
