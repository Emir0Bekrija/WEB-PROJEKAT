<?php

Flight::route('GET /ingredients', function(){
    Flight::json(Flight::ingredients_service()->get_ingredients());
});

Flight::route('GET /ingredients/@id', function($id){
    Flight::json(Flight::ingredients_service()->get_ingredient($id));
});

Flight::route('POST /postIngredient', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::json(Flight::ingredients_service()->add_ingredient($data));
});

Flight::route('PUT /ingredients/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::json(Flight::ingredients_service()->update_ingredient($id, $data));
});

Flight::route('DELETE /ingredients/@id', function($id){
    Flight::json(Flight::ingredients_service()->delete_ingredient($id));
});

