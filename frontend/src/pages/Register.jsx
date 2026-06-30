import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await signUp(email, password); navigate('/'); } 
    catch (err) { alert(err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f]">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-pink-500">NexusAI</h1>
        <p className="text-gray-400 mb-4">Create your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" required />
          <button type="submit" className="w-full py-3 bg-pink-600 rounded-xl hover:bg-pink-700 transition">Register</button>
        </form>
        <p className="text-center text-gray-400 mt-4">Already have an account? <Link to="/login" className="text-pink-500">Sign in</Link></p>
      </div>
    </div>
  );
}
