import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Wallet } from 'lucide-react';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Reports from './pages/Reports.jsx';
import Home from './pages/Home.jsx';

// Create Auth Context
export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// API URL helper
const API_URL = ''; // Proxied through Vite server configuration

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Authenticate user on startup if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
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
    const response = await fetch('/api/auth/login', {
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
    const response = await fetch('/api/auth/register', {
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

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '1rem',
        background: '#0b0f19'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid rgba(16, 185, 129, 0.1)',
          borderTopColor: '#10b981',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#94a3b8', fontFamily: 'Outfit', fontWeight: 500 }}>Initializing Wealth Secure Dashboard...</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { to { transform: rotate(360deg); } }
        `}} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
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
        </div>

        <div className="nav-user">
          <span className="user-tag">Welcome, {user.name}</span>
          <button className="btn-logout" onClick={logout} title="Sign Out">
            <LogOut size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Logout
          </button>
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
