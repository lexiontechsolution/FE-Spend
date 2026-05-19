import React, { useState, useEffect } from 'react';
import { useAuth } from '../App.jsx';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  TrendingUp, 
  PlusCircle, 
  Trash2, 
  PieChart as PieIcon, 
  BarChart3, 
  LineChart as LineIcon, 
  CalendarRange,
  Pencil
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import AddDataModal from '../components/AddDataModal.jsx';
import EditDataModal from '../components/EditDataModal.jsx';

export default function Dashboard() {
  const { token } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Fetch all stats and recent transactions
  const fetchDashboardData = async () => {
    try {
      // 1. Fetch dashboard stats
      const statsRes = await fetch('/api/transactions/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      if (statsRes.ok) {
        setStats(statsData);
      }

      // 2. Fetch latest 5 transactions
      const transactionsRes = await fetch('/api/transactions?limit=5', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const transactionsData = await transactionsRes.json();
      if (transactionsRes.ok) {
        setLoading(false);
        // Show only first 5 in dashboard
        setRecentTransactions(transactionsData.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Workspace Dashboard | SpendTracker";
    fetchDashboardData();
  }, [token]);

  // Delete transaction action
  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        // Refresh dashboard data instantly!
        fetchDashboardData();
      } else {
        alert('Failed to delete transaction.');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (loading || !stats) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#94a3b8' }}>
        <p>Crunching ledger stats & compounding interest graphs...</p>
      </div>
    );
  }

  const { summary, monthlyChart, categoryChart, yearlyChart } = stats;

  return (
    <div>
      {/* Upper header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 40%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Wealth Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Real-time visual monitoring of income streams, burn rates, and savings thresholds.
          </p>
        </div>
        
        <button className="btn btn-success" onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={20} />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {/* Income Card */}
        <div className="glass-card metric-card income">
          <div className="metric-header">
            <span>MONTHLY REVENUE</span>
            <div className="metric-icon-wrapper">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="metric-value">₹{summary.monthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="metric-footer">Total historical: ₹{summary.totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>

        {/* Expenses Card */}
        <div className="glass-card metric-card expense">
          <div className="metric-header">
            <span>MONTHLY BURNOUT</span>
            <div className="metric-icon-wrapper">
              <ArrowDownLeft size={20} />
            </div>
          </div>
          <div className="metric-value">₹{summary.monthlyExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="metric-footer">Total historical: ₹{summary.totalExpense.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>

        {/* Balance Card */}
        <div className="glass-card metric-card balance">
          <div className="metric-header">
            <span>NET VALUE CREATED</span>
            <div className="metric-icon-wrapper">
              <Wallet size={20} />
            </div>
          </div>
          <div className="metric-value" style={{ color: summary.monthlyBalance >= 0 ? '#10b981' : '#f43f5e' }}>
            {summary.monthlyBalance < 0 ? '-' : ''}₹{Math.abs(summary.monthlyBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="metric-footer">All-time reserves: ₹{summary.totalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>

        {/* Savings Rate Card */}
        <div className="glass-card metric-card ratio">
          <div className="metric-header">
            <span>SAVINGS INDEX</span>
            <div className="metric-icon-wrapper">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="metric-value" style={{ color: 'var(--color-primary)' }}>{summary.savingsRatio}%</div>
          <div className="metric-footer">
            {summary.savingsRatio >= 25 ? '🔥 Exceeding standard savings index' : '💡 Aim for a 20% savings threshold'}
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="charts-grid">
        {/* Large Bar Chart (Income vs Expense 6m) */}
        <div className="glass-card chart-card-large">
          <div className="glass-card-header">
            <h3 className="glass-card-title">
              <BarChart3 size={20} style={{ color: 'var(--color-primary)' }} />
              <span>Six-Month Cash Flow Velocity</span>
            </h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChart} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-glass)', borderRadius: '10px' }}
                  labelStyle={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-display)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Bar dataKey="income" name="Inflow (Revenue)" fill="var(--color-success)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="expense" name="Outflow (Burnout)" fill="var(--color-danger)" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart (Category expenses split) */}
        <div className="glass-card chart-card-small">
          <div className="glass-card-header">
            <h3 className="glass-card-title">
              <PieIcon size={20} style={{ color: 'var(--color-danger)' }} />
              <span>Expenditure Allocations</span>
            </h3>
          </div>
          <div className="chart-container">
            {categoryChart.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <CalendarRange size={32} style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }} />
                <p style={{ fontSize: '0.9rem' }}>No expenditures logged yet.</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Expenses will distribute visually here.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChart}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Allocated']}
                    contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-glass)', borderRadius: '10px' }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 10, lineHeight: '16px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Full-width Year accumulation progress line chart */}
        <div className="glass-card" style={{ gridColumn: 'span 12' }}>
          <div className="glass-card-header">
            <h3 className="glass-card-title">
              <LineIcon size={20} style={{ color: 'var(--color-accent)' }} />
              <span>Net Wealth Progress Trajectory</span>
            </h3>
          </div>
          <div className="chart-container" style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyChart} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Net Accumulation']}
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-glass)', borderRadius: '10px' }}
                />
                <Area type="monotone" dataKey="cumulative" name="Cumulative Balance Progress" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorNet)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions list */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div className="glass-card-header">
          <h3 className="glass-card-title">
            <CalendarRange size={20} style={{ color: 'var(--color-success)' }} />
            <span>Recent Capital Entries</span>
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Latest 5 entries logged</span>
        </div>

        {recentTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            No transaction ledger found. Click 'Add Transaction' above to record your first entry.
          </div>
        ) : (
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
                {recentTransactions.map((t) => (
                  <tr key={t._id}>
                    <td style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>{t.date}</td>
                    <td>
                      <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                        {t.type === 'income' ? 'Inflow' : 'Outflow'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{t.category}</td>
                    <td style={{ color: t.description ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {t.description || 'No description provided'}
                    </td>
                    <td style={{
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      color: t.type === 'income' ? 'var(--color-success)' : 'var(--text-primary)'
                    }}>
                      {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="btn-icon-only" 
                          onClick={() => handleEditClick(t)}
                          title="Edit record"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          className="btn-icon-only" 
                          onClick={() => handleDeleteTransaction(t._id)}
                          title="Delete record"
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
        )}
      </div>

      {/* Transaction Logging Modal */}
      <AddDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSuccess={fetchDashboardData}
      />

      {/* Transaction Editing Modal */}
      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onEditSuccess={fetchDashboardData}
        transaction={editingTransaction}
      />
    </div>
  );
}
