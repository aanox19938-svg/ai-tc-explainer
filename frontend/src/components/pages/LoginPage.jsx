import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { LogIn, UserPlus, Loader2, FileText } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(endpoint, formData);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-primary-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <p className="text-gray-600 mt-1">{isLogin ? 'Sign in to analyze your documents' : 'Start understanding legal documents today'}</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" required className="input-field" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="John Doe" /></div>}
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" /></div>
            {!isLogin && <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label><input type="tel" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 234 567 8900" /></div>}
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" required minLength={6} className="input-field" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" /></div>
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : isLogin ? <><LogIn className="h-5 w-5" /> Sign In</> : <><UserPlus className="h-5 w-5" /> Create Account</>}</button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary-600 hover:text-primary-700 font-medium text-sm">{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}