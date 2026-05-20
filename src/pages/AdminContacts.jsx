import React, { useState, useEffect } from 'react';
import { useAuth, API_URL, ThemeToggle } from '../App.jsx';
import { 
  Shield, MessageSquare, Clock, Calendar, Mail, FileText, Trash2, CheckCircle 
} from 'lucide-react';

export default function AdminContacts() {
  const { token, user } = useAuth();
  const [contactsList, setContactsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Inbound Enquiries | SpendTracker Admin";
    if (user && user.role === 'admin') {
      fetchContacts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve contact message logs.');
      }

      const data = await response.json();
      setContactsList(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error loading contact entries.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to permanently delete this contact inquiry?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setContactsList(prev => prev.filter(c => c._id !== contactId));
      } else {
        alert('Failed to delete contact inquiry.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting contact inquiry.');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-denied-container" style={{
        minHeight: '100vh',
        background: 'var(--bg-deep)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'Outfit, sans-serif'
      }}>
        <div style={{
          background: 'var(--color-danger-glow)',
          border: '1px solid var(--border-glass)',
          padding: '3rem',
          borderRadius: '24px',
          maxWidth: '500px',
          backdropFilter: 'var(--blur-glass)'
        }}>
          <Shield size={64} style={{ color: 'var(--color-danger)', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.3))' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Restricted Directory Access</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            This page is reserved strictly for Super Admin operations. Your account clearance level is insufficient.
          </p>
          <a href="/dashboard" style={{
            background: 'linear-gradient(135deg, var(--color-success) 0%, hsl(162, 84%, 30%) 100%)',
            color: '#fff',
            padding: '0.75rem 1.75rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}>
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <style dangerouslySetInnerHTML={{__html: `
        .admin-page-container {
          background: var(--bg-deep);
          color: var(--text-primary);
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          padding: 2.5rem 2rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 1.5rem;
        }
        .admin-title-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .admin-badge-icon {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .admin-title-main {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .admin-title-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
          font-family: 'Inter', sans-serif;
        }

        /* Glassmorphic Card */
        .admin-data-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          box-shadow: var(--shadow-premium);
        }

        .admin-table-wrapper {
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-family: 'Inter', sans-serif;
        }
        .admin-table th {
          padding: 1rem 1.25rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-glass-hover);
        }
        .admin-table td {
          padding: 1.25rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-glass);
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .admin-table tr:hover td {
          background: var(--table-tr-hover);
        }

        /* Message details card */
        .msg-detail-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 1.25rem;
          margin-top: 0.5rem;
          white-space: pre-wrap;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .admin-loader-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          gap: 1rem;
          color: var(--text-muted);
        }
      `}} />

      <div className="admin-header">
        <div className="admin-title-box">
          <div className="admin-badge-icon">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="admin-title-main">Support & Contact Inquiries</h1>
            <p className="admin-title-sub">Superadmin view only — audit user enquiries submitted on the site</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/admin" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            color: '#e2e8f0',
            padding: '0.65rem 1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            Admin Desk
          </a>
          <a href="/dashboard" style={{
            background: 'linear-gradient(135deg, var(--color-success) 0%, hsl(162, 84%, 30%) 100%)',
            color: '#fff',
            padding: '0.65rem 1.25rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            Dashboard
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Error prompt */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          {error}
        </div>
      )}

      {/* Main card */}
      <div className="admin-data-card">
        {loading ? (
          <div className="admin-loader-box">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(16, 185, 129, 0.1)',
              borderTopColor: '#10b981',
              animation: 'spin 1s linear infinite'
            }} />
            <style dangerouslySetInnerHTML={{__html: `@keyframes spin { to { transform: rotate(360deg); } }`}} />
            <p>Fetching user contact messages...</p>
          </div>
        ) : (
          <div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender Info</th>
                    <th>Topic Subject</th>
                    <th>Inquiry Details</th>
                    <th>Submitted Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactsList.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>No enquiries registered.</td>
                    </tr>
                  ) : (
                    contactsList.map((msg) => (
                      <tr key={msg._id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{msg.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                            <Mail size={12} /> {msg.email}
                          </div>
                        </td>
                        <td style={{ fontWeight: 600, color: '#cbd5e1' }}>{msg.subject}</td>
                        <td style={{ maxWidth: '350px' }}>
                          <div className="msg-detail-card">
                            {msg.message}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                            <Clock size={14} />
                            {new Date(msg.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                          </div>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDeleteContact(msg._id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748b',
                              cursor: 'pointer',
                              transition: 'color 0.2s ease',
                              padding: '0.25rem'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                            title="Delete Inquiry Log"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
