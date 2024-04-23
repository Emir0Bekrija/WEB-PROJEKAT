<?php
require_once __DIR__ . '/services/BlogService.class.php';

$blog_service = new BlogService();

$blogs = $blog_service->get_blogs();

header('Content-Type: application/json');

echo json_encode($blogs, JSON_PRETTY_PRINT);