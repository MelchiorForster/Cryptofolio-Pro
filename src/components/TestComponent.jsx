import React from "react";

const TestComponent = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          🚀 CryptoFolio Pro Test
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          React App läuft erfolgreich!
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "10px",
            marginTop: "2rem",
          }}
        >
          <p>✅ Vite Server: Aktiv</p>
          <p>✅ React 18: Geladen</p>
          <p>✅ Component: Gerendert</p>
        </div>
        <button
          onClick={() => alert("Button funktioniert!")}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "1rem",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
