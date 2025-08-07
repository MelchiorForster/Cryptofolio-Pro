import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost/cryptoFolio%20Pro/api";

// Custom hook für Crypto-Preise
export const useCryptoPrices = (
  cryptoIds = "bitcoin,ethereum,cardano,solana,avalanche-2,polkadot"
) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE}/test_prices.php?ids=${cryptoIds}`
        );
        setPrices(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch crypto prices");
        console.error("Price fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    // Update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, [cryptoIds]);

  return { prices, loading, error };
};

// Custom hook für Marktdaten
export const useMarketData = (perPage = 20, page = 1) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE}/markets?per_page=${perPage}&page=${page}`
        );
        setMarketData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch market data");
        console.error("Market data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [perPage, page]);

  return { marketData, loading, error };
};

// Custom hook für Portfolio
export const usePortfolio = (userId = 1) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE}/portfolio.php?user_id=${userId}`
      );
      setPortfolio(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch portfolio");
      console.error("Portfolio fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addHolding = async (cryptoId, amount, purchasePrice) => {
    try {
      const response = await axios.post(`${API_BASE}/portfolio.php`, {
        user_id: userId,
        crypto_id: cryptoId,
        amount: amount,
        purchase_price: purchasePrice,
      });

      if (response.data.success) {
        await fetchPortfolio(); // Refresh portfolio
        return true;
      }
      return false;
    } catch (err) {
      console.error("Add holding error:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [userId]);

  return {
    portfolio,
    loading,
    error,
    refreshPortfolio: fetchPortfolio,
    addHolding,
  };
};

// Custom hook für Preis-Historie
export const usePriceHistory = (coinId, days = 7) => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE}/history?coin_id=${coinId}&days=${days}`
        );
        setHistory(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch price history");
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchHistory();
    }
  }, [coinId, days]);

  return { history, loading, error };
};

// Utility function für Preis-Formatierung
export const formatPrice = (price, currency = "EUR") => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
};

// Utility function für Prozent-Formatierung
export const formatPercentage = (percentage) => {
  const formatted = Number(percentage).toFixed(2);
  return `${percentage >= 0 ? "+" : ""}${formatted}%`;
};

// Utility function für Portfolio-Wert-Berechnung
export const calculatePortfolioValue = (portfolio, prices) => {
  if (!portfolio || !prices) return 0;

  return portfolio.reduce((total, holding) => {
    const coinPrice = prices[holding.coingecko_id]?.eur || 0;
    return total + holding.amount * coinPrice;
  }, 0);
};
