import React from "react";

const SuperSimpleDashboard = () => {
  const style = {
    padding: "40px",
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const headerStyle = {
    fontSize: "48px",
    color: "#00ff88",
    marginBottom: "30px",
  };

  const cardStyle = {
    backgroundColor: "#333",
    padding: "20px",
    margin: "20px auto",
    borderRadius: "10px",
    maxWidth: "400px",
  };

  return (
    <div style={style}>
      <h1 style={headerStyle}>🚀 CryptoFolio Pro</h1>

      <div style={cardStyle}>
        <h2>✅ React funktioniert!</h2>
        <p>Dieses Dashboard wird erfolgreich gerendert.</p>
      </div>

      <div style={cardStyle}>
        <h3>💰 Bitcoin</h3>
        <p style={{ fontSize: "24px", color: "#00ff88" }}>$45,123.45</p>
        <p style={{ color: "#00ff88" }}>+2.34%</p>
      </div>

      <div style={cardStyle}>
        <h3>💎 Ethereum</h3>
        <p style={{ fontSize: "24px", color: "#ff4444" }}>$2,987.12</p>
        <p style={{ color: "#ff4444" }}>-1.23%</p>
      </div>

      <button
        style={{
          backgroundColor: "#00ff88",
          color: "#000",
          border: "none",
          padding: "15px 30px",
          fontSize: "18px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Daten aktualisieren
      </button>
    </div>
  );
};

export default SuperSimpleDashboard;
