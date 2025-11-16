import { useState } from "react";
import { useWeb3 } from "./hooks/useWeb3";
import { useDSCEngine } from "./hooks/useDSCEngine";
import { CHAIN_ID } from "./constants/addresses";
import { getNetworkName, getNetworkColor } from "./utils/network";
import Dashboard from "./components/Dashboard";
import DepositCollateral from "./components/DepositCollateral";
import MintDSC from "./components/MintDSC";
import RedeemCollateral from "./components/RedeemCollateral";
import BurnDSC from "./components/BurnDSC";
import Liquidation from "./components/Liquidation";
import "./App.css";

function App() {
  const { account, isConnected, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const { accountInfo, loading } = useDSCEngine();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isConnected) {
    return (
      <div className="app">
        <div className="connect-container">
          <div className="connect-card">
            <h1>RaveCoin</h1>
            <p className="subtitle">Decentralized Stablecoin Platform</p>
            <button 
              className="connect-button" 
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
            <p className="hint">Please connect your MetaMask wallet to continue</p>
            <p className="hint-small">
              💡 Tip: If you want to switch accounts, you can select a different account in the MetaMask dialog, 
              or disconnect this site in MetaMask settings (Settings → Connected Sites)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>RaveCoin</h1>
          <div className="header-right">
            <div className="network-badge" style={{ backgroundColor: getNetworkColor(CHAIN_ID) }}>
              {getNetworkName(CHAIN_ID)}
            </div>
            <div className="account-info">
              <span className="account-address">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
            </div>
            <div className="health-factor-badge">
              Health: {accountInfo.healthFactor}
            </div>
            <button 
              className="disconnect-button"
              onClick={disconnectWallet}
              title="Disconnect wallet"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      <nav className="nav">
        <button 
          className={activeTab === "dashboard" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === "deposit" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit
        </button>
        <button 
          className={activeTab === "mint" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("mint")}
        >
          Mint DSC
        </button>
        <button 
          className={activeTab === "redeem" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("redeem")}
        >
          Redeem
        </button>
        <button 
          className={activeTab === "burn" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("burn")}
        >
          Burn DSC
        </button>
        <button 
          className={activeTab === "liquidate" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("liquidate")}
        >
          Liquidate
        </button>
      </nav>

      <main className="main-content">
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing transaction...</p>
          </div>
        )}
        
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "deposit" && <DepositCollateral />}
        {activeTab === "mint" && <MintDSC />}
        {activeTab === "redeem" && <RedeemCollateral />}
        {activeTab === "burn" && <BurnDSC />}
        {activeTab === "liquidate" && <Liquidation />}
      </main>
    </div>
  );
}

export default App;

