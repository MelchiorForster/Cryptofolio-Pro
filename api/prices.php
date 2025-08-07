<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

class CryptoAPI {
    private $coingecko_base = 'https://api.coingecko.com/api/v3';
    
    public function getCryptoPrices($ids = 'bitcoin,ethereum,cardano,solana,avalanche-2,polkadot') {
        $url = $this->coingecko_base . '/simple/price?ids=' . $ids . '&vs_currencies=eur&include_24hr_change=true&include_market_cap=true';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'CryptoFolio Pro/1.0');
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        }
        
        return false;
    }
}

$crypto_api = new CryptoAPI();

// Test prices endpoint
$ids = $_GET['ids'] ?? 'bitcoin,ethereum,cardano,solana,avalanche-2,polkadot';
$data = $crypto_api->getCryptoPrices($ids);

echo json_encode($data ?: ['error' => 'Failed to fetch prices']);
?>
