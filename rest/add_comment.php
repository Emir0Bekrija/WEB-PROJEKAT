<?php

require_once __DIR__ . '/services/CommentsService.class.php';

$payload = $_REQUEST;

if($payload['comment'] == NULL || $payload['Name'] == ""){
    header('HTTP/1.1 00 Bad Request');
    die(json_encode(['error'=> 'Name field is missing']));
}

$blogService = new CommentsService();
$blogService->add_comment([]);