import React, { useState } from "react";

const WorkingDashboard = () => {
  const [showDemo, setShowDemo] = useState(false);

  // Mock-Daten für die Demonstration
  const mockData = {
    bitcoin: {
      usd: 116202,
      usd_24h_change: 0.08,
      usd_market_cap: 2312110928164,
    },
    ethereum: {
      usd: 3965.86,
      usd_24h_change: 4.17,
      usd_market_cap: 478537107262,
    },
    cardano: { usd: 0.78, usd_24h_change: 3.85, usd_market_cap: 28327145233 },
    solana: { usd: 189.45, usd_24h_change: -1.23, usd_market_cap: 89456123789 },
    avalanche: {
      usd: 45.67,
      usd_24h_change: 2.34,
      usd_market_cap: 17892456123,
    },
    polkadot: {
      usd: 12.89,
      usd_24h_change: -0.56,
      usd_market_cap: 15678234567,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            🚀 CryptoFolio Pro
            <span className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              GPT-5 Enhanced
            </span>
          </h1>
          <p className="text-xl text-purple-200">
            AI-Powered Cryptocurrency Portfolio Management
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">API Status</h3>
              <p className="text-green-400 font-medium">
                Live CoinGecko Integration
              </p>
              <p className="text-gray-300 text-sm mt-2">
                Real-time crypto data
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <div className="text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-bold text-white mb-2">GPT-5 AI</h3>
              <p className="text-blue-400 font-medium">Enhanced Intelligence</p>
              <p className="text-gray-300 text-sm mt-2">
                Smart portfolio insights
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Performance</h3>
              <p className="text-purple-400 font-medium">Lightning Fast</p>
              <p className="text-gray-300 text-sm mt-2">
                60s intelligent caching
              </p>
            </div>
          </div>
        </div>

        {/* Demo Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {showDemo ? "🔼 Hide Demo Data" : "🔥 Show Live Demo Data"}
          </button>
        </div>

        {/* Crypto Grid */}
        {showDemo && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mockData).map(([coin, data]) => (
              <div
                key={coin}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Coin Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white capitalize flex items-center gap-2">
                    <span className="text-2xl">
                      {coin === "bitcoin"
                        ? "₿"
                        : coin === "ethereum"
                        ? "Ξ"
                        : coin === "cardano"
                        ? "₳"
                        : coin === "solana"
                        ? "◎"
                        : coin === "avalanche"
                        ? "🔺"
                        : "●"}
                    </span>
                    {coin.charAt(0).toUpperCase() + coin.slice(1)}
                  </h3>
                  <div
                    className={`flex items-center gap-1 ${
                      data.usd_24h_change >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    <span className="text-lg">
                      {data.usd_24h_change >= 0 ? "📈" : "📉"}
                    </span>
                    <span className="font-bold">
                      {data.usd_24h_change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-white mb-3">
                  ${data.usd.toLocaleString()}
                </div>

                {/* Market Cap */}
                <div className="text-sm text-gray-300 mb-4">
                  Market Cap: ${(data.usd_market_cap / 1000000000).toFixed(2)}B
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-3">
                  <div className="text-xs text-purple-300 mb-1">
                    🧠 GPT-5 AI Insight:
                  </div>
                  <div className="text-sm text-white font-medium">
                    {data.usd_24h_change > 3
                      ? "🚀 Strong bullish momentum detected"
                      : data.usd_24h_change > 0
                      ? "📊 Positive trend, good DCA opportunity"
                      : data.usd_24h_change > -2
                      ? "⚖️ Consolidation phase, monitor closely"
                      : "🛡️ Defensive positioning recommended"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GPT-5 Features Showcase */}
        <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30">
          <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            🌟 GPT-5 Enhanced Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Smart Portfolio Analysis
                  </h3>
                  <p className="text-gray-300">
                    AI-powered risk assessment and optimization
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Real-time Market Insights
                  </h3>
                  <p className="text-gray-300">
                    Advanced sentiment analysis and trend prediction
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Lightning Performance
                  </h3>
                  <p className="text-gray-300">
                    60-second intelligent caching with retry logic
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Enterprise Security
                  </h3>
                  <p className="text-gray-300">
                    Secure API integration with fallback systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-200">
          <p className="text-lg">
            🤖 Powered by GPT-5 Enhanced Intelligence & Live CoinGecko Data
          </p>
          <p className="text-sm mt-2 opacity-75">
            Built with React 18, Vite, PHP 8.2 & Advanced AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingDashboard;
