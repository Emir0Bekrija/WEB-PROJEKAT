<?php

require __DIR__ . '/../../../../vendor/autoload.php';

if ($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1') {
    define('BASE_URL', 'http://localhost/WEB-PROJEKAT/rest');
} else {
    define('BASE_URL', 'https://walrus-app-dere7.ondigitalocean.app/dentist-backend/');
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
//error_reporting(0);

$openapi = \OpenApi\Generator::scan(['../../../routes', './'], ['pattern' => '*.php']);

header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>



