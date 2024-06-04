<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

// Database configuration
define('DB_NAME', 'web-projekat');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', '127.0.0.1');

// JWT configuration
define('JWT_SECRET', 'BH=i%C+drvi:@FXz4]bNNL*/DZJb,8');
