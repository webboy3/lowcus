<?php
// Example: read environment variables
$env = getenv('APP_ENV');
$debug = getenv('APP_DEBUG') === 'true';

// Example response
header('Content-Type: application/json');
echo json_encode([
    'message' => 'Hello from PHP on Vercel!',
    'environment' => $env,
    'debugMode' => $debug,
    'url' => getenv('APP_URL')
]);
