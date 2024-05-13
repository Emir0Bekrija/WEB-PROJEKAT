<?php

Flight::route('GET /instructions', function(){
    Flight::json(Flight::instructions_service()->get_instructions());
});

Flight::route('GET /instructions/@id', function($id){
    Flight::json(Flight::instructions_service()->get_instruction($id));
});

Flight::route('POST /postInstruction', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::json(Flight::instructions_service()->add_instruction($data));
});

Flight::route('PUT /instructions/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::json(Flight::instructions_service()->update_instruction($id, $data));
});

Flight::route('DELETE /instructions/@id', function($id){
    Flight::json(Flight::instructions_service()->delete_instruction($id));
});