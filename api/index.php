<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

class Database {
    private $host = 'localhost';
    private $db_name = 'cryptofolio_pro';
    private $username = 'root';
    private $password = '';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
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
    
    public function getMarketData($per_page = 20, $page = 1) {
        $url = $this->coingecko_base . '/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=' . $per_page . '&page=' . $page . '&sparkline=false&price_change_percentage=24h';
        
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
    
    public function getCoinHistory($coin_id, $days = 7) {
        $url = $this->coingecko_base . '/coins/' . $coin_id . '/market_chart?vs_currency=eur&days=' . $days;
        
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

class PortfolioManager {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function getUserPortfolio($user_id = 1) {
        $query = "SELECT h.*, c.name, c.symbol, c.coingecko_id 
                  FROM holdings h 
                  LEFT JOIN cryptocurrencies c ON h.crypto_id = c.id 
                  WHERE h.user_id = ? AND h.amount > 0";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function addHolding($user_id, $crypto_id, $amount, $purchase_price) {
        $query = "INSERT INTO holdings (user_id, crypto_id, amount, purchase_price, created_at) 
                  VALUES (?, ?, ?, ?, NOW())
                  ON DUPLICATE KEY UPDATE 
                  amount = amount + VALUES(amount),
                  purchase_price = ((amount * purchase_price) + (VALUES(amount) * VALUES(purchase_price))) / (amount + VALUES(amount)),
                  updated_at = NOW()";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$user_id, $crypto_id, $amount, $purchase_price]);
    }
    
    public function removeHolding($user_id, $crypto_id, $amount) {
        $query = "UPDATE holdings 
                  SET amount = GREATEST(0, amount - ?), updated_at = NOW() 
                  WHERE user_id = ? AND crypto_id = ?";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$amount, $user_id, $crypto_id]);
    }
}

// Router
$request_method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['path'] ?? parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/cryptoFolio Pro/api', '', $path);

// Debug output
if (!$path || $path === '/') {
    $path = $_GET['endpoint'] ?? '/test';
}

$database = new Database();
$db = $database->getConnection();
$crypto_api = new CryptoAPI();
$portfolio = new PortfolioManager($db);

try {
    switch ($path) {
        case '/test':
            echo json_encode(['status' => 'API working', 'method' => $request_method, 'path' => $path]);
            break;
            
        case '/prices':
            if ($request_method === 'GET') {
                $ids = $_GET['ids'] ?? 'bitcoin,ethereum,cardano,solana,avalanche-2,polkadot';
                $data = $crypto_api->getCryptoPrices($ids);
                echo json_encode($data ?: ['error' => 'Failed to fetch prices']);
            }
            break;
            
        case '/markets':
            if ($request_method === 'GET') {
                $per_page = $_GET['per_page'] ?? 20;
                $page = $_GET['page'] ?? 1;
                $data = $crypto_api->getMarketData($per_page, $page);
                echo json_encode($data ?: ['error' => 'Failed to fetch market data']);
            }
            break;
            
        case '/history':
            if ($request_method === 'GET') {
                $coin_id = $_GET['coin_id'] ?? 'bitcoin';
                $days = $_GET['days'] ?? 7;
                $data = $crypto_api->getCoinHistory($coin_id, $days);
                echo json_encode($data ?: ['error' => 'Failed to fetch history']);
            }
            break;
            
        case '/portfolio':
            if ($request_method === 'GET') {
                $user_id = $_GET['user_id'] ?? 1;
                $holdings = $portfolio->getUserPortfolio($user_id);
                echo json_encode(['success' => true, 'data' => $holdings]);
            } elseif ($request_method === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $success = $portfolio->addHolding(
                    $input['user_id'] ?? 1,
                    $input['crypto_id'],
                    $input['amount'],
                    $input['purchase_price']
                );
                echo json_encode(['success' => $success]);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
