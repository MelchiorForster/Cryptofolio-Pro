import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Bitcoin,
} from "lucide-react";
import {
  useCryptoPrices,
  usePortfolio,
  calculatePortfolioValue,
  formatPrice,
  formatPercentage,
} from "../hooks/useCrypto";

const Dashboard = () => {
  const { prices, loading: pricesLoading } = useCryptoPrices();
  const { portfolio, loading: portfolioLoading } = usePortfolio();

  // Berechne Portfolio-Werte
  const portfolioValue = calculatePortfolioValue(portfolio, prices);
  const totalChange =
    Object.values(prices).reduce(
      (sum, coin) => sum + (coin.eur_24h_change || 0),
      0
    ) / Object.keys(prices).length;

  // Top Gainers aus aktuellen Preisen
  const topGainers = Object.entries(prices)
    .filter(([_, coin]) => coin.eur_24h_change > 0)
    .sort((a, b) => b[1].eur_24h_change - a[1].eur_24h_change)
    .slice(0, 3)
    .map(([id, coin]) => ({
      symbol: id.toUpperCase().substring(0, 3),
      name: id.charAt(0).toUpperCase() + id.slice(1),
      price: coin.eur,
      change: coin.eur_24h_change,
    }));

  if (pricesLoading || portfolioLoading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-crypto-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Letztes Update: {new Date().toLocaleString("de-DE")}
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Gesamtwert Portfolio</p>
              <p className="text-2xl font-bold text-white">
                {formatPrice(portfolioValue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-crypto-accent/20 rounded-lg flex items-center justify-center">
              <Wallet className="text-crypto-accent" size={24} />
            </div>
          </div>
          <div
            className={`flex items-center mt-4 ${
              totalChange >= 0 ? "text-crypto-green" : "text-crypto-red"
            }`}
          >
            {totalChange >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="ml-1 text-sm">
              {formatPercentage(totalChange)} (24h)
            </span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Anzahl Assets</p>
              <p className="text-2xl font-bold text-white">
                {portfolio.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Bitcoin className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bester Performer</p>
              <p className="text-2xl font-bold text-white">
                {topGainers[0]?.symbol || "N/A"}
              </p>
            </div>
            <div className="w-12 h-12 bg-crypto-green/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-crypto-green" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-crypto-green">
            <TrendingUp size={16} />
            <span className="ml-1 text-sm">
              {topGainers[0] ? formatPercentage(topGainers[0].change) : "+0%"}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio Holdings */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-6">Meine Holdings</h2>
        <div className="space-y-4">
          {portfolio.map((holding) => {
            const coinPrice = prices[holding.coingecko_id]?.eur || 0;
            const holdingValue = holding.amount * coinPrice;
            const priceChange =
              prices[holding.coingecko_id]?.eur_24h_change || 0;

            return (
              <div
                key={holding.id}
                className="flex items-center justify-between p-4 bg-crypto-dark rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-crypto-accent rounded-full flex items-center justify-center">
                    <span className="text-crypto-dark font-bold text-sm">
                      {holding.symbol}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{holding.name}</p>
                    <p className="text-gray-400 text-sm">
                      {Number(holding.amount).toFixed(4)} {holding.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">
                    {formatPrice(holdingValue)}
                  </p>
                  <p
                    className={`text-sm ${
                      priceChange >= 0 ? "text-crypto-green" : "text-crypto-red"
                    }`}
                  >
                    {formatPercentage(priceChange)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Gainers */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-6">Top Gainers (24h)</h2>
        <div className="space-y-4">
          {topGainers.map((coin) => (
            <div
              key={coin.symbol}
              className="flex items-center justify-between p-4 bg-crypto-dark rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-crypto-green/20 rounded-full flex items-center justify-center">
                  <span className="text-crypto-green font-bold text-sm">
                    {coin.symbol}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{coin.name}</p>
                  <p className="text-gray-400 text-sm">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {formatPrice(coin.price)}
                </p>
                <p className="text-crypto-green text-sm">
                  {formatPercentage(coin.change)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
