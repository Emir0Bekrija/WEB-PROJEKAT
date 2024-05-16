<?php
Flight::route('GET /users', function(){
   Flight::json(Flight::user_service()->get_all_users());
});

Flight::route('GET /users/@id', function($id){
   Flight::json(Flight::user_service()->get_user($id));
});

Flight::route('POST /postUser', function(){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json([
      Flight::user_service()->add_user($data),
      Flight::user_service()->last_id()
   ]);
});

Flight::route('PUT /users/@id', function($id){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json(Flight::user_service()->update_user($id, $data));
});