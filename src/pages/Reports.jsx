import React, { useState, useEffect } from 'react';
import { useAuth, API_URL } from '../App.jsx';
import { Search, Download, Trash2, SlidersHorizontal, RefreshCcw, Pencil } from 'lucide-react';
import EditDataModal from '../components/EditDataModal.jsx';

export default function Reports() {
  const { token } = useAuth();
  
  // Transactions data states
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };
  
  // Filter form states
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  const categories = [
    'Groceries',
    'Rent',
    'Salary',
    'Investments',
    'Transport',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Freelance',
    'Others'
  ];

  // Fetch transactions based on filter inputs
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Construct query parameters string
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.type) params.append('type', filters.type);
      if (filters.category) params.append('category', filters.category);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await fetch(`${API_URL}/api/transactions?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (response.ok) {
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching filtered transaction records:', error);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    document.title = "Financial Ledger & Reports | SpendTracker";
    fetchTransactions();
  }, [token]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    const cleared = {
      search: '',
      type: '',
      category: '',
      startDate: '',
      endDate: ''
    };
    setFilters(cleared);
    // Fetch immediately after resetting states
    setTimeout(() => {
      fetchTransactions();
    }, 0);
  };

  // Run filter fetch when form submitted
  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  // Delete transaction action
  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this transaction ledger entry?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        // Remove locally from state to avoid full refetch delay
        setTransactions(prev => prev.filter(t => t._id !== id));
      } else {
        alert('Failed to delete transaction.');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Custom client-side CSV generator & browser downloader!
  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert('No transaction records found to export.');
      return;
    }

    // CSV header row
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount (₹)'];
    
    // Convert rows to safe format
    const rows = transactions.map(t => [
      t.date,
      t.type === 'income' ? 'INFLOW' : 'OUTFLOW',
      t.category,
      t.description ? `"${t.description.replace(/"/g, '""')}"` : 'None', // Escape double quotes
      t.amount
    ]);

    // Build CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create browser blob and initiate a direct file download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    
    // File name format: spendtracker_export_YYYY-MM-DD.csv
    const todayStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `spendtracker_export_${todayStr}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 40%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Capital Ledgers & Reports
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Audit capital transactions, perform deep multi-field filtering, and extract data sheets.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={handleExportCSV}>
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Advanced Filters Bar Form */}
      <form className="glass-card filters-bar" onSubmit={handleApplyFilters} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* Text Search */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="search">Search Keywords</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="e.g. Costco, Rent, Gas..."
              value={filters.search}
              onChange={handleFilterChange}
              className="input-control"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>

        {/* Type Select */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="type">Transaction Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="input-control select-control"
          >
            <option value="">All Transactions</option>
            <option value="income">Inflow (Incomes)</option>
            <option value="expense">Outflow (Expenses)</option>
          </select>
        </div>

        {/* Category Select */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="input-control select-control"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="startDate">From Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="input-control"
          />
        </div>

        {/* End Date */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="endDate">To Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="input-control"
          />
        </div>

        {/* Filter Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'stretch', alignItems: 'flex-end', gridColumn: 'span 1' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }} title="Apply filter settings">
            <SlidersHorizontal size={16} />
            Filter
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleClearFilters}
            style={{ padding: '0.75rem' }} 
            title="Reset form filters"
          >
            <RefreshCcw size={16} />
          </button>
        </div>

      </form>

      {/* Main ledger table */}
      <div className="glass-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            Analyzing ledger databases and filtering transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No records matched your search parameters. Try adjusting filters or keyword searches.
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Showing <strong>{transactions.length}</strong> record{transactions.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>TYPE</th>
                    <th>CATEGORY</th>
                    <th>REMARK / DESCRIPTION</th>
                    <th>AMOUNT</th>
                    <th style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t._id}>
                      <td style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>{t.date}</td>
                      <td>
                        <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                          {t.type === 'income' ? 'Inflow' : 'Outflow'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{t.category}</td>
                      <td style={{ color: t.description ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: '0.95rem' }}>
                        {t.description || 'No description provided'}
                      </td>
                      <td style={{
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        color: t.type === 'income' ? 'var(--color-success)' : 'var(--text-primary)',
                        fontSize: '1rem'
                      }}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn-icon-only" 
                            onClick={() => handleEditClick(t)}
                            title="Edit transaction ledger item"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            className="btn-icon-only" 
                            onClick={() => handleDeleteTransaction(t._id)}
                            title="Delete transaction ledger item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Transaction Editing Modal */}
      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onEditSuccess={fetchTransactions}
        transaction={editingTransaction}
      />
    </div>
  );
}
