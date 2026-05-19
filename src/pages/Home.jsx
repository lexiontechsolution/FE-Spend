import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wallet, ArrowRight, Shield, BarChart3, Clock, Check, 
  HelpCircle, TrendingUp, Coins, Layers, Settings, LayoutGrid, FileText, ChevronRight, Star
} from 'lucide-react';
import { useAuth } from '../App.jsx';

export default function Home() {
  const { user } = useAuth();
  const location = useLocation();

  // Scroll to section if arriving from another page with scrollTo state and set tab title
  useEffect(() => {
    document.title = "SpendTracker | Take Complete Control of Your Wealth";
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);
  
  const handleScrollToPricing = (e) => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      e.preventDefault();
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <style dangerouslySetInnerHTML={{__html: `
        /* Landing Page Base */
        .landing-page {
          background: #060913;
          color: #f8fafc;
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Animated Glowing Blobs */
        .glow-blob {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          z-index: 0;
          pointer-events: none;
          opacity: 0.45;
          mix-blend-mode: screen;
        }
        .glow-blob-1 {
          top: -100px;
          left: -100px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.05) 60%, transparent 100%);
          animation: float-slow 25s infinite ease-in-out alternate;
        }
        .glow-blob-2 {
          top: 40%;
          right: -200px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(16, 185, 129, 0.04) 60%, transparent 100%);
          animation: float-slow 30s infinite ease-in-out alternate-reverse;
        }
        .glow-blob-3 {
          bottom: -100px;
          left: 10%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.03) 60%, transparent 100%);
          animation: float-slow 20s infinite ease-in-out alternate;
        }

        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 100px) scale(1.15); }
          100% { transform: translate(-40px, -60px) scale(0.9); }
        }

        /* Content Container */
        .landing-content {
          position: relative;
          z-index: 10;
        }

        /* Hero Badges & Typography */
        .hero-section {
          padding: 10rem 5% 5rem;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.06);
          color: #10b981;
          padding: 0.6rem 1.35rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 2rem;
          border: 1px solid rgba(16, 185, 129, 0.15);
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .hero-badge span.pill {
          background: #10b981;
          color: #060913;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 70%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-desc {
          font-size: 1.35rem;
          color: #94a3b8;
          max-width: 750px;
          margin: 0 auto 3.5rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 6rem;
        }
        .btn-hero-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          text-decoration: none;
          padding: 1.1rem 2.75rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.15rem;
          box-shadow: 0 4px 25px rgba(16, 185, 129, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 35px rgba(16, 185, 129, 0.5);
        }
        .btn-hero-secondary {
          background: rgba(255, 255, 255, 0.02);
          color: #fff;
          text-decoration: none;
          padding: 1.1rem 2.75rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.15rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Trusted By Section */
        .trusted-section {
          text-align: center;
          margin-bottom: 7rem;
        }
        .trusted-title {
          font-size: 0.85rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 2rem;
        }
        .trusted-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4rem;
          opacity: 0.45;
          flex-wrap: wrap;
        }
        .trusted-logo {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f8fafc;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Mockup Glassmorphic App Window */
        .mockup-outer {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
          border-radius: 24px;
          padding: 4px;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7);
        }
        .mockup-outer::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(16,185,129,0.2) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .mockup-container-v2 {
          background: #090e1a;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          min-height: 520px;
          text-align: left;
        }

        /* Mockup Sidebar */
        .mock-sidebar {
          width: 220px;
          background: #070a13;
          border-right: 1px solid rgba(255,255,255,0.03);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mock-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          color: #10b981;
          font-size: 1.15rem;
        }
        .mock-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mock-menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          color: #64748b;
          font-size: 0.9rem;
          border-radius: 8px;
          font-weight: 500;
        }
        .mock-menu-item.active {
          color: #fff;
          background: rgba(16, 185, 129, 0.08);
          border-left: 2px solid #10b981;
          border-radius: 0 8px 8px 0;
          padding-left: 0.6rem;
        }

        /* Mockup Main panel */
        .mock-main {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: linear-gradient(180deg, #090e1a 0%, #060913 100%);
        }
        .mock-header-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mock-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mock-avatar {
          width: 32px;
          height: 32px;
          background: #10b981;
          border-radius: 50%;
          color: #060913;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
        }

        /* Mock Metrics */
        .mock-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .mock-card {
          background: rgba(15, 22, 42, 0.4);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 12px;
          padding: 1.25rem;
          position: relative;
        }
        .mock-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 3px 0 0 3px;
        }
        .mock-card.income::before { background: #10b981; }
        .mock-card.expense::before { background: #f43f5e; }
        .mock-card.balance::before { background: #8b5cf6; }

        .mock-card-label {
          color: #64748b;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.35rem;
        }
        .mock-card-val {
          font-size: 1.45rem;
          font-weight: 700;
        }

        /* Mock Chart Section */
        .mock-chart-box {
          background: rgba(15, 22, 42, 0.3);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 12px;
          padding: 1.25rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mock-chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #64748b;
        }
        .mock-svg-chart {
          width: 100%;
          height: 120px;
        }

        /* Mock Transactions */
        .mock-trans-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mock-trans-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.01);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.02);
          font-size: 0.85rem;
        }
        .mock-trans-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mock-trans-cat {
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* Features Section */
        .features-section {
          padding: 8rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .section-tag {
          color: #10b981;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.75rem;
          display: block;
          font-size: 0.9rem;
        }
        .section-title {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .feature-item-v2 {
          background: rgba(15, 22, 42, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .feature-item-v2::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1.5px;
          background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .feature-item-v2:hover {
          transform: translateY(-5px);
          background: rgba(15, 22, 42, 0.55);
        }
        .feature-item-v2:hover::before {
          background: linear-gradient(180deg, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
        }
        .feature-icon-v2 {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
          color: #10b981;
          width: 54px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          border: 1px solid rgba(16, 185, 129, 0.25);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        .feature-name-v2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .feature-desc-v2 {
          color: #94a3b8;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
        }

        /* Pricing Section */
        .pricing-section {
          padding: 8rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .pricing-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          align-items: stretch;
        }
        .pricing-card-v2 {
          background: rgba(15, 22, 42, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        .pricing-card-v2::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .pricing-card-v2.premium {
          background: linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(15, 22, 42, 0.35) 100%);
          border-color: rgba(16, 185, 129, 0.25);
        }
        .pricing-card-v2.premium::before {
          background: linear-gradient(180deg, rgba(16, 185, 129, 0.35) 0%, transparent 60%);
        }
        .pricing-card-v2.premium::after {
          content: 'RECOMMENDED';
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #060913;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.35rem 1rem;
          border-radius: 9999px;
          letter-spacing: 0.08em;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
        }
        .pricing-card-v2:hover {
          transform: translateY(-5px);
        }
        .plan-name-v2 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #94a3b8;
        }
        .pricing-card-v2.premium .plan-name-v2 {
          color: #10b981;
        }
        .plan-price-v2 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: baseline;
          letter-spacing: -0.02em;
        }
        .plan-price-v2 span {
          font-size: 1.15rem;
          color: #64748b;
          font-weight: 500;
          margin-left: 0.5rem;
        }
        .plan-desc-v2 {
          color: #94a3b8;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
        }
        .plan-features-v2 {
          list-style: none;
          padding: 0;
          margin: 0 0 3.5rem 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .plan-feature-item-v2 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #e2e8f0;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
        }
        .plan-feature-item-v2 svg {
          color: #10b981;
          flex-shrink: 0;
        }
        .btn-pricing-v2 {
          display: block;
          text-align: center;
          text-decoration: none;
          padding: 1.1rem;
          border-radius: 12px;
          font-weight: 700;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 1.05rem;
          background: rgba(255, 255, 255, 0.01);
        }
        .btn-pricing-v2.primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
        }
        .btn-pricing-v2:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .btn-pricing-v2.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.35);
        }

        /* FAQ Section */
        .faq-section {
          padding: 8rem 5%;
          max-width: 1000px;
          margin: 0 auto;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        .faq-item {
          background: rgba(15, 22, 42, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 2.25rem;
          backdrop-filter: blur(5px);
        }
        .faq-q {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #fff;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }
        .faq-q svg {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        .faq-a {
          color: #94a3b8;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          padding-left: 2rem;
        }

        /* Footer */
        .landing-footer-v2 {
          border-top: 1px solid rgba(255,255,255,0.03);
          padding: 6rem 5% 4rem;
          background: #05070f;
        }
        .footer-cols {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4rem;
          margin-bottom: 4rem;
          text-align: left;
        }
        .footer-col-brand {
          grid-column: span 1.5;
        }
        .footer-desc-text {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-top: 1.5rem;
          max-width: 320px;
        }
        .footer-col h4 {
          font-size: 0.95rem;
          color: #fff;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .footer-link {
          color: #64748b;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #10b981;
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.03);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #64748b;
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .hero-title {
            font-size: 3rem;
          }
          .hero-desc {
            font-size: 1.15rem;
          }
          .footer-cols {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .footer-col-brand {
            grid-column: span 2;
          }
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .mockup-container-v2 {
            flex-direction: column;
            min-height: auto;
          }
          .mock-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.03);
          }
          .mock-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      {/* Decorative Blobs */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
      <div className="glow-blob glow-blob-3" />

      <div className="landing-content">
        <header className="landing-header">
          <Link to="/" className="landing-logo">
            <Wallet size={28} />
            <span>SpendTracker</span>
          </Link>
          <nav className="landing-nav">
            <a href="#features" onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }} className="nav-item">Features</a>
            <a href="#pricing" onClick={handleScrollToPricing} className="nav-item">Pricing</a>
            <a href="#faq" onClick={(e) => {
              e.preventDefault();
              document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
            }} className="nav-item">FAQ</a>
          </nav>
          <div className="header-actions">
            {user ? (
              <Link to="/dashboard" className="btn-landing-signup">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn-landing-login">Login</Link>
                <Link to="/signup" className="btn-landing-signup">Sign Up</Link>
              </>
            )}
          </div>
        </header>

        <main className="hero-section">
          <div className="hero-badge">
            <span className="pill">New</span>
            <span>Version 2.0 Real-time MongoDB Cloud Sync</span>
          </div>
          <h1 className="hero-title">Take Complete Control<br />of Your Financial Destiny.</h1>
          <p className="hero-desc">
            SpendTracker is a high-performance visual ledger and metrics suite designed to log transactions, inspect categories, and optimize cash flow in real-time.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn-hero-primary">
                <span>Go to Dashboard</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link to="/signup" className="btn-hero-primary">
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>
            )}
            <a href="#pricing" onClick={handleScrollToPricing} className="btn-hero-secondary">View Pricing</a>
          </div>

          {/* Interactive Window Mockup */}
          <div className="mockup-outer">
            <div className="mockup-container-v2">
              {/* Sidebar */}
              <div className="mock-sidebar">
                <div className="mock-sidebar-brand">
                  <Wallet size={20} />
                  <span>SpendTracker</span>
                </div>
                <div className="mock-menu">
                  <div className="mock-menu-item active">
                    <LayoutGrid size={16} />
                    <span>Dashboard</span>
                  </div>
                  <div className="mock-menu-item">
                    <FileText size={16} />
                    <span>Ledger Entries</span>
                  </div>
                  <div className="mock-menu-item">
                    <TrendingUp size={16} />
                    <span>Visual Analytics</span>
                  </div>
                  <div className="mock-menu-item">
                    <Settings size={16} />
                    <span>Config Settings</span>
                  </div>
                </div>
              </div>

              {/* Main Panel */}
              <div className="mock-main">
                <div className="mock-header-panel">
                  <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>Financial Overview</div>
                  <div className="mock-profile">
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Sanjay</span>
                    <div className="mock-avatar">S</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mock-metrics">
                  <div className="mock-card income">
                    <div className="mock-card-label">Monthly Income</div>
                    <div className="mock-card-val" style={{ color: '#10b981' }}>₹1,24,500</div>
                  </div>
                  <div className="mock-card expense">
                    <div className="mock-card-label">Monthly Burn</div>
                    <div className="mock-card-val" style={{ color: '#f43f5e' }}>₹42,800</div>
                  </div>
                  <div className="mock-card balance">
                    <div className="mock-card-label">Net Balance</div>
                    <div className="mock-card-val" style={{ color: '#8b5cf6' }}>₹81,700</div>
                  </div>
                </div>

                {/* SVG Mini Chart */}
                <div className="mock-chart-box">
                  <div className="mock-chart-header">
                    <span style={{ fontWeight: 600 }}>Wealth Progression Index</span>
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <TrendingUp size={12} /> +12.4%
                    </span>
                  </div>
                  <svg className="mock-svg-chart" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Lines */}
                    <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    {/* Shadow Area */}
                    <path d="M 0 25 Q 20 12 40 18 T 80 8 T 100 5 L 100 30 L 0 30 Z" fill="url(#chartGlow)" />
                    {/* Main Line */}
                    <path d="M 0 25 Q 20 12 40 18 T 80 8 T 100 5" fill="none" stroke="#10b981" strokeWidth="1.2" />
                    {/* Glowing dots */}
                    <circle cx="100" cy="5" r="1.5" fill="#10b981" />
                    <circle cx="40" cy="18" r="1" fill="#8b5cf6" />
                  </svg>
                </div>

                {/* Transactions */}
                <div className="mock-trans-list">
                  <div className="mock-trans-row">
                    <div className="mock-trans-left">
                      <span className="mock-trans-cat" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>Salary</span>
                      <span style={{ fontWeight: 600 }}>Freelance Retainer</span>
                    </div>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>+₹85,000</span>
                  </div>
                  <div className="mock-trans-row">
                    <div className="mock-trans-left">
                      <span className="mock-trans-cat" style={{ background: 'rgba(244,63,94,0.15)', color: '#f43f5e' }}>Others</span>
                      <span style={{ fontWeight: 600 }}>Server Subscription</span>
                    </div>
                    <span style={{ color: '#f43f5e', fontWeight: 700 }}>-₹3,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Social Proof */}
        <section className="trusted-section">
          <h3 className="trusted-title">Synchronized with Modern Standards</h3>
          <div className="trusted-logos">
            <span className="trusted-logo"><Coins size={18} /> React 18</span>
            <span className="trusted-logo"><Layers size={18} /> Vite Bundler</span>
            <span className="trusted-logo"><Star size={18} /> MongoDB Atlas</span>
            <span className="trusted-logo"><Shield size={18} /> JWT Auth</span>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-section" id="features">
          <div className="section-header">
            <span className="section-tag">High Fidelity Features</span>
            <h2 className="section-title">Engineered for Absolute Transparency</h2>
          </div>
          <div className="features-grid">
            <div className="feature-item-v2">
              <div className="feature-icon-v2">
                <BarChart3 size={24} />
              </div>
              <h3 className="feature-name-v2">Dynamic Visual Reports</h3>
              <p className="feature-desc-v2">
                Get high-resolution graphs representing monthly allocations, trends, and categorical saving insights instantly.
              </p>
            </div>

            <div className="feature-item-v2">
              <div className="feature-icon-v2">
                <Shield size={24} />
              </div>
              <h3 className="feature-name-v2">Secure Multi-User Space</h3>
              <p className="feature-desc-v2">
                Fully isolated cloud storage using JSON Web Tokens (JWT) and encrypted transport layers for safety.
              </p>
            </div>

            <div className="feature-item-v2">
              <div className="feature-icon-v2">
                <Clock size={24} />
              </div>
              <h3 className="feature-name-v2">Frictionless Ledger CRUD</h3>
              <p className="feature-desc-v2">
                Instantly insert, modify, and delete transactions. Custom category checks warn you if remarks are missing.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="pricing-section" id="pricing">
          <div className="section-header">
            <span className="section-tag">Simple Pricing</span>
            <h2 className="section-title">Honest Plans. No Hidden Traps.</h2>
          </div>
          <div className="pricing-grid-v2">
            {/* Starter */}
            <div className="pricing-card-v2">
              <h3 className="plan-name-v2">Starter</h3>
              <div className="plan-price-v2">₹0<span>/month</span></div>
              <p className="plan-desc-v2">Ideal for individuals looking to get clear visibility on basic spending patterns.</p>
              <ul className="plan-features-v2">
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Unlimited transactions</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Monthly breakdown</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>MongoDB secure storage</span></li>
              </ul>
              <Link to="/signup" className="btn-pricing-v2">Get Started Free</Link>
            </div>

            {/* Pro Premium */}
            <div className="pricing-card-v2 premium">
              <h3 className="plan-name-v2">Pro Premium</h3>
              <div className="plan-price-v2">₹199<span>/month</span></div>
              <p className="plan-desc-v2">For professionals, builders, and creators who need detailed ledger analytics.</p>
              <ul className="plan-features-v2">
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Everything in Starter</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Custom category configurations</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Detailed CSV data downloads</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Advanced date filter tags</span></li>
              </ul>
              <Link to="/signup" className="btn-pricing-v2 primary">Upgrade to Pro</Link>
            </div>

            {/* Enterprise */}
            <div className="pricing-card-v2">
              <h3 className="plan-name-v2">Enterprise</h3>
              <div className="plan-price-v2">₹499<span>/month</span></div>
              <p className="plan-desc-v2">For agencies, partnerships, and teams managing collaborative wealth flows.</p>
              <ul className="plan-features-v2">
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Everything in Pro Premium</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Shared multi-user ledgers</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Custom API webhooks</span></li>
                <li className="plan-feature-item-v2"><Check size={16} /> <span>Priority support response</span></li>
              </ul>
              <a href="mailto:support@spendtracker.io" className="btn-pricing-v2">Contact Sales</a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-q"><HelpCircle size={18} /> Is my data completely private?</h4>
              <p className="faq-a">Yes. Your transactions are tied to your personal account via securely hashed JSON Web Tokens (JWT) and saved in isolated database partitions.</p>
            </div>
            <div className="faq-item">
              <h4 className="faq-q"><HelpCircle size={18} /> Can I switch currencies?</h4>
              <p className="faq-a">SpendTracker has been customized to fully support Indian Rupees (₹). All statistics and summaries default to INR representation.</p>
            </div>
            <div className="faq-item">
              <h4 className="faq-q"><HelpCircle size={18} /> What happens when I export?</h4>
              <p className="faq-a">Pro users can generate formatted CSV downloads containing full timestamps, categorizations, amounts, and descriptions of their ledger records.</p>
            </div>
            <div className="faq-item">
              <h4 className="faq-q"><HelpCircle size={18} /> How does the 'Others' warning work?</h4>
              <p className="faq-a">When selecting 'Others' as a category, the system enforces a strict validation rule requiring a description. This prevents blank, unidentifiable transactions.</p>
            </div>
          </div>
        </section>

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
                <a href="#features" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }} className="footer-link">Features</a>
                <a href="#pricing" onClick={handleScrollToPricing} className="footer-link">Pricing</a>
                <a href="#faq" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }} className="footer-link">FAQs</a>
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
    </div>
  );
}
