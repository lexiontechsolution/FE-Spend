import React, { useState, useEffect } from 'react';
import { useAuth } from '../App.jsx';
import { X, Pencil, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function EditDataModal({ isOpen, onClose, onEditSuccess, transaction }) {
  const { token } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: 'Groceries',
    date: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categoriesList = {
    expense: ['Groceries', 'Rent', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Others'],
    income: ['Salary', 'Investments', 'Freelance', 'Others']
  };

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount || '',
        type: transaction.type || 'expense',
        category: transaction.category || 'Groceries',
        date: transaction.date || '',
        description: transaction.description || ''
      });
      setError('');
    }
  }, [transaction, isOpen]);

  // Handle category adjustment manually only when the user changes the type button
  const handleTypeChange = (newType) => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: categoriesList[newType][0]
    }));
    setError('');
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Amount must be a positive number.');
      setLoading(false);
      return;
    }

    if (formData.category === 'Others' && !formData.description.trim()) {
      setError('Description/remark is required when category is "Others".');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/transactions/${transaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        })
      });

      const data = await response.json();

      if (response.ok) {
        onEditSuccess();
        onClose();
      } else {
        setError(data.message || 'Failed to update transaction.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3 className="modal-title">
            <Pencil size={20} style={{ color: '#3b82f6' }} />
            <span>Edit Transaction</span>
          </h3>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="auth-alert" style={{ marginBottom: '1rem' }}>
                <span>⚠️ {error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Transaction Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  className={`btn ${formData.type === 'expense' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    background: formData.type === 'expense' ? 'linear-gradient(135deg, var(--color-danger) 0%, #b91c1c 100%)' : '',
                    boxShadow: formData.type === 'expense' ? '0 4px 15px rgba(244, 63, 94, 0.3)' : '',
                    color: formData.type === 'expense' ? '#fff' : ''
                  }}
                  onClick={() => handleTypeChange('expense')}
                >
                  <ArrowDownLeft size={16} />
                  Expense
                </button>
                
                <button
                  type="button"
                  className={`btn ${formData.type === 'income' ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => handleTypeChange('income')}
                >
                  <ArrowUpRight size={16} />
                  Income
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="amount">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                id="amount"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="input-control"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-control select-control"
                required
              >
                {categoriesList[formData.type].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="date">Transaction Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-control"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="description">
                Description / Remark {formData.category === 'Others' && <span style={{ color: 'var(--color-danger)' }}>*</span>}
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="e.g. Weekly Costco grocery shopping"
                value={formData.description}
                onChange={handleChange}
                className="input-control"
                required={formData.category === 'Others'}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating record...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
