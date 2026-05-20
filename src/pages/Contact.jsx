import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Mail, Phone, MapPin, Send, MessageSquare, Shield, CheckCircle } from 'lucide-react';
import { useAuth, API_URL, ThemeToggle } from '../App.jsx';

export default function Contact() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Contact Support & Inquiries | SpendTracker";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error connecting to support servers.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container">
      <style dangerouslySetInnerHTML={{__html: `
        .contact-page-container {
          background: var(--bg-deep);
          color: var(--text-primary);
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow-x: hidden;
          padding-top: 8rem;
        }

        /* Ambient background glow */
        .contact-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: var(--blob-opacity);
          pointer-events: none;
          z-index: 0;
        }
        .contact-glow-1 {
          top: -100px;
          right: 5%;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 100%);
        }
        .contact-glow-2 {
          bottom: 10%;
          left: 5%;
          background: radial-gradient(circle, #10b981 0%, transparent 100%);
        }

        .contact-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem 6rem;
          position: relative;
          z-index: 10;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .contact-pre {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(139, 92, 246, 0.08);
          color: #c084fc;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(139, 92, 246, 0.2);
          margin-bottom: 1.5rem;
        }
        .contact-heading {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--header-gradient-start) 50%, var(--header-gradient-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-sub {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        /* Split layout grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }

        /* Info column */
        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .contact-info-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
        }
        .contact-info-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .contact-item:last-child {
          margin-bottom: 0;
        }
        .contact-icon-box {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(16, 185, 129, 0.2);
          flex-shrink: 0;
        }
        .contact-text-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .contact-item-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .contact-item-value {
          font-size: 1.05rem;
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
        }
        .contact-item-value a {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .contact-item-value a:hover {
          color: var(--color-success);
        }

        /* Support Hours Card */
        .hours-card {
          border-left: 4px solid var(--color-success);
        }
        .hours-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-family: 'Inter', sans-serif;
          margin-bottom: 0.75rem;
        }
        .hours-line:last-child {
          margin-bottom: 0;
        }
        .hours-day {
          font-weight: 600;
        }
        .hours-time {
          color: var(--text-muted);
        }

        /* Form column */
        .contact-form-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: 24px;
          padding: 3.5rem 3rem;
          box-shadow: var(--shadow-premium);
          position: relative;
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
        }
        .contact-form-card::before {
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

        .submit-success-box {
          text-align: center;
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .success-icon-wrapper {
          color: #10b981;
          filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.4));
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .success-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .success-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-heading {
            font-size: 2.5rem;
          }
          .contact-form-card {
            padding: 2.5rem 1.75rem;
          }
        }
      `}} />

      {/* Glow effects */}
      <div className="contact-glow contact-glow-1" />
      <div className="contact-glow contact-glow-2" />

      {/* Global Fixed Navbar */}
      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <Wallet size={28} />
          <span>SpendTracker</span>
        </Link>
        <nav className="landing-nav">
          <Link to="/" className="nav-item">Product</Link>
          <Link to="/pricing" className="nav-item">Pricing</Link>
          <Link to="/contact" className="nav-item active">Contact</Link>
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

      <div className="contact-section">
        <div className="contact-header">
          <div className="contact-pre">
            <MessageSquare size={14} />
            <span>Connect with us</span>
          </div>
          <h1 className="contact-heading">Get in touch with<br />our support team</h1>
          <p className="contact-sub">
            Need help configuring your cloud database, resolving login limits, or exploring business integrations? Submit a ticket below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Office details */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Contact Channels</h3>
              
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div className="contact-text-box">
                  <span className="contact-item-label">Email Support</span>
                  <span className="contact-item-value">
                    <a href="mailto:lexiontechsolution@gmail.com">lexiontechsolution@gmail.com</a>
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div className="contact-text-box">
                  <span className="contact-item-label">Callback Line</span>
                  <span className="contact-item-value">+91 6380853637</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-text-box">
                  <span className="contact-item-label">Central Office</span>
                  <span className="contact-item-value">
                    Pollachi, Coimbatore,<br />
                    Tamil Nadu - 642003
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-info-card hours-card">
              <h3 className="contact-info-title">Operating Hours</h3>
              <div className="hours-line">
                <span className="hours-day">Monday - Friday</span>
                <span className="hours-time">09:00 AM - 07:00 PM IST</span>
              </div>
              <div className="hours-line">
                <span className="hours-day">Saturday</span>
                <span className="hours-time">10:00 AM - 04:00 PM IST</span>
              </div>
              <div className="hours-line">
                <span className="hours-day">Sunday</span>
                <span className="hours-time">Closed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="submit-success-box">
                <div className="success-icon-wrapper">
                  <CheckCircle size={64} />
                </div>
                <h3 className="success-title">Message Received!</h3>
                <p className="success-desc">
                  Thanks for reaching out, {formData.name}. A representative from our security and finance support desk will respond to your inquiry at **{formData.email}** within 12 business hours.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: user ? user.name : '', email: user ? user.email : '', subject: '', message: '' });
                  }} 
                  className="btn btn-secondary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="input-control"
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                  <label className="form-label" htmlFor="message">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Explain your inquiry or issue..."
                    className="input-control"
                    style={{ resize: 'vertical', minHeight: '120px', fontFamily: 'Inter, sans-serif', padding: '0.85rem' }}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem', 
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', 
                    border: 'none', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                  }}
                  disabled={loading}
                >
                  <Send size={16} />
                  {loading ? 'Transmitting Inquiries...' : 'Send Message'}
                </button>
              </form>
            )}
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
