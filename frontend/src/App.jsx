import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// ============================================================
// SUPABASE
// ============================================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);
const API_URL = import.meta.env.VITE_API_URL || 'https://nexus-backend-29dg.onrender.com';

// ============================================================
// AUTH CONTEXT
// ============================================================
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() { return React.useContext(AuthContext); }

// ============================================================
// PROTECTED ROUTE
// ============================================================
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// ============================================================
// LAYOUT
// ============================================================
function Layout({ children }) {
  const { signOut } = useAuth();
  const location = window.location.hash;
  const navItems = [
    { icon: '📊', label: 'Dashboard', path: '/' },
    { icon: '✨', label: 'Generate', path: '/generate' },
    { icon: '🚀', label: 'Deploy', path: '/deploy' },
  ];
  const isActive = (path) => location === `#${path}` || location === `#${path}/`;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white' }}>
      <nav style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <Link to="/" style={{ color: '#ec4899', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
          🚀 NexusAI
        </Link>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              color: isActive(item.path) ? '#ec4899' : '#aaa',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>{item.icon} {item.label}</Link>
          ))}
          <button onClick={signOut} style={{
            background: 'none',
            border: '1px solid #555',
            color: '#aaa',
            padding: '4px 12px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>🚪 Logout</button>
        </div>
      </nav>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// LOGIN PAGE
// ============================================================
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try { await signIn(email, password); navigate('/'); } 
    catch (err) { setError(err.message); }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0f' }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: '#ec4899', fontSize: '28px' }}>🔐 Login</h1>
        <p style={{ color: '#888', marginBottom: '24px' }}>Sign in to NexusAI</p>
        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} required />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#ec4899', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Sign In</button>
        </form>
        <p style={{ color: '#888', marginTop: '16px', textAlign: 'center' }}>Don't have an account? <Link to="/register" style={{ color: '#ec4899' }}>Register</Link></p>
      </div>
    </div>
  );
}

// ============================================================
// REGISTER PAGE
// ============================================================
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try { await signUp(email, password); navigate('/'); } 
    catch (err) { setError(err.message); }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0f' }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: '#ec4899', fontSize: '28px' }}>📝 Register</h1>
        <p style={{ color: '#888', marginBottom: '24px' }}>Create your account</p>
        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} required />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#ec4899', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Register</button>
        </form>
        <p style={{ color: '#888', marginTop: '16px', textAlign: 'center' }}>Already have an account? <Link to="/login" style={{ color: '#ec4899' }}>Sign In</Link></p>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    supabase.from('deployments').select('*').then(({ data }) => setProjects(data || []));
  }, []);

  return (
    <div>
      <h1 style={{ color: '#ec4899', fontSize: '32px' }}>📊 Dashboard</h1>
      <p style={{ color: '#888' }}>Welcome, {user?.email}!</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
        {projects.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#888' }}>
            No projects yet. Go to Generate!
          </div>
        ) : (
          projects.map(p => (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
              <h3 style={{ color: 'white' }}>{p.name}</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>{p.subdomain}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// GENERATE — INI YANG PALING PENTING!
// ============================================================
function Generate() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${API_URL}/api/generate/app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#ec4899', fontSize: '32px' }}>✨ AI App Generator</h1>
      <p style={{ color: '#888', marginBottom: '20px' }}>Describe your app — AI will build and deploy it!</p>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px' }}>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g., Build a task manager with dark purple theme, add/delete tasks..."
          rows={5}
          style={{ width: '100%', padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '16px', resize: 'vertical', outline: 'none' }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          style={{ marginTop: '16px', padding: '14px 32px', background: loading ? '#666' : '#ec4899', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? '⏳ Generating... (1-2 min)' : '🚀 Generate & Deploy'}
        </button>
        {error && <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#ef4444' }}>❌ {error}</div>}
        {result && (
          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px' }}>
            <p style={{ color: '#22c55e', fontWeight: 'bold' }}>✅ App Deployed!</p>
            <a href={result.url} target="_blank" rel="noopener noreferrer" style={{ color: '#ec4899', wordBreak: 'break-all' }}>🌐 {result.url}</a>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DEPLOY
// ============================================================
function Deploy() {
  const [deployments, setDeployments] = useState([]);
  useEffect(() => {
    supabase.from('deployments').select('*').then(({ data }) => setDeployments(data || []));
  }, []);

  return (
    <div>
      <h1 style={{ color: '#ec4899', fontSize: '32px' }}>🚀 Deployments</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
        {deployments.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#888' }}>
            No deployments.
          </div>
        ) : (
          deployments.map(d => (
            <div key={d.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
              <h3 style={{ color: 'white' }}>{d.name}</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>{d.subdomain}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// PUBLISHED PAGE
// ============================================================
function PublishedPage() {
  return <div style={{ color: 'white', padding: '20px' }}><h1 style={{ color: '#ec4899' }}>📄 Published Page</h1></div>;
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/p/:slug" element={<PublishedPage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/generate" element={<Generate />} />
                  <Route path="/deploy" element={<Deploy />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
