import React, { useState, useEffect } from "react";

const BasicDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/crypto_data.php");
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setCryptoData(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    minHeight: "100vh",
  };

  const headerStyle = {
    fontSize: "32px",
    marginBottom: "30px",
    textAlign: "center",
    color: "#00d4ff",
  };

  const cardStyle = {
    backgroundColor: "#2a2a2a",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "20px",
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "#00d4ff",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>CryptoFolio Pro</h1>
        <div style={{ textAlign: "center", fontSize: "18px" }}>
          Lade Kryptowährungs-Daten...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>CryptoFolio Pro</h1>
        <div style={{ textAlign: "center", color: "#ff4444" }}>
          <h3>Fehler beim Laden der Daten:</h3>
          <p>{error}</p>
          <button style={buttonStyle} onClick={fetchCryptoData}>
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>CryptoFolio Pro</h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button style={buttonStyle} onClick={fetchCryptoData}>
          Daten aktualisieren
        </button>
      </div>

      <div>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Top Kryptowährungen
        </h2>

        {cryptoData.length === 0 ? (
          <p>Keine Daten verfügbar</p>
        ) : (
          cryptoData.map((crypto, index) => (
            <div key={crypto.id || index} style={cardStyle}>
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
          ))
        )}
      </div>
    </div>
  );
};

export default BasicDashboard;
