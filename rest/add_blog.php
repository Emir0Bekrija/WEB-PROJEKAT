<?php

require_once __DIR__ . '/services/BlogService.class.php';

$payload = $_REQUEST;

if($payload['Name'] == NULL || $payload['Name'] == ""){
    header('HTTP/1.1 00 Bad Request');
    die(json_encode(['error'=> 'Name field is missing']));
}

$blogService = new BlogService();
$blogService->add_blog([]);