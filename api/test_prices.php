<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Mock-Daten für Testing
$mock_data = [
    'bitcoin' => [
        'eur' => 99897.0,
        'eur_24h_change' => 2.45
    ],
    'ethereum' => [
        'eur' => 3456.78,
        'eur_24h_change' => -1.23
    ],
    'cardano' => [
        'eur' => 0.89,
        'eur_24h_change' => 5.67
    ],
    'solana' => [
        'eur' => 234.56,
        'eur_24h_change' => 8.91
    ]
];

echo json_encode($mock_data);
?>
