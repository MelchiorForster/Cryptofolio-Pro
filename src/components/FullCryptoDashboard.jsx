import React, { useState, useEffect } from "react";

const FullCryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("market");
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchCryptoData();
    loadPortfolio();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/prices.php");
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Convert API object format to array format
      const formattedData = Object.entries(data).map(([id, info]) => ({
        id: id,
        name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " "),
        symbol: id.substring(0, 3).toUpperCase(),
        current_price: info.eur,
        price_change_percentage_24h: info.eur_24h_change,
      }));

      setCryptoData(formattedData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      // Fallback zu Mock-Daten wenn API nicht verfügbar
      setCryptoData([
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          current_price: 45123.45,
          price_change_percentage_24h: 2.34,
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          current_price: 2987.12,
          price_change_percentage_24h: -1.23,
        },
        {
          id: "cardano",
          name: "Cardano",
          symbol: "ADA",
          current_price: 0.89,
          price_change_percentage_24h: 5.67,
        },
        {
          id: "polkadot",
          name: "Polkadot",
          symbol: "DOT",
          current_price: 12.34,
          price_change_percentage_24h: -0.87,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadPortfolio = () => {
    const saved = localStorage.getItem("cryptoPortfolio");
    if (saved) {
      const portfolioData = JSON.parse(saved);
      setPortfolio(portfolioData);
      calculateTotalValue(portfolioData);
    }
  };

  const calculateTotalValue = (portfolioData) => {
    const total = portfolioData.reduce((sum, item) => {
      const crypto = cryptoData.find((c) => c.id === item.id);
      return sum + (crypto ? crypto.current_price * item.amount : 0);
    }, 0);
    setTotalValue(total);
  };

  const addToPortfolio = (crypto, amount) => {
    const existingIndex = portfolio.findIndex((item) => item.id === crypto.id);
    let newPortfolio;

    if (existingIndex >= 0) {
      newPortfolio = [...portfolio];
      newPortfolio[existingIndex].amount += parseFloat(amount);
    } else {
      newPortfolio = [
        ...portfolio,
        {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          amount: parseFloat(amount),
          buyPrice: crypto.current_price,
        },
      ];
    }

    setPortfolio(newPortfolio);
    localStorage.setItem("cryptoPortfolio", JSON.stringify(newPortfolio));
    calculateTotalValue(newPortfolio);
  };

  const removeFromPortfolio = (cryptoId) => {
    const newPortfolio = portfolio.filter((item) => item.id !== cryptoId);
    setPortfolio(newPortfolio);
    localStorage.setItem("cryptoPortfolio", JSON.stringify(newPortfolio));
    calculateTotalValue(newPortfolio);
  };

  // Styles
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

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #333",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    marginRight: "10px",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>🚀 CryptoFolio Pro</h1>
        <div style={{ textAlign: "center", fontSize: "18px" }}>
          Lade Kryptowährungs-Daten...
        </div>
      </div>
    );
  }

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
            <button style={buttonStyle} onClick={fetchCryptoData}>
              🔄 Daten aktualisieren
            </button>
            {error && (
              <p style={{ color: "#ff4444", marginTop: "10px" }}>⚠️ {error}</p>
            )}
          </div>

          <h2
            style={{ fontSize: "24px", marginBottom: "20px", color: "#00ff88" }}
          >
            💰 Top Kryptowährungen
          </h2>

          {cryptoData.map((crypto, index) => (
            <div key={crypto.id || index} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "20px" }}>
                    {crypto.name || "Unbekannt"}
                  </h3>
                  <p style={{ margin: 0, color: "#ccc" }}>
                    {crypto.symbol?.toUpperCase() || "N/A"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    ${crypto.current_price?.toLocaleString() || "N/A"}
                  </div>
                  <div
                    style={{
                      color:
                        crypto.price_change_percentage_24h >= 0
                          ? "#00ff88"
                          : "#ff4444",
                    }}
                  >
                    {crypto.price_change_percentage_24h
                      ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>
                <input
                  type="number"
                  placeholder="Menge"
                  style={inputStyle}
                  id={`amount-${crypto.id}`}
                  step="0.001"
                />
                <button
                  style={buttonStyle}
                  onClick={() => {
                    const amount = document.getElementById(
                      `amount-${crypto.id}`
                    ).value;
                    if (amount && amount > 0) {
                      addToPortfolio(crypto, amount);
                      document.getElementById(`amount-${crypto.id}`).value = "";
                    }
                  }}
                >
                  + Portfolio hinzufügen
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
              Gesamt: $
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          {portfolio.length === 0 ? (
            <div
              style={{ textAlign: "center", fontSize: "18px", color: "#999" }}
            >
              <p>📝 Dein Portfolio ist leer</p>
              <p>Gehe zu "Märkte" um Kryptowährungen hinzuzufügen</p>
            </div>
          ) : (
            portfolio.map((item, index) => {
              const currentCrypto = cryptoData.find((c) => c.id === item.id);
              const currentValue = currentCrypto
                ? currentCrypto.current_price * item.amount
                : 0;
              const profit = currentCrypto
                ? (currentCrypto.current_price - item.buyPrice) * item.amount
                : 0;
              const profitPercent = item.buyPrice
                ? ((currentCrypto?.current_price - item.buyPrice) /
                    item.buyPrice) *
                  100
                : 0;

              return (
                <div key={index} style={cardStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 5px 0", fontSize: "20px" }}>
                        {item.name}
                      </h3>
                      <p style={{ margin: 0, color: "#ccc" }}>
                        {item.amount} {item.symbol?.toUpperCase()}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                        $
                        {currentValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div
                        style={{
                          color: profit >= 0 ? "#00ff88" : "#ff4444",
                        }}
                      >
                        {profit >= 0 ? "+" : ""}${profit.toFixed(2)} (
                        {profitPercent.toFixed(2)}%)
                      </div>
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#ff4444",
                          marginTop: "10px",
                        }}
                        onClick={() => removeFromPortfolio(item.id)}
                      >
                        🗑️ Entfernen
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
                <div style={{ fontSize: "24px", color: "#00d4ff" }}>
                  {portfolio.length}
                </div>
                <div>Assets im Portfolio</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "#00ff88" }}>
                  $
                  {totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div>Gesamtwert</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "#ffaa00" }}>
                  {cryptoData.length}
                </div>
                <div>Verfolgte Coins</div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3>🎯 Diversifikation</h3>
            {portfolio.length > 0 ? (
              portfolio.map((item, index) => {
                const currentCrypto = cryptoData.find((c) => c.id === item.id);
                const currentValue = currentCrypto
                  ? currentCrypto.current_price * item.amount
                  : 0;
                const percentage =
                  totalValue > 0 ? (currentValue / totalValue) * 100 : 0;

                return (
                  <div key={index} style={{ margin: "10px 0" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{item.name}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#333",
                        height: "10px",
                        borderRadius: "5px",
                        overflow: "hidden",
                        marginTop: "5px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#00d4ff",
                          width: `${percentage}%`,
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: "#999" }}>Keine Portfolio-Daten verfügbar</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FullCryptoDashboard;
