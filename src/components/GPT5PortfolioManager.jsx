import React, { useState, useEffect } from "react";
import { useCryptoPrices } from "../hooks/useCrypto";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiTrendingUp,
  FiDollarSign,
  FiBrain,
  FiZap,
} from "react-icons/fi";

const GPT5PortfolioManager = () => {
  const { prices, loading } = useCryptoPrices();
  const [holdings, setHoldings] = useState([
    { id: 1, coin: "bitcoin", amount: 0.5, purchasePrice: 45000 },
    { id: 2, coin: "ethereum", amount: 2.3, purchasePrice: 3200 },
    { id: 3, coin: "cardano", amount: 1000, purchasePrice: 1.2 },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHolding, setNewHolding] = useState({
    coin: "",
    amount: "",
    purchasePrice: "",
  });
  const [aiRecommendations, setAiRecommendations] = useState([]);

  // GPT-5 Enhanced Portfolio Calculations
  const calculatePortfolioMetrics = () => {
    if (!prices || Object.keys(prices).length === 0) return null;

    let totalValue = 0;
    let totalInvested = 0;
    const holdingsWithMetrics = holdings.map((holding) => {
      const currentPrice = prices[holding.coin]?.usd || 0;
      const currentValue = holding.amount * currentPrice;
      const invested = holding.amount * holding.purchasePrice;
      const pnl = currentValue - invested;
      const pnlPercentage = invested > 0 ? (pnl / invested) * 100 : 0;

      totalValue += currentValue;
      totalInvested += invested;

      return {
        ...holding,
        currentPrice,
        currentValue,
        invested,
        pnl,
        pnlPercentage,
        allocation: 0, // Will be calculated after totalValue is known
      };
    });

    // Calculate allocations
    holdingsWithMetrics.forEach((holding) => {
      holding.allocation =
        totalValue > 0 ? (holding.currentValue / totalValue) * 100 : 0;
    });

    const totalPnL = totalValue - totalInvested;
    const totalPnLPercentage =
      totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      totalPnL,
      totalPnLPercentage,
      holdings: holdingsWithMetrics,
    };
  };

  // GPT-5 Enhanced AI Recommendations
  const generateAIRecommendations = (portfolioMetrics) => {
    if (!portfolioMetrics) return [];

    const recommendations = [];
    const { holdings } = portfolioMetrics;

    // Diversification Analysis
    const overAllocated = holdings.filter((h) => h.allocation > 40);
    if (overAllocated.length > 0) {
      recommendations.push({
        type: "rebalance",
        priority: "high",
        title: "Rebalancing Opportunity",
        description: `${overAllocated[0].coin.toUpperCase()} is over-allocated at ${overAllocated[0].allocation.toFixed(
          1
        )}%. Consider diversifying.`,
        action: "Reduce position and diversify into other assets",
      });
    }

    // Performance Analysis
    const winners = holdings.filter((h) => h.pnlPercentage > 20);
    const losers = holdings.filter((h) => h.pnlPercentage < -10);

    if (winners.length > 0) {
      recommendations.push({
        type: "profit",
        priority: "medium",
        title: "Take Profit Opportunity",
        description: `${winners[0].coin.toUpperCase()} is up ${winners[0].pnlPercentage.toFixed(
          1
        )}%. Consider taking partial profits.`,
        action: "Sell 25-50% to lock in gains",
      });
    }

    if (losers.length > 0) {
      recommendations.push({
        type: "loss",
        priority: "medium",
        title: "Review Underperforming Assets",
        description: `${losers[0].coin.toUpperCase()} is down ${Math.abs(
          losers[0].pnlPercentage
        ).toFixed(1)}%. Evaluate long-term potential.`,
        action: "Consider DCA or exit strategy",
      });
    }

    // Market Sentiment Integration
    if (prices) {
      const marketTrend =
        Object.values(prices).reduce(
          (acc, coin) => acc + (coin.usd_24h_change || 0),
          0
        ) / Object.keys(prices).length;

      if (marketTrend > 3) {
        recommendations.push({
          type: "opportunity",
          priority: "high",
          title: "Bull Market Signal",
          description: `Overall market is up ${marketTrend.toFixed(
            1
          )}%. Good time to increase exposure.`,
          action: "Consider adding to positions",
        });
      } else if (marketTrend < -3) {
        recommendations.push({
          type: "caution",
          priority: "high",
          title: "Bear Market Warning",
          description: `Overall market is down ${Math.abs(marketTrend).toFixed(
            1
          )}%. Exercise caution.`,
          action: "Consider defensive positioning",
        });
      }
    }

    return recommendations;
  };

  const portfolioMetrics = calculatePortfolioMetrics();

  useEffect(() => {
    if (portfolioMetrics) {
      setAiRecommendations(generateAIRecommendations(portfolioMetrics));
    }
  }, [portfolioMetrics, prices]);

  const addHolding = (e) => {
    e.preventDefault();
    if (newHolding.coin && newHolding.amount && newHolding.purchasePrice) {
      const holding = {
        id: Date.now(),
        coin: newHolding.coin,
        amount: parseFloat(newHolding.amount),
        purchasePrice: parseFloat(newHolding.purchasePrice),
      };
      setHoldings([...holdings, holding]);
      setNewHolding({ coin: "", amount: "", purchasePrice: "" });
      setShowAddForm(false);
    }
  };

  const removeHolding = (id) => {
    setHoldings(holdings.filter((h) => h.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FiBrain className="text-6xl text-purple-400 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">
            Loading Portfolio Intelligence...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <FiBrain className="text-purple-400" />
            GPT-5 Portfolio Manager
            <FiZap className="text-yellow-400" />
          </h1>
          <p className="text-purple-200">AI-Enhanced Portfolio Optimization</p>
        </div>

        {/* Portfolio Overview */}
        {portfolioMetrics && (
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <div className="text-center">
                <FiDollarSign className="text-3xl text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${portfolioMetrics.totalValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">Total Value</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <div className="text-center">
                <FiTrendingUp className="text-3xl text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${portfolioMetrics.totalInvested.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">Total Invested</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <div className="text-center">
                <div
                  className={`text-3xl mx-auto mb-2 ${
                    portfolioMetrics.totalPnL >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {portfolioMetrics.totalPnL >= 0 ? "📈" : "📉"}
                </div>
                <div
                  className={`text-2xl font-bold ${
                    portfolioMetrics.totalPnL >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ${portfolioMetrics.totalPnL.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">P&L</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <div className="text-center">
                <div className="text-3xl text-purple-400 mx-auto mb-2">📊</div>
                <div
                  className={`text-2xl font-bold ${
                    portfolioMetrics.totalPnLPercentage >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {portfolioMetrics.totalPnLPercentage.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-300">ROI</div>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FiBrain className="text-purple-400" />
              AI Recommendations
            </h2>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === "high"
                      ? "border-red-400 bg-red-900/20"
                      : rec.priority === "medium"
                      ? "border-yellow-400 bg-yellow-900/20"
                      : "border-green-400 bg-green-900/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white">{rec.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        rec.priority === "high"
                          ? "bg-red-500 text-white"
                          : rec.priority === "medium"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{rec.description}</p>
                  <p className="text-purple-200 font-medium text-sm">
                    💡 {rec.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Holdings Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Portfolio Holdings
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiPlus /> Add Holding
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <form
              onSubmit={addHolding}
              className="mb-6 p-4 bg-purple-900/30 rounded-lg"
            >
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Coin (e.g., bitcoin)"
                  value={newHolding.coin}
                  onChange={(e) =>
                    setNewHolding({ ...newHolding, coin: e.target.value })
                  }
                  className="px-3 py-2 bg-white/10 border border-purple-500/30 rounded text-white placeholder-gray-400"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Amount"
                  value={newHolding.amount}
                  onChange={(e) =>
                    setNewHolding({ ...newHolding, amount: e.target.value })
                  }
                  className="px-3 py-2 bg-white/10 border border-purple-500/30 rounded text-white placeholder-gray-400"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Purchase Price"
                  value={newHolding.purchasePrice}
                  onChange={(e) =>
                    setNewHolding({
                      ...newHolding,
                      purchasePrice: e.target.value,
                    })
                  }
                  className="px-3 py-2 bg-white/10 border border-purple-500/30 rounded text-white placeholder-gray-400"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Holdings List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="text-left text-gray-300 pb-3">Asset</th>
                  <th className="text-right text-gray-300 pb-3">Amount</th>
                  <th className="text-right text-gray-300 pb-3">
                    Current Price
                  </th>
                  <th className="text-right text-gray-300 pb-3">Value</th>
                  <th className="text-right text-gray-300 pb-3">P&L</th>
                  <th className="text-right text-gray-300 pb-3">Allocation</th>
                  <th className="text-right text-gray-300 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolioMetrics?.holdings.map((holding) => (
                  <tr
                    key={holding.id}
                    className="border-b border-purple-500/20"
                  >
                    <td className="py-4">
                      <div className="font-medium text-white capitalize">
                        {holding.coin.replace("-", " ")}
                      </div>
                    </td>
                    <td className="text-right text-gray-300 py-4">
                      {holding.amount.toLocaleString()}
                    </td>
                    <td className="text-right text-gray-300 py-4">
                      ${holding.currentPrice.toLocaleString()}
                    </td>
                    <td className="text-right font-medium text-white py-4">
                      ${holding.currentValue.toLocaleString()}
                    </td>
                    <td
                      className={`text-right font-medium py-4 ${
                        holding.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      ${holding.pnl.toLocaleString()} (
                      {holding.pnlPercentage.toFixed(2)}%)
                    </td>
                    <td className="text-right text-gray-300 py-4">
                      {holding.allocation.toFixed(1)}%
                    </td>
                    <td className="text-right py-4">
                      <button
                        onClick={() => removeHolding(holding.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPT5PortfolioManager;
