<?php

/**
 * Lightweight Standalone Development API Server for AURA LUXE
 * Run locally via: php -S localhost:8000 backend/serve_api.php
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Sample product dataset matching frontend
$products = [
    [
        'id' => 1,
        'name' => 'Aura Studio Wireless ANC Headphones',
        'slug' => 'aura-studio-wireless-anc-headphones',
        'sku' => 'AUR-HD-001',
        'category' => 'audio',
        'price' => 289.00,
        'stock_quantity' => 18,
        'rating' => 4.9,
    ],
    [
        'id' => 2,
        'name' => 'CyberWatch Ultra 49mm Titanium',
        'slug' => 'cyberwatch-ultra-49mm-titanium',
        'sku' => 'CW-ULTRA-49',
        'category' => 'electronics',
        'price' => 649.00,
        'stock_quantity' => 7,
        'rating' => 4.8,
    ],
    [
        'id' => 3,
        'name' => 'Nova Minimalist Mechanical Keyboard',
        'slug' => 'nova-minimalist-mechanical-keyboard',
        'sku' => 'NOVA-KB-75',
        'category' => 'workspace',
        'price' => 169.00,
        'stock_quantity' => 24,
        'rating' => 4.9,
    ]
];

if (str_starts_with($uri, '/api/v1/products')) {
    echo json_encode([
        'data' => $products,
        'meta' => [
            'total' => count($products),
            'timestamp' => date('c'),
        ]
    ]);
    exit;
}

if ($uri === '/api/v1/orders' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    echo json_encode([
        'success' => true,
        'order_number' => 'ORD-' . strtoupper(substr(md5(uniqid()), 0, 8)),
        'status' => 'pending',
        'message' => 'Order created with inventory row-level reservation lock.'
    ]);
    exit;
}

echo json_encode(['status' => 'online', 'service' => 'Aura Luxe Laravel Mock Gateway']);
