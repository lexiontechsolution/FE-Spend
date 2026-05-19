import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import { Wallet, Mail, Lock, User, AlertCircle, Shield, TrendingUp, Check } from 'lucide-react';

export default function Login({ initialIsRegister = false }) {
  const { login, register } = useAuth();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(initialIsRegister);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state and tab title with route pathname
  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsRegister(true);
      document.title = "Create Your Free Account | SpendTracker";
    } else if (location.pathname === '/login') {
      setIsRegister(false);
      document.title = "Secure Client Authorization | SpendTracker";
    }
    setError('');
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.name) {
          throw new Error('Please enter your name');
        }
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <style dangerouslySetInnerHTML={{__html: `
        .login-page-container {
          background: #060913;
          color: #f8fafc;
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }
        .login-content-split {
          display: flex;
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem 5% 4rem;
          gap: 4rem;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }
        .login-left-marketing {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: left;
        }
        .marketing-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.06);
          color: #10b981;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(16, 185, 129, 0.15);
          width: fit-content;
        }
        .marketing-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .marketing-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .marketing-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .marketing-icon-box {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(16, 185, 129, 0.2);
          flex-shrink: 0;
        }
        .marketing-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .marketing-item-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
        }
        .marketing-item-desc {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
          font-family: 'Inter', sans-serif;
        }

        .login-right-form {
          flex: 0.9;
          width: 100%;
          max-width: 460px;
          position: relative;
        }
        .login-glass-card {
          background: rgba(15, 22, 42, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6);
          position: relative;
          backdrop-filter: blur(15px);
        }
        .login-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%, rgba(16,185,129,0.15) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .login-form-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .login-form-logo svg {
          stroke: #10b981;
          filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
        }
        .login-form-subtitle {
          text-align: center;
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 2.25rem;
          font-family: 'Inter', sans-serif;
        }

        /* Decorative background blobs specific to login page */
        .login-glow-blob {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          z-index: 0;
          pointer-events: none;
          opacity: 0.35;
        }
        .login-glow-blob-1 {
          top: 20%;
          left: -100px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 100%);
        }
        .login-glow-blob-2 {
          bottom: 10%;
          right: -100px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 100%);
        }

        @media (max-width: 900px) {
          .login-content-split {
            flex-direction: column;
            padding: 8rem 1.5rem 4rem;
            gap: 3rem;
          }
          .login-left-marketing {
            text-align: center;
            align-items: center;
          }
          .marketing-title {
            font-size: 2.5rem;
            text-align: center;
          }
          .marketing-list {
            display: none; /* Hide marketing list on mobile for compactness */
          }
        }
      `}} />

      {/* Decorative Blobs */}
      <div className="login-glow-blob login-glow-blob-1" />
      <div className="login-glow-blob login-glow-blob-2" />

      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <Wallet size={28} />
          <span>SpendTracker</span>
        </Link>
        <nav className="landing-nav">
          <Link to="/" state={{ scrollTo: 'pricing' }} className="nav-item">Pricing</Link>
          <Link to="/" state={{ scrollTo: 'features' }} className="nav-item">Features</Link>
        </nav>
        <div className="header-actions">
          {isRegister ? (
            <Link to="/login" className="btn-landing-login">Login</Link>
          ) : (
            <Link to="/signup" className="btn-landing-signup">Sign Up</Link>
          )}
        </div>
      </header>

      <div className="login-content-split">
        {/* Left Side: Marketing Info */}
        <div className="login-left-marketing">
          <div className="marketing-badge">
            <Shield size={14} />
            <span>Secure Cloud Infrastructure</span>
          </div>
          <h2 className="marketing-title">Track Every Rupee.<br />Build Lasting Wealth.</h2>
          <div className="marketing-list">
            <div className="marketing-item">
              <div className="marketing-icon-box">
                <TrendingUp size={20} />
              </div>
              <div className="marketing-text">
                <span className="marketing-item-title">Capital Velocity Analytics</span>
                <span className="marketing-item-desc">Watch your savings grow month-over-month with automated progression charts and indexes.</span>
              </div>
            </div>

            <div className="marketing-item">
              <div className="marketing-icon-box">
                <Check size={20} />
              </div>
              <div className="marketing-text">
                <span className="marketing-item-title">Strict Category Checks</span>
                <span className="marketing-item-desc">Never look back at a blank receipt. Enforced validation requires descriptions when writing 'Others'.</span>
              </div>
            </div>

            <div className="marketing-item">
              <div className="marketing-icon-box">
                <Wallet size={20} />
              </div>
              <div className="marketing-text">
                <span className="marketing-item-title">Dynamic Rupee Formatting</span>
                <span className="marketing-item-desc">All indicators, tables, and graphs configured specifically for Indian Currency (₹) formatting.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Glass Card form */}
        <div className="login-right-form">
          <div className="login-glass-card">
            <div className="login-form-logo">
              <Wallet size={32} />
              <span>SpendTracker</span>
            </div>
            
            <p className="login-form-subtitle">
              {isRegister ? 'Begin your journey to financial clarity' : 'Securely access your wealth stats'}
            </p>

            {error && (
              <div className="auth-alert">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-control"
                      style={{ paddingLeft: '2.75rem' }}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. yourname@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-control"
                    style={{ paddingLeft: '2.75rem' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label className="form-label" htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-control"
                    style={{ paddingLeft: '2.75rem' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', fontWeight: 700 }}
                disabled={loading}
              >
                {loading 
                  ? (isRegister ? 'Creating Secure Account...' : 'Authorizing Session...') 
                  : (isRegister ? 'Create Free Account' : 'Sign In To Dashboard')}
              </button>
            </form>

            <div className="auth-toggle">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <Link to="/login" className="auth-toggle-link">
                    Sign In
                  </Link>
                </span>
              ) : (
                <span>
                  New to SpendTracker?{' '}
                  <Link to="/signup" className="auth-toggle-link">
                    Register Now
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
