import { useEffect, useRef, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";

const LandingPage = () => {
  const { connectWallet, isConnecting } = useWeb3();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: "🔒",
      title: "Decentralized Collateral",
      description: "Deposit WETH and WBTC as collateral to mint stablecoins. Your assets remain in your control."
    },
    {
      icon: "⚖️",
      title: "Over-Collateralized",
      description: "Maintain a healthy collateralization ratio to ensure stability and security of the protocol."
    },
    {
      icon: "💎",
      title: "Mint Stablecoins",
      description: "Mint RaveCoin (DSC) tokens against your collateral at any time, maintaining liquidity."
    },
    {
      icon: "🔄",
      title: "Redeem Anytime",
      description: "Redeem your collateral by burning DSC tokens. Full control over your assets."
    },
    {
      icon: "⚡",
      title: "Liquidation Protection",
      description: "Automated liquidation system protects the protocol while maintaining fairness."
    },
    {
      icon: "📊",
      title: "Real-Time Pricing",
      description: "Chainlink price feeds ensure accurate collateral valuation in real-time."
    }
  ];

  const useCases = [
    {
      title: "DeFi Lending",
      description: "Use your crypto assets as collateral to mint stablecoins without selling your holdings."
    },
    {
      title: "Liquidity Management",
      description: "Access liquidity from your long-term holdings while maintaining exposure to asset appreciation."
    },
    {
      title: "Trading & Arbitrage",
      description: "Mint stablecoins instantly to capitalize on trading opportunities across DeFi protocols."
    },
    {
      title: "Yield Farming",
      description: "Use minted stablecoins in yield farming strategies while keeping your collateral secure."
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
        <div className="hero-content">
          <div className="hero-logo">
            <svg width="80" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="url(#heroGradient)" opacity="0.95"/>
              <path d="M16 8L20 16L16 20L12 16L16 8Z" fill="white" opacity="0.98"/>
              <defs>
                <linearGradient id="heroGradient" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#c0c0c0"/>
                  <stop offset="50%" stopColor="#ffffff"/>
                  <stop offset="100%" stopColor="#c0c0c0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hero-badge">
            <span className="badge-text">Decentralized Stablecoin Protocol</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">RaveCoin</span>
            <span className="title-subtitle">Stability Meets Innovation</span>
          </h1>
          <p className="hero-description">
            A decentralized stablecoin protocol built on Ethereum, enabling users to mint 
            stablecoins against over-collateralized crypto assets. Experience the future 
            of decentralized finance with transparency, security, and control.
          </p>
          <button 
            className="hero-cta"
            onClick={connectWallet}
            disabled={isConnecting}
          >
            <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">Built for Excellence</h2>
            <p className="section-description">
              Every aspect of RaveCoin is designed with precision and security in mind.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Use Cases</span>
            <h2 className="section-title">Unlock Your Potential</h2>
            <p className="section-description">
              Discover how RaveCoin empowers your DeFi journey.
            </p>
          </div>
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="use-case-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="use-case-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="use-case-title">{useCase.title}</h3>
                <p className="use-case-description">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Simple. Secure. Powerful.</h2>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="step-title">Deposit Collateral</h3>
                <p className="step-description">
                  Deposit WETH or WBTC as collateral. Your assets are securely locked in the protocol.
                </p>
              </div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="step-title">Mint Stablecoins</h3>
                <p className="step-description">
                  Mint RaveCoin (DSC) tokens against your collateral. Maintain a healthy collateralization ratio.
                </p>
              </div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="step-title">Use or Redeem</h3>
                <p className="step-description">
                  Use your stablecoins in DeFi or redeem them anytime by burning DSC to unlock collateral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Begin?</h2>
            <p className="cta-description">
              Connect your wallet and start minting stablecoins today.
            </p>
            <button 
              className="cta-button"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="section-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo-container">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="url(#footerGradient)" opacity="0.9"/>
                  <path d="M16 8L20 16L16 20L12 16L16 8Z" fill="white" opacity="0.95"/>
                  <defs>
                    <linearGradient id="footerGradient" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#c0c0c0"/>
                      <stop offset="50%" stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#c0c0c0"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="footer-logo">RaveCoin</span>
              </div>
              <p className="footer-tagline">Decentralized Stablecoin Protocol</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">Protocol</h4>
                <a href="#" className="footer-link">Documentation</a>
                <a href="#" className="footer-link">Security</a>
                <a href="#" className="footer-link">Audits</a>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Community</h4>
                <a href="#" className="footer-link">Discord</a>
                <a href="#" className="footer-link">Twitter</a>
                <a href="#" className="footer-link">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 RaveCoin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

