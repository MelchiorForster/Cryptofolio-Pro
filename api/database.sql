-- CryptoFolio Pro Database Schema
-- Erstellt für XAMPP/MySQL

CREATE DATABASE IF NOT EXISTS cryptofolio_pro;
USE cryptofolio_pro;

-- Benutzer Tabelle
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Kryptowährungen Referenz-Tabelle
CREATE TABLE IF NOT EXISTS cryptocurrencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    coingecko_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Holdings
CREATE TABLE IF NOT EXISTS holdings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    amount DECIMAL(20, 8) NOT NULL DEFAULT 0,
    purchase_price DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrencies(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_crypto (user_id, crypto_id)
);

-- Preis Alerts
CREATE TABLE IF NOT EXISTS price_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    target_price DECIMAL(15, 2) NOT NULL,
    alert_type ENUM('above', 'below') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    triggered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrencies(id) ON DELETE CASCADE
);

-- Transaktionen Historie
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    transaction_type ENUM('buy', 'sell') NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    total_value DECIMAL(15, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrencies(id) ON DELETE CASCADE
);

-- Initiale Kryptowährungen einfügen
INSERT IGNORE INTO cryptocurrencies (name, symbol, coingecko_id) VALUES
('Bitcoin', 'BTC', 'bitcoin'),
('Ethereum', 'ETH', 'ethereum'),
('Cardano', 'ADA', 'cardano'),
('Solana', 'SOL', 'solana'),
('Avalanche', 'AVAX', 'avalanche-2'),
('Polkadot', 'DOT', 'polkadot'),
('Chainlink', 'LINK', 'chainlink'),
('Polygon', 'MATIC', 'matic-network'),
('Litecoin', 'LTC', 'litecoin'),
('Binance Coin', 'BNB', 'binancecoin');

-- Demo User erstellen
INSERT IGNORE INTO users (username, email, password_hash) VALUES
('demo_user', 'demo@cryptofolio.pro', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Demo Portfolio für User ID 1
INSERT IGNORE INTO holdings (user_id, crypto_id, amount, purchase_price) VALUES
(1, 1, 0.5432, 42500.00),  -- Bitcoin
(1, 2, 8.7643, 1850.00),   -- Ethereum
(1, 3, 2543.21, 0.45);     -- Cardano

-- Demo Alerts
INSERT IGNORE INTO price_alerts (user_id, crypto_id, target_price, alert_type) VALUES
(1, 1, 50000.00, 'above'),  -- BTC Alert
(1, 2, 2000.00, 'above');   -- ETH Alert

-- Indexe für bessere Performance
CREATE INDEX idx_holdings_user_id ON holdings(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX idx_price_alerts_active ON price_alerts(is_active);
