import React, { useState, useEffect } from "react";

const SimpleTestDashboard = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Testing API...");

      const response = await fetch(
        "/api/test_prices.php?ids=bitcoin,ethereum,cardano",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setApiData(data);
    } catch (err) {
      console.error("API Error:", err);
      setError(`Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🚀 CryptoFolio Pro - GPT-5 Enhanced
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">API Status</h2>
          {loading && (
            <div className="text-yellow-400 font-medium">
              🔄 Testing API connection...
            </div>
          )}
          {error && (
            <div>
              <div className="text-red-400 font-medium mb-2">❌ {error}</div>
              <button
                onClick={testAPI}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Retry API Test
              </button>
            </div>
          )}
          {apiData?.success && !loading && (
            <div>
              <div className="text-green-400 font-medium">
                ✅ Connected to CoinGecko API
              </div>
              <div className="text-gray-300 mt-2">
                Source: {apiData?.source || "Live API"} | Timestamp:{" "}
                {new Date(apiData?.timestamp * 1000).toLocaleTimeString()}
              </div>
              <button
                onClick={testAPI}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors mt-2"
              >
                Refresh Data
              </button>
            </div>
          )}
        </div>

        {apiData?.success && (
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(apiData.data).map(([coin, data]) => (
              <div
                key={coin}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white capitalize mb-4">
                  {coin.replace("-", " ")}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-white font-bold">
                      ${data.usd?.toLocaleString() || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">24h Change:</span>
                    <span
                      className={`font-medium ${
                        (data.usd_24h_change || 0) >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {(data.usd_24h_change || 0).toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Market Cap:</span>
                    <span className="text-white">
                      ${(data.usd_market_cap / 1e9).toFixed(2)}B
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="text-white/70">
            Powered by GPT-5 Enhanced Intelligence & CoinGecko API
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestDashboard;
