<?php
    require '../vendor/autoload.php';

    require "dao/BlogDao.class.php";
    require "dao/CommentsDao.class.php";
    require "dao/UserDao.class.php";
    require "dao/InstructionsDao.class.php";
    require "dao/IngredientsDao.class.php";

    require_once __DIR__ . '/services/UserService.class.php';
    require_once __DIR__ . '/services/BlogService.class.php';
    require_once __DIR__ . '/services/CommentsService.class.php';
    require_once __DIR__ . '/services/IngredientsService.class.php';
    require_once __DIR__ . '/services/InstructionsService.class.php';


    Flight::register('user_service', "UserService");
    Flight::register('blog_service', "BlogService");
    Flight::register('comments_service', "CommentsService");
    Flight::register('ingredients_service', "IngrediendsService");
    Flight::register('instructions_service', "InstructionsService");


    require_once __DIR__ . '/routes/UserRoutes.php';
    require_once __DIR__ . '/routes/BlogRoutes.php';
    require_once __DIR__ . '/routes/CommentsRoutes.php';
    require_once __DIR__ . '/routes/IngredientsRoutes.php';
    require_once __DIR__ . '/routes/InstructionsRoutes.php';


    Flight::start();
?>