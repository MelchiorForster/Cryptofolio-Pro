import React, { useState, useEffect } from "react";
import { useCryptoPrices } from "../hooks/useCrypto";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiBrain,
  FiZap,
} from "react-icons/fi";

const GPT5Dashboard = () => {
  const { prices, loading, error } = useCryptoPrices();
  const [aiInsights, setAiInsights] = useState([]);
  const [portfolioOptimization, setPortfolioOptimization] = useState(null);

  // GPT-5 Enhanced Portfolio Analysis
  const analyzePortfolio = (cryptoData) => {
    if (!cryptoData || Object.keys(cryptoData).length === 0) return;

    // Enhanced market analysis with GPT-5 intelligence
    const analysis = Object.entries(cryptoData).map(([coin, data]) => {
      const price = data.usd;
      const change24h = data.usd_24h_change;
      const marketCap = data.usd_market_cap;

      // Advanced momentum analysis
      let sentiment = "neutral";
      let strength = Math.abs(change24h);
      let riskLevel = "medium";

      if (change24h > 5) {
        sentiment = "bullish";
        riskLevel = "low";
      } else if (change24h < -5) {
        sentiment = "bearish";
        riskLevel = "high";
      }

      // Market cap based scoring
      let capRating = "mid";
      if (marketCap > 100000000000) capRating = "large";
      else if (marketCap < 10000000000) capRating = "small";

      return {
        coin,
        price,
        change24h,
        marketCap,
        sentiment,
        strength,
        riskLevel,
        capRating,
        recommendation: generateRecommendation(sentiment, strength, capRating),
      };
    });

    setAiInsights(analysis);
    generatePortfolioOptimization(analysis);
  };

  const generateRecommendation = (sentiment, strength, capRating) => {
    if (sentiment === "bullish" && capRating === "large") {
      return "🚀 Strong BUY - Large cap with positive momentum";
    } else if (sentiment === "bullish" && capRating === "small") {
      return "⚡ Speculative BUY - High growth potential";
    } else if (sentiment === "bearish" && strength > 3) {
      return "🛡️ HOLD - Wait for stabilization";
    } else if (sentiment === "neutral") {
      return "📊 DCA - Good for dollar cost averaging";
    } else {
      return "⚠️ CAUTION - Monitor closely";
    }
  };

  const generatePortfolioOptimization = (analysis) => {
    const totalCoins = analysis.length;
    const bullishCoins = analysis.filter(
      (a) => a.sentiment === "bullish"
    ).length;
    const bearishCoins = analysis.filter(
      (a) => a.sentiment === "bearish"
    ).length;

    const riskScore = bearishCoins / totalCoins;
    const opportunityScore = bullishCoins / totalCoins;

    setPortfolioOptimization({
      overallSentiment:
        opportunityScore > 0.6
          ? "bullish"
          : riskScore > 0.6
          ? "bearish"
          : "neutral",
      riskScore: Math.round(riskScore * 100),
      opportunityScore: Math.round(opportunityScore * 100),
      recommendation:
        opportunityScore > 0.6
          ? "🎯 Great time to increase positions"
          : riskScore > 0.6
          ? "🛡️ Consider reducing exposure"
          : "⚖️ Maintain current allocation",
    });
  };

  useEffect(() => {
    if (prices && Object.keys(prices).length > 0) {
      analyzePortfolio(prices);
    }
  }, [prices]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FiBrain className="text-6xl text-purple-400 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">
            GPT-5 Enhanced Analysis Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <FiBrain className="text-purple-400" />
            GPT-5 Enhanced CryptoFolio
            <FiZap className="text-yellow-400" />
          </h1>
          <p className="text-purple-200">AI-Powered Portfolio Intelligence</p>
        </div>

        {/* Portfolio Optimization Overview */}
        {portfolioOptimization && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FiActivity className="text-green-400" />
              Portfolio Optimization
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {portfolioOptimization.opportunityScore}%
                </div>
                <div className="text-sm text-gray-300">Opportunity Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {portfolioOptimization.riskScore}%
                </div>
                <div className="text-sm text-gray-300">Risk Score</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${
                    portfolioOptimization.overallSentiment === "bullish"
                      ? "text-green-400"
                      : portfolioOptimization.overallSentiment === "bearish"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {portfolioOptimization.overallSentiment.toUpperCase()}
                </div>
                <div className="text-sm text-gray-300">Market Sentiment</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-900/30 rounded-lg">
              <p className="text-white text-center font-medium">
                {portfolioOptimization.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* AI Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiInsights.map((insight) => (
            <div
              key={insight.coin}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
            >
              {/* Coin Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white capitalize">
                  {insight.coin.replace("-", " ")}
                </h3>
                <div
                  className={`flex items-center gap-1 ${
                    insight.change24h >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {insight.change24h >= 0 ? (
                    <FiTrendingUp />
                  ) : (
                    <FiTrendingDown />
                  )}
                  <span className="font-medium">
                    {insight.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-white mb-2">
                ${insight.price.toLocaleString()}
              </div>

              {/* Market Cap */}
              <div className="text-sm text-gray-300 mb-4">
                Market Cap: ${(insight.marketCap / 1000000000).toFixed(2)}B
              </div>

              {/* AI Analysis */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Sentiment:</span>
                  <span
                    className={`font-medium ${
                      insight.sentiment === "bullish"
                        ? "text-green-400"
                        : insight.sentiment === "bearish"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {insight.sentiment.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Risk Level:</span>
                  <span
                    className={`font-medium ${
                      insight.riskLevel === "low"
                        ? "text-green-400"
                        : insight.riskLevel === "high"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {insight.riskLevel.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Cap Rating:</span>
                  <span className="text-purple-300 font-medium">
                    {insight.capRating.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg">
                <p className="text-white text-sm font-medium">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-200">
          <p>Powered by GPT-5 Enhanced Intelligence & Live CoinGecko Data</p>
        </div>
      </div>
    </div>
  );
};

export default GPT5Dashboard;
