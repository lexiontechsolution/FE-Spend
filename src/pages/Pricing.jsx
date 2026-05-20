import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Check, HelpCircle, ArrowRight, Shield, Sparkles, Building2 } from 'lucide-react';
import { useAuth, ThemeToggle } from '../App.jsx';

export default function Pricing() {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

  useEffect(() => {
    document.title = "Flexible Subscriptions & Pricing | SpendTracker";
    window.scrollTo(0, 0);
  }, []);

  const pricingData = {
    monthly: {
      free: '₹0',
      pro: '₹299',
      enterprise: 'Custom',
      proPeriod: '/mo',
      freePeriod: '/mo'
    },
    yearly: {
      free: '₹0',
      pro: '₹2,490',
      enterprise: 'Custom',
      proPeriod: '/yr',
      freePeriod: '/yr',
      savings: 'Save 30%'
    }
  };

  const currentPricing = pricingData[billingPeriod];

  return (
    <div className="pricing-page-container">
      <style dangerouslySetInnerHTML={{__html: `
        .pricing-page-container {
          background: var(--bg-deep);
          color: var(--text-primary);
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow-x: hidden;
          padding-top: 8rem;
        }

        /* Ambient background glow */
        .pricing-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: var(--blob-opacity);
          pointer-events: none;
          z-index: 0;
        }
        .pricing-glow-1 {
          top: -100px;
          left: 5%;
          background: radial-gradient(circle, #10b981 0%, transparent 100%);
        }
        .pricing-glow-2 {
          bottom: 10%;
          right: 5%;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 100%);
        }

        .pricing-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem 6rem;
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .pricing-pre {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(16, 185, 129, 0.2);
          margin-bottom: 1.5rem;
        }

        .pricing-heading {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--header-gradient-start) 50%, var(--header-gradient-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pricing-sub {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        /* Billing Switch */
        .billing-toggle-wrapper {
          display: inline-flex;
          align-items: center;
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          padding: 0.35rem;
          border-radius: 9999px;
          margin-bottom: 4rem;
        }
        .billing-toggle-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .billing-toggle-btn.active {
          background: var(--color-success);
          color: #fff;
          box-shadow: var(--shadow-accent);
        }
        .billing-savings-tag {
          font-size: 0.8rem;
          background: rgba(139, 92, 246, 0.2);
          color: #c084fc;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          margin-left: 0.5rem;
          font-weight: 700;
        }

        /* Pricing Cards Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 6rem;
        }
        .pricing-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 24px;
          padding: 3rem 2.25rem;
          text-align: left;
          position: relative;
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        .pricing-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-glass-hover);
          box-shadow: var(--shadow-premium);
        }
        
        /* Highlighted plan card */
        .pricing-card.premium {
          border-color: rgba(16, 185, 129, 0.25);
          background: var(--bg-glass-bright);
        }
        .pricing-card.premium::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, transparent 60%, rgba(139, 92, 246, 0.35) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .popular-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: linear-gradient(135deg, var(--color-success) 0%, hsl(162, 84%, 30%) 100%);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .plan-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .plan-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 2rem;
          font-family: 'Inter', sans-serif;
          min-height: 48px;
        }

        .plan-price-wrapper {
          display: flex;
          align-items: baseline;
          margin-bottom: 2.25rem;
        }
        .plan-price {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }
        .plan-period {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-left: 0.25rem;
          font-family: 'Inter', sans-serif;
        }

        .plan-btn {
          width: 100%;
          padding: 0.85rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          text-align: center;
          margin-bottom: 2.5rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .btn-sec {
          background: var(--bg-glass);
          color: var(--text-primary);
          border: 1px solid var(--border-glass);
        }
        .btn-sec:hover {
          background: var(--border-glass-hover);
        }
        .btn-pri {
          background: linear-gradient(135deg, var(--color-success) 0%, hsl(162, 84%, 30%) 100%);
          color: #fff;
          box-shadow: var(--shadow-accent);
        }
        .btn-pri:hover {
          box-shadow: 0 4px 25px rgba(16, 185, 129, 0.35);
          transform: translateY(-2px);
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto; /* Push features list to the bottom */
        }
        .plan-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-family: 'Inter', sans-serif;
        }
        .plan-feature-item svg {
          color: var(--color-success);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        /* Feature Matrix Section */
        .matrix-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }
        .comparison-table-wrapper {
          overflow-x: auto;
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 20px;
          margin-bottom: 6rem;
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 800px;
        }
        .comparison-table th, .comparison-table td {
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--border-glass);
        }
        .comparison-table th {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
          background: var(--bg-surface);
        }
        .comparison-table td {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
        }
        .comparison-table tr:hover td {
          background: var(--table-tr-hover);
        }
        .text-bold-white {
          color: var(--text-primary);
          font-weight: 600;
        }
        .td-center {
          text-align: center;
        }

        /* FAQ block */
        .faq-block {
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
        }
        .faq-block h3 {
          font-size: 2.2rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }
        .faq-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .faq-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: 2rem;
        }
        .faq-question {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .faq-question svg {
          color: var(--color-success);
          flex-shrink: 0;
        }
        .faq-answer {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          padding-left: 2rem;
        }

        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            max-width: 450px;
            margin: 0 auto 4rem;
          }
          .pricing-heading {
            font-size: 2.5rem;
          }
        }
      `}} />

      {/* Glow effects */}
      <div className="pricing-glow pricing-glow-1" />
      <div className="pricing-glow pricing-glow-2" />

      {/* Global Fixed Navbar */}
      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <Wallet size={28} />
          <span>SpendTracker</span>
        </Link>
        <nav className="landing-nav">
          <Link to="/" className="nav-item">Product</Link>
          <Link to="/pricing" className="nav-item active">Pricing</Link>
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

      <div className="pricing-section">
        <div className="pricing-pre">
          <Sparkles size={14} />
          <span>Transparent Tiers</span>
        </div>
        <h1 className="pricing-heading">Flexible plans for<br />ambitious budgets</h1>
        <p className="pricing-sub">
          Start for free to capture day-to-day spending, or upgrade for automated ledger insights, custom categories, and multi-currency indexing.
        </p>

        {/* Toggle Switches */}
        <div className="billing-toggle-wrapper">
          <button 
            onClick={() => setBillingPeriod('monthly')} 
            className={`billing-toggle-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingPeriod('yearly')} 
            className={`billing-toggle-btn ${billingPeriod === 'yearly' ? 'active' : ''}`}
          >
            Yearly
            <span className="billing-savings-tag">{pricingData.yearly.savings}</span>
          </button>
        </div>

        {/* Tiers Grid */}
        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="pricing-card">
            <span className="plan-title">
              <Wallet size={20} style={{ color: '#10b981' }} />
              Free Starter
            </span>
            <p className="plan-desc">For individuals looking to start logging ledger transactions with core categories.</p>
            <div className="plan-price-wrapper">
              <span className="plan-price">{currentPricing.free}</span>
              <span className="plan-period">{currentPricing.freePeriod}</span>
            </div>
            <Link to="/signup" className="plan-btn btn-sec">Get Started Free</Link>
            
            <div className="plan-features-list">
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Up to 100 logs per month</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Core category support</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Indian Rupee formatting</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Basic metrics charts</span>
              </div>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="pricing-card premium">
            <div className="popular-badge">Highly Preferred</div>
            <span className="plan-title">
              <Sparkles size={20} style={{ color: '#c084fc' }} />
              Pro Analyst
            </span>
            <p className="plan-desc">For power users looking to model wealth projection indices and automate summaries.</p>
            <div className="plan-price-wrapper">
              <span className="plan-price">{currentPricing.pro}</span>
              <span className="plan-period">{currentPricing.proPeriod}</span>
            </div>
            <Link to="/signup" className="plan-btn btn-pri">Upgrade To Pro</Link>
            
            <div className="plan-features-list">
              <div className="plan-feature-item">
                <Check size={16} />
                <span className="text-bold-white">Unlimited ledger entries</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Custom category creation</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Wealth progression Sparklines</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Export data to JSON / CSV formats</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Interactive category filter suites</span>
              </div>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="pricing-card">
            <span className="plan-title">
              <Building2 size={20} style={{ color: '#a5b4fc' }} />
              Enterprise
            </span>
            <p className="plan-desc">For accounting teams, small agencies, or families managing shared resources.</p>
            <div className="plan-price-wrapper">
              <span className="plan-price">{currentPricing.enterprise}</span>
            </div>
            <Link to="/contact" className="plan-btn btn-sec">Contact Sales</Link>
            
            <div className="plan-features-list">
              <div className="plan-feature-item">
                <Check size={16} />
                <span className="text-bold-white">Multi-user workspace sharing</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Custom API integrations</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Dedicated MongoDB instance</span>
              </div>
              <div className="plan-feature-item">
                <Check size={16} />
                <span>Priority email & chat support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <h2 className="matrix-title">Feature Comparison</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Capabilities</th>
                <th>Free Starter</th>
                <th>Pro Analyst</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-bold-white">Ledger Logs Limit</td>
                <td>100 / month</td>
                <td className="text-bold-white">Unlimited</td>
                <td className="text-bold-white">Unlimited</td>
              </tr>
              <tr>
                <td className="text-bold-white">Custom Categories</td>
                <td>None (Standard only)</td>
                <td>Available</td>
                <td>Available</td>
              </tr>
              <tr>
                <td className="text-bold-white">Wealth Sparkline Models</td>
                <td>Basic Static</td>
                <td className="text-bold-white">SVG Interactive</td>
                <td className="text-bold-white">Realtime Advanced</td>
              </tr>
              <tr>
                <td className="text-bold-white">Database Sync Location</td>
                <td>Shared Cluster</td>
                <td>Shared Cluster</td>
                <td className="text-bold-white">Dedicated Private DB</td>
              </tr>
              <tr>
                <td className="text-bold-white">CSV & JSON Exports</td>
                <td>❌ Not Available</td>
                <td className="text-bold-white">✔ Included</td>
                <td className="text-bold-white">✔ Included</td>
              </tr>
              <tr>
                <td className="text-bold-white">Multi-user Collab</td>
                <td>❌ Not Available</td>
                <td>❌ Not Available</td>
                <td className="text-bold-white">✔ Up to 10 users</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQ Area */}
        <div className="faq-block">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-question">
                <HelpCircle size={18} />
                <span>Is there a contract or commitment?</span>
              </div>
              <p className="faq-answer">
                No contracts. You can subscribe to Pro on a monthly basis and cancel at any time, or choose our yearly tier to save 30% on subscription fees.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-question">
                <HelpCircle size={18} />
                <span>Can I export my transactions data?</span>
              </div>
              <p className="faq-answer">
                Yes! Pro and Enterprise users can export their entire financial ledger into JSON and CSV formats at any time from the Reports workspace.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-question">
                <HelpCircle size={18} />
                <span>How secure is my financial ledger?</span>
              </div>
              <p className="faq-answer">
                We store all transactions on MongoDB Atlas clusters using TLS encryption in transit and AES-256 encryption at rest. We never store bank passwords or fetch auto-feeds.
              </p>
            </div>
          </div>
        </div>
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
