<?php
require_once 'index.php';

// Database setup script
try {
    // Create database connection (without specifying database first)
    $pdo = new PDO("mysql:host=localhost", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Read and execute SQL file
    $sql = file_get_contents(__DIR__ . '/database.sql');
    
    // Split SQL into individual statements
    $statements = array_filter(
        array_map('trim', explode(';', $sql)),
        function($stmt) { return !empty($stmt); }
    );
    
    echo "Setting up CryptoFolio Pro database...\n";
    
    foreach ($statements as $statement) {
        if (!empty(trim($statement))) {
            $pdo->exec($statement);
            echo "✓ Executed: " . substr(trim($statement), 0, 50) . "...\n";
        }
    }
    
    echo "\n✅ Database setup completed successfully!\n";
    echo "🚀 CryptoFolio Pro backend is ready!\n\n";
    
    // Test API endpoints
    echo "Testing API endpoints...\n";
    
    $crypto_api = new CryptoAPI();
    
    // Test prices
    echo "📊 Testing price data...\n";
    $prices = $crypto_api->getCryptoPrices('bitcoin,ethereum');
    if ($prices) {
        echo "✓ Price API working - BTC: €" . number_format($prices['bitcoin']['eur'], 2) . "\n";
    } else {
        echo "⚠️ Price API not responding (check internet connection)\n";
    }
    
    // Test database connection
    $db = new Database();
    $conn = $db->getConnection();
    if ($conn) {
        $portfolio = new PortfolioManager($conn);
        $holdings = $portfolio->getUserPortfolio(1);
        echo "✓ Database connection working - " . count($holdings) . " holdings found\n";
    }
    
    echo "\n🎉 Setup complete! Backend running on:\n";
    echo "📍 http://localhost/cryptoFolio%20Pro/api/\n";
    echo "\nAvailable endpoints:\n";
    echo "- /prices - Current crypto prices\n";
    echo "- /markets - Market data\n";
    echo "- /portfolio - User portfolio\n";
    echo "- /history - Price history\n";
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
    echo "Make sure XAMPP MySQL is running!\n";
} catch (Exception $e) {
    echo "❌ Setup error: " . $e->getMessage() . "\n";
}
?>
