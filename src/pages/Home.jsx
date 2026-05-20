import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wallet, ArrowRight, Shield, BarChart3, Clock, Check, 
  HelpCircle, TrendingUp, Coins, Layers, Settings, LayoutGrid, 
  FileText, ChevronRight, Star, Sparkles, Play, Plus, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { useAuth, ThemeToggle } from '../App.jsx';

export default function Home() {
  const { user } = useAuth();
  const location = useLocation();

  // Mock ledger playground state
  const [mockTransactions, setMockTransactions] = useState([
    { id: 1, category: 'Groceries', amount: 1250, type: 'expense', date: '2026-05-19' },
    { id: 2, category: 'Freelance', amount: 18500, type: 'income', date: '2026-05-18' },
    { id: 3, category: 'Utilities', amount: 3200, type: 'expense', date: '2026-05-17' }
  ]);
  const [playgroundAmount, setPlaygroundAmount] = useState('');
  const [playgroundCategory, setPlaygroundCategory] = useState('Groceries');
  const [playgroundType, setPlaygroundType] = useState('expense');

  useEffect(() => {
    document.title = "SpendTracker | Take Complete Control of Your Wealth";
    window.scrollTo(0, 0);
  }, []);

  const handleAddMockTransaction = (e) => {
    e.preventDefault();
    if (!playgroundAmount || parseFloat(playgroundAmount) <= 0) return;
    const newTx = {
      id: Date.now(),
      category: playgroundCategory,
      amount: parseFloat(playgroundAmount),
      type: playgroundType,
      date: new Date().toISOString().split('T')[0]
    };
    setMockTransactions([newTx, ...mockTransactions]);
    setPlaygroundAmount('');
  };

  // Math for playground
  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="landing-page-v3">
      <style dangerouslySetInnerHTML={{__html: `
        .landing-page-v3 {
          background: var(--bg-deep);
          color: var(--text-primary);
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Top-tier SaaS glowing background grid */
        .grid-backdrop {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(var(--border-glass) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-glass) 1px, transparent 1px);
          background-size: 60px 60px;
          background-position: center top;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* Premium Blobs */
        .saas-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: var(--blob-opacity);
          pointer-events: none;
          z-index: 0;
        }
        .saas-blob-purple {
          top: -100px;
          left: 15%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 80%);
        }
        .saas-blob-green {
          top: 15%;
          right: 10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #10b981 0%, transparent 80%);
        }

        .landing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        /* Hero */
        .hero-v3 {
          padding: 9rem 0 6rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .announcement-badge {
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
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }
        .announcement-badge:hover {
          background: rgba(16, 185, 129, 0.1);
          transform: translateY(-1px);
        }
        .hero-title-v3 {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--header-gradient-start) 40%, var(--header-gradient-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-desc-v3 {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 650px;
          line-height: 1.6;
          margin-bottom: 3rem;
          font-family: 'Inter', sans-serif;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 6rem;
        }
        .btn-saas-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          padding: 0.95rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-saas-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 25px rgba(16, 185, 129, 0.45);
        }
        .btn-saas-secondary {
          background: var(--bg-glass);
          color: var(--text-primary);
          padding: 0.95rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          border: 1px solid var(--border-glass);
          transition: all 0.3s ease;
        }
        .btn-saas-secondary:hover {
          background: var(--border-glass-hover);
          border-color: var(--border-glass-hover);
        }

        /* Company Logo Wall */
        .logo-wall {
          width: 100%;
          border-top: 1px solid var(--border-glass);
          border-bottom: 1px solid var(--border-glass);
          padding: 2.5rem 0;
          margin-bottom: 6rem;
          text-align: center;
        }
        .logo-wall-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.75rem;
        }
        .logo-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4rem;
          flex-wrap: wrap;
        }
        .logo-item {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-secondary);
          opacity: 0.45;
          letter-spacing: -0.03em;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .logo-item:hover {
          opacity: 0.85;
          color: var(--text-primary);
        }

        /* Grid Feature Cards */
        .features-section {
          margin-bottom: 8rem;
        }
        .section-header-v3 {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-tag-v3 {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-success);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          display: block;
        }
        .section-title-v3 {
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .features-grid-v3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .feature-card-v3 {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
        }
        .feature-card-v3:hover {
          transform: translateY(-5px);
          border-color: var(--border-glass-hover);
          background: var(--bg-glass-bright);
        }
        .feature-icon-v3 {
          width: 48px;
          height: 48px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.15);
          color: #10b981;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .feature-title-v3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }
        .feature-desc-v3 {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        /* Interactive Playground */
        .playground-section {
          margin-bottom: 8rem;
        }
        .playground-card {
          background: var(--bg-glass-bright);
          border: 1px solid var(--border-glass);
          border-radius: 24px;
          padding: 3rem;
          backdrop-filter: var(--blur-glass);
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 3.5rem;
          align-items: center;
          text-align: left;
          box-shadow: var(--shadow-premium);
        }
        .playground-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .playground-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #a5b4fc;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .playground-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .playground-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        /* Mock App Layout inside Playground */
        .mock-dashboard {
          background: var(--bg-deep);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-premium);
        }
        .mock-db-header {
          background: var(--bg-surface);
          color: var(--text-primary);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-glass);
          font-size: 0.9rem;
          font-weight: 600;
        }
        .mock-db-grid {
          padding: 1.25rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          border-bottom: 1px solid var(--border-glass);
        }
        .mock-indicator {
          background: var(--bg-surface);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .mock-indicator-val {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.25rem;
        }
        .mock-db-workspace {
          padding: 1.25rem;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 1.25rem;
        }
        .mock-tx-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 160px;
          overflow-y: auto;
        }
        .mock-tx-row {
          background: var(--bg-surface);
          border: 1px solid var(--border-glass);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .mock-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        /* Final CTA Section */
        .final-cta-section {
          margin-bottom: 8rem;
          text-align: center;
        }
        .final-cta-card {
          background: radial-gradient(circle at top left, rgba(16, 185, 129, 0.08) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%), var(--bg-glass);
          border: 1px solid var(--border-glass-hover);
          border-radius: 28px;
          padding: 4.5rem 2rem;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: var(--shadow-premium);
          position: relative;
        }
        .final-cta-title {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }
        .final-cta-desc {
          color: var(--text-secondary);
          font-size: 1.15rem;
          max-width: 550px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 900px) {
          .hero-title-v3 {
            font-size: 2.8rem;
          }
          .logo-grid {
            gap: 2rem;
          }
          .features-grid-v3 {
            grid-template-columns: 1fr;
          }
          .playground-card {
            grid-template-columns: 1fr;
            padding: 2rem 1.5rem;
            gap: 2rem;
          }
          .mock-db-workspace {
            grid-template-columns: 1fr;
          }
          .final-cta-title {
            font-size: 2.2rem;
          }
        }


      `}} />

      {/* Decorative Grids */}
      <div className="grid-backdrop" />
      <div className="saas-blob saas-blob-purple" />
      <div className="saas-blob saas-blob-green" />

      {/* Global Fixed Navbar */}
      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <Wallet size={28} />
          <span>SpendTracker</span>
        </Link>
        <nav className="landing-nav">
          <Link to="/" className="nav-item active">Product</Link>
          <Link to="/pricing" className="nav-item">Pricing</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <Link to="/dashboard" className="btn-landing-login" style={{ background: '#10b981', color: '#fff', border: 'none' }}>Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn-landing-login">Login</Link>
              <Link to="/signup" className="btn-landing-signup">Sign Up</Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Hero V3 */}
      <div className="landing-container">
        <section className="hero-v3">
          <div className="announcement-badge">
            <Sparkles size={14} />
            <span>Now with multi-device cloud synchronization</span>
          </div>
          <h1 className="hero-title-v3">The premium ledger<br />for modern builders</h1>
          <p className="hero-desc-v3">
            SpendTracker is a high-performance metrics dashboard designed to log transactions, inspect categories, and optimize capital velocity in real-time.
          </p>
          <div className="hero-ctas">
            <Link to="/signup" className="btn-saas-primary">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/pricing" className="btn-saas-secondary">
              View Pricing
            </Link>
          </div>

          {/* Company Logo Wall */}
          <div className="logo-wall">
            <div className="logo-wall-title">Empowering financial clarity at top companies</div>
            <div className="logo-grid">
              <span className="logo-item"><Wallet size={18} /> Stripe</span>
              <span className="logo-item"><Sparkles size={18} /> Vercel</span>
              <span className="logo-item"><TrendingUp size={18} /> Linear</span>
              <span className="logo-item"><Layers size={18} /> Supabase</span>
              <span className="logo-item"><Settings size={18} /> Retool</span>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="features-section">
          <div className="section-header-v3">
            <span className="section-tag-v3">Features</span>
            <h2 className="section-title-v3">Built to accelerate financial insights</h2>
          </div>
          <div className="features-grid-v3">
            <div className="feature-card-v3">
              <div className="feature-icon-v3">
                <TrendingUp size={22} />
              </div>
              <h3 className="feature-title-v3">Capital Velocity Analytics</h3>
              <p className="feature-desc-v3">
                Watch your progression indicators grow month-over-month with high-fidelity charts and interactive wealth indexes.
              </p>
            </div>

            <div className="feature-card-v3">
              <div className="feature-icon-v3">
                <Shield size={22} />
              </div>
              <h3 className="feature-title-v3">Strict Category Checks</h3>
              <p className="feature-desc-v3">
                Never look back at a blank receipt. Core form validators require descriptions when choosing 'Others'.
              </p>
            </div>

            <div className="feature-card-v3">
              <div className="feature-icon-v3">
                <Coins size={22} />
              </div>
              <h3 className="feature-title-v3">Indian Rupee Native</h3>
              <p className="feature-desc-v3">
                All data, tables, inputs, and indicators formatted natively in Indian Currency (₹) for transparent tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Playground */}
        <section className="playground-section">
          <div className="playground-card">
            <div className="playground-info">
              <div className="playground-badge">
                <Play size={12} fill="currentColor" />
                <span>Interactive Sandbox</span>
              </div>
              <h2 className="playground-title">Test-drive the ledger before signing up</h2>
              <p className="playground-desc">
                Log a simulated transaction on the right. See how the balance, expense tags, and transactional logs calculate updates in real-time.
              </p>
            </div>

            <div className="mock-dashboard">
              <div className="mock-db-header">
                <span>⚡ Live Playground Ledger</span>
                <span style={{ color: '#10b981', display: 'flex', align: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block', alignSelf: 'center' }} />
                  Synced
                </span>
              </div>

              <div className="mock-db-grid">
                <div className="mock-indicator">
                  <span>Net Assets</span>
                  <div className="mock-indicator-val" style={{ color: totalBalance >= 0 ? '#10b981' : '#f43f5e' }}>
                    ₹{totalBalance.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="mock-indicator">
                  <span>Inflows</span>
                  <div className="mock-indicator-val" style={{ color: '#3b82f6' }}>
                    ₹{totalIncome.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="mock-indicator">
                  <span>Outflows</span>
                  <div className="mock-indicator-val" style={{ color: '#f43f5e' }}>
                    ₹{totalExpense.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="mock-db-workspace">
                <div className="mock-tx-list">
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Recent Logs</div>
                  {mockTransactions.map(tx => (
                    <div className="mock-tx-row" key={tx.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {tx.type === 'income' ? <ArrowUpRight size={14} style={{ color: '#10b981' }} /> : <ArrowDownLeft size={14} style={{ color: '#f43f5e' }} />}
                        <span>{tx.category}</span>
                      </div>
                      <span style={{ fontWeight: 600, color: tx.type === 'income' ? '#10b981' : '#fff' }}>
                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddMockTransaction} className="mock-form">
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <input
                      type="number"
                      placeholder="Amount (₹)"
                      value={playgroundAmount}
                      onChange={(e) => setPlaygroundAmount(e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', color: '#fff', padding: '0.35rem 0.5rem', width: '100%', fontSize: '0.8rem' }}
                      required
                    />
                    <select
                      value={playgroundType}
                      onChange={(e) => {
                        setPlaygroundType(e.target.value);
                        setPlaygroundCategory(e.target.value === 'income' ? 'Salary' : 'Groceries');
                      }}
                      style={{ background: '#0e1528', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem', padding: '0.35rem' }}
                    >
                      <option value="expense">Out</option>
                      <option value="income">In</option>
                    </select>
                  </div>
                  
                  <select
                    value={playgroundCategory}
                    onChange={(e) => setPlaygroundCategory(e.target.value)}
                    style={{ background: '#0e1528', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', color: '#fff', fontSize: '0.8rem', padding: '0.35rem', width: '100%' }}
                  >
                    {playgroundType === 'expense' 
                      ? ['Groceries', 'Rent', 'Transport', 'Utilities', 'Shopping', 'Others'].map(c => <option key={c} value={c}>{c}</option>)
                      : ['Salary', 'Investments', 'Freelance', 'Others'].map(c => <option key={c} value={c}>{c}</option>)
                    }
                  </select>

                  <button
                    type="submit"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', color: '#fff', fontWeight: 700, padding: '0.45rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                  >
                    <Plus size={14} /> Add Transaction
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Card */}
        <section className="final-cta-section">
          <div className="final-cta-card">
            <h2 className="final-cta-title">Ready to take control?</h2>
            <p className="final-cta-desc">
              Log transactions, calculate indicators, and optimize your wealth progression. Join builders tracking their resources with complete security.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn-saas-primary">Create Your Free Account</Link>
              <Link to="/pricing" className="btn-saas-secondary">Explore Premium Plans</Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="landing-footer-v2">
        <div className="footer-cols">
          <div className="footer-col-brand">
            <Link to="/" className="landing-logo">
              <Wallet size={24} />
              <span>SpendTracker</span>
            </Link>
            <p className="footer-desc-text">
              Providing ultimate clarity on individual and professional spending since 2026. Powered by React, Node.js, and MongoDB Atlas.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <div className="footer-links">
              <Link to="/login" className="footer-link">Privacy Policy</Link>
              <Link to="/login" className="footer-link">Terms of Service</Link>
              <Link to="/login" className="footer-link">Security Policies</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SpendTracker Inc. All rights reserved.</p>
          <p>Made for financial transparency.</p>
        </div>
      </footer>
    </div>
  );
}
