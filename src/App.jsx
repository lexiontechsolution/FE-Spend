import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Wallet, Shield, Users, MessageSquare, Sun, Moon } from 'lucide-react';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Reports from './pages/Reports.jsx';
import Home from './pages/Home.jsx';
import Pricing from './pages/Pricing.jsx';
import Contact from './pages/Contact.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminContacts from './pages/AdminContacts.jsx';

// Create Auth Context
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Create Theme Context
export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

// Theme Toggle Component
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme}
      className="btn-theme-toggle"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      style={{
        background: 'var(--border-glass)',
        border: '1px solid var(--border-glass-hover)',
        color: 'var(--text-primary)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        boxShadow: 'var(--shadow-premium)',
        marginLeft: '1rem',
        outline: 'none',
        flexShrink: 0,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--border-glass-hover)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--border-glass)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

// API URL helper
export const API_URL = import.meta.env.VITE_API_URL || 'https://be-spend-pozu.onrender.com';

// Scroll restoration helper for router path transitions
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('spend-theme') || 'light');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Apply theme to document element and sync to local storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('spend-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Authenticate user on startup if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token expired or invalid
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Auth Operations
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ id: data._id, name: data.name, email: data.email });
    return data;
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ id: data._id, name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '1rem',
          background: 'var(--bg-deep)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '3px solid rgba(16, 185, 129, 0.1)',
            borderTopColor: '#10b981',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'Outfit', fontWeight: 500 }}>Initializing Wealth Secure Dashboard...</p>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { to { transform: rotate(360deg); } }
          `}} />
        </div>
      ) : (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
          <Router>
            <ScrollToTop />
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={!user ? <Login initialIsRegister={true} /> : <Navigate to="/dashboard" />} />
                
                <Route path="/*" element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </AuthContext.Provider>
      )}
    </ThemeContext.Provider>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// Global App Layout for authenticated users
function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <Link to="/dashboard" className="nav-brand">
          <Wallet size={28} />
          <span>SpendTracker</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/reports" className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}>
            <FileText size={18} />
            <span>Reports</span>
          </Link>
          {user.role === 'admin' && (
            <>
              <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                <Shield size={18} />
                <span>Admin Panel</span>
              </Link>
              <Link to="/admin/users" className={`nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}>
                <Users size={18} />
                <span>User Directory</span>
              </Link>
              <Link to="/admin/contacts" className={`nav-link ${location.pathname === '/admin/contacts' ? 'active' : ''}`}>
                <MessageSquare size={18} />
                <span>Contact Inquiries</span>
              </Link>
            </>
          )}
        </div>

        <div className="nav-user">
          <span className="user-tag">Welcome, {user.name}</span>
          <button className="btn-logout" onClick={logout} title="Sign Out">
            <LogOut size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Logout
          </button>
          <ThemeToggle />
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </>
  );
}
