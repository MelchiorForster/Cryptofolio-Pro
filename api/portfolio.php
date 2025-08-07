<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Mock Portfolio-Daten
$mock_portfolio = [
    [
        'id' => 1,
        'name' => 'Bitcoin',
        'symbol' => 'BTC',
        'coingecko_id' => 'bitcoin',
        'amount' => 0.5432
    ],
    [
        'id' => 2,
        'name' => 'Ethereum',
        'symbol' => 'ETH',
        'coingecko_id' => 'ethereum',
        'amount' => 8.7643
    ],
    [
        'id' => 3,
        'name' => 'Cardano',
        'symbol' => 'ADA',
        'coingecko_id' => 'cardano',
        'amount' => 2543.21
    ]
];

echo json_encode(['success' => true, 'data' => $mock_portfolio]);
?>
?>
