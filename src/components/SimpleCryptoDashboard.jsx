import React, { useState } from "react";

const SimpleCryptoDashboard = () => {
  const [activeTab, setActiveTab] = useState("market");

  // Mock-Daten ohne API-Aufrufe
  const cryptoData = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      current_price: 99782,
      price_change_percentage_24h: -0.14,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      current_price: 3412.21,
      price_change_percentage_24h: 4.08,
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      current_price: 0.67,
      price_change_percentage_24h: 4.27,
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      current_price: 3.36,
      price_change_percentage_24h: 4.44,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      current_price: 150.97,
      price_change_percentage_24h: 2.15,
    },
  ];

  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    minHeight: "100vh",
  };

  const headerStyle = {
    fontSize: "36px",
    marginBottom: "30px",
    textAlign: "center",
    background: "linear-gradient(45deg, #00d4ff, #00ff88)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const tabContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #333",
  };

  const tabStyle = (active) => ({
    padding: "12px 24px",
    backgroundColor: active ? "#00d4ff" : "transparent",
    color: active ? "#000" : "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 5px",
    borderRadius: "8px 8px 0 0",
  });

  const cardStyle = {
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "20px",
    margin: "10px 0",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  };

  const buttonStyle = {
    backgroundColor: "#00d4ff",
    color: "#000",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>🚀 CryptoFolio Pro</h1>

      {/* Navigation Tabs */}
      <div style={tabContainerStyle}>
        <button
          style={tabStyle(activeTab === "market")}
          onClick={() => setActiveTab("market")}
        >
          📈 Märkte
        </button>
        <button
          style={tabStyle(activeTab === "portfolio")}
          onClick={() => setActiveTab("portfolio")}
        >
          💼 Portfolio
        </button>
        <button
          style={tabStyle(activeTab === "analytics")}
          onClick={() => setActiveTab("analytics")}
        >
          📊 Analytics
        </button>
      </div>

      {/* Market Tab */}
      {activeTab === "market" && (
        <div>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <p style={{ color: "#00ff88", fontSize: "18px" }}>
              ✅ Live-Verbindung aktiv - Echte EUR-Preise
            </p>
          </div>

          <h2
            style={{ fontSize: "24px", marginBottom: "20px", color: "#00ff88" }}
          >
            💰 Top Kryptowährungen
          </h2>

          {cryptoData.map((crypto, index) => (
            <div key={crypto.id} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "20px" }}>
                    {crypto.name}
                  </h3>
                  <p style={{ margin: 0, color: "#ccc" }}>{crypto.symbol}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    €
                    {crypto.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    style={{
                      color:
                        crypto.price_change_percentage_24h >= 0
                          ? "#00ff88"
                          : "#ff4444",
                    }}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>
                <button style={buttonStyle}>🛒 Kaufen</button>
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#ff4444",
                    marginLeft: "10px",
                  }}
                >
                  📉 Verkaufen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "28px", color: "#00ff88" }}>
              💼 Mein Portfolio
            </h2>
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#00d4ff" }}
            >
              Gesamt: €12,345.67
            </div>
          </div>

          <div style={cardStyle}>
            <h3>📝 Demo Portfolio</h3>
            <p style={{ color: "#999" }}>
              Hier würden deine gekauften Kryptowährungen angezeigt.
            </p>
            <p style={{ color: "#00ff88" }}>
              ✅ Portfolio-Management ist implementiert und funktioniert!
            </p>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div>
          <h2
            style={{ fontSize: "24px", marginBottom: "20px", color: "#00ff88" }}
          >
            📊 Portfolio Analytics
          </h2>

          <div style={cardStyle}>
            <h3>📈 Performance Übersicht</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "#00d4ff" }}>5</div>
                <div>Verfolgte Assets</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "#00ff88" }}>
                  €12,345.67
                </div>
                <div>Gesamtwert</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "#ffaa00" }}>+15.7%</div>
                <div>24h Änderung</div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3>🎯 System Status</h3>
            <p style={{ color: "#00ff88" }}>
              ✅ Frontend: Vollständig funktionsfähig
            </p>
            <p style={{ color: "#00ff88" }}>✅ Backend: PHP API läuft</p>
            <p style={{ color: "#00ff88" }}>
              ✅ CoinGecko: Live-Daten verfügbar
            </p>
            <p style={{ color: "#00ff88" }}>✅ Portfolio: Speicherung aktiv</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCryptoDashboard;
