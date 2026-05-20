import React, { useState, useEffect } from 'react';
import { useAuth, API_URL, ThemeToggle } from '../App.jsx';
import { 
  Shield, Users, MessageSquare, Clock, Calendar, Mail, FileText, 
  CheckCircle, Trash2, X, ArrowUpRight, ArrowDownLeft, Wallet, AlertCircle 
} from 'lucide-react';

export default function AdminPanel() {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [usersList, setUsersList] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected user ledger inspection state
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserTransactions, setSelectedUserTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    document.title = "Control Desk | SpendTracker Admin";
    if (user && user.role === 'admin') {
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, [user, activeTab]);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = activeTab === 'users' ? 'users' : 'contacts';
      const response = await fetch(`${API_URL}/api/admin/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve control panel directory logs.');
      }

      const data = await response.json();
      if (activeTab === 'users') {
        setUsersList(data);
      } else {
        setContactsList(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error loading administrative records.');
    } finally {
      setLoading(false);
    }
  };

  // Inspect selected user transactions
  const handleInspectUser = async (userObj) => {
    setSelectedUser(userObj);
    setLoadingTransactions(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/users/${userObj._id}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve user transactions.');
      }
      const data = await response.json();
      setSelectedUserTransactions(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching user ledger data.');
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Delete transaction from selected user's ledger
  const handleDeleteUserTransaction = async (txId) => {
    if (!window.confirm('Are you sure you want to permanently delete this transaction from the user\'s ledger?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/transactions/${txId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setSelectedUserTransactions(prev => prev.filter(tx => tx._id !== txId));
      } else {
        alert('Failed to delete transaction.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting transaction.');
    }
  };

  // Math for selected inspected user
  const inspectTotalIncome = selectedUserTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const inspectTotalExpense = selectedUserTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const inspectTotalBalance = inspectTotalIncome - inspectTotalExpense;

  // If user is not admin, show Access Denied page
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
            This workspace requires Super Admin authorization. Your account credentials do not match the required clearance level.
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

        /* Tabs Navigation */
        .admin-tabs-nav {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          padding: 0.35rem;
          border-radius: 12px;
          align-self: flex-start;
          width: fit-content;
        }
        .admin-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .admin-tab-btn:hover {
          color: var(--text-primary);
        }
        .admin-tab-btn.active {
          background: #10b981;
          color: #fff;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }

        /* Stat Grid */
        .admin-stat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .admin-stat-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .admin-stat-lbl {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .admin-stat-val {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        /* Glassmorphic Data Table */
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

        .role-badge {
          display: inline-flex;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .role-badge.admin {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .role-badge.user {
          background: rgba(59, 130, 246, 0.08);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        /* Modal Overlay */
        .admin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 6, 12, 0.5);
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .admin-modal-card {
          background: var(--bg-deep);
          border: 1px solid var(--border-glass);
          border-radius: 24px;
          width: 100%;
          max-width: 900px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-premium);
          overflow: hidden;
          position: relative;
        }
        .admin-modal-header {
          padding: 1.75rem 2rem;
          border-bottom: 1px solid var(--border-glass);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-modal-body {
          padding: 2rem;
          overflow-y: auto;
          flex: 1;
        }

        .inspect-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .inspect-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 1rem;
        }
        .inspect-stat-lbl {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .inspect-stat-val {
          font-size: 1.3rem;
          font-weight: 800;
          margin-top: 0.25rem;
        }

        .btn-close-modal {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-close-modal:hover {
          background: var(--border-glass-hover);
          color: var(--text-primary);
        }

        .btn-inspect-action {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.45rem 0.95rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.2s ease;
        }
        .btn-inspect-action:hover {
          background: #10b981;
          color: #fff;
        }
      `}} />

      <div className="admin-header">
        <div className="admin-title-box">
          <div className="admin-badge-icon">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="admin-title-main">Super Admin Control Desk</h1>
            <p className="admin-title-sub">Manage user directory files and support inquiry channels</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/dashboard" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            color: '#e2e8f0',
            padding: '0.65rem 1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: 0.9,
            fontWeight: 600
          }}>
            Back to Dashboard
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <span className="admin-stat-lbl">Active System Users</span>
            <span className="admin-stat-val">{usersList.length}</span>
          </div>
          <Users size={32} style={{ color: '#3b82f6', opacity: 0.8 }} />
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <span className="admin-stat-lbl">Inbound Tickets</span>
            <span className="admin-stat-val">{contactsList.length}</span>
          </div>
          <MessageSquare size={32} style={{ color: '#10b981', opacity: 0.8 }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs-nav">
        <button 
          onClick={() => setActiveTab('users')} 
          className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
        >
          <Users size={16} /> User Directory
        </button>
        <button 
          onClick={() => setActiveTab('contacts')} 
          className={`admin-tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
        >
          <MessageSquare size={16} /> Contact Enquiries
        </button>
      </div>

      {/* Error state */}
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
            <p>Fetching database logs...</p>
          </div>
        ) : activeTab === 'users' ? (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: '#10b981' }} />
              Registered Accounts ({usersList.length})
            </h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>User Profile Name</th>
                    <th>Email Address</th>
                    <th>Clearing Role</th>
                    <th>Registration Date</th>
                    <th>Ledger Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>No users found.</td>
                    </tr>
                  ) : (
                    usersList.map((userObj) => (
                      <tr key={userObj._id}>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#64748b' }}>{userObj._id}</td>
                        <td style={{ fontWeight: 600, color: '#fff' }}>{userObj.name}</td>
                        <td>{userObj.email}</td>
                        <td>
                          <span className={`role-badge ${userObj.role === 'admin' ? 'admin' : 'user'}`}>
                            {userObj.role || 'user'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                            <Calendar size={14} />
                            {new Date(userObj.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleInspectUser(userObj)}
                            className="btn-inspect-action"
                          >
                            <FileText size={14} /> Inspect Ledger
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} style={{ color: '#10b981' }} />
              Submitted Contact Inquiries ({contactsList.length})
            </h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Topic Subject</th>
                    <th>Inquiry Details</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {contactsList.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>No contact inquiries found.</td>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Inspect User Ledger Modal */}
      {selectedUser && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Ledger: {selectedUser.name}</h3>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{selectedUser.email} (ID: {selectedUser._id})</span>
              </div>
              <button 
                className="btn-close-modal" 
                onClick={() => {
                  setSelectedUser(null);
                  setSelectedUserTransactions([]);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              {loadingTransactions ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0', gap: '1rem', color: '#94a3b8' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid rgba(16, 185, 129, 0.1)', borderTopColor: '#10b981', animation: 'spin 1s linear' }} />
                  <p>Retrieving transaction database files...</p>
                </div>
              ) : (
                <div>
                  {/* Inspect Summary */}
                  <div className="inspect-stats">
                    <div className="inspect-stat-card">
                      <span className="inspect-stat-lbl">Simulated Net Balance</span>
                      <div className="inspect-stat-val" style={{ color: inspectTotalBalance >= 0 ? '#10b981' : '#f43f5e' }}>
                        ₹{inspectTotalBalance.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="inspect-stat-card">
                      <span className="inspect-stat-lbl">Inflow Logs</span>
                      <div className="inspect-stat-val" style={{ color: '#3b82f6' }}>
                        ₹{inspectTotalIncome.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="inspect-stat-card">
                      <span className="inspect-stat-lbl">Outflow Logs</span>
                      <div className="inspect-stat-val" style={{ color: '#f43f5e' }}>
                        ₹{inspectTotalExpense.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Wallet size={18} style={{ color: '#10b981' }} />
                    Transaction Logs ({selectedUserTransactions.length})
                  </h4>

                  <div className="admin-table-wrapper" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Flow</th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedUserTransactions.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>No logged transactions.</td>
                          </tr>
                        ) : (
                          selectedUserTransactions.map(tx => (
                            <tr key={tx._id}>
                              <td>{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                              <td style={{ fontWeight: 600 }}>{tx.category}</td>
                              <td>
                                <span style={{ 
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  color: tx.type === 'income' ? '#10b981' : '#f43f5e' 
                                }}>
                                  {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                  {tx.type.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ fontWeight: 700, color: tx.type === 'income' ? '#10b981' : '#fff' }}>
                                ₹{tx.amount.toLocaleString('en-IN')}
                              </td>
                              <td style={{ color: '#94a3b8', fontStyle: tx.description ? 'normal' : 'italic' }}>
                                {tx.description || '(No description)'}
                              </td>
                              <td>
                                <button 
                                  onClick={() => handleDeleteUserTransaction(tx._id)}
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
                                  title="Permanently Delete Transaction"
                                >
                                  <Trash2 size={16} />
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
        </div>
      )}
    </div>
  );
}
