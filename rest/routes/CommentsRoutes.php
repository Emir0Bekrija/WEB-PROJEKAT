<?php


Flight::route('GET /comments/@id', function($id){
    Flight::json(Flight::comments_service()->get_comments($id));
});

Flight::route('POST /comments', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::json(Flight::comments_service()->add_comment($data));
});

