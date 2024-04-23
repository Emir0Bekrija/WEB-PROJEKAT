<?php
require_once __DIR__ . '/services/BlogService.class.php';

$blog_service = new BlogService();

$blog = $blog_service->get_blog($_GET['id']);

header('Content-Type: application/json');

echo json_encode($blog, JSON_PRETTY_PRINT);