<?php

Flight::route('GET /blogs', function(){
   Flight::json(Flight::blog_service()->get_blogs());
});

Flight::route('GET /blogs/@id', function($id){
   Flight::json(Flight::blog_service()->get_blog_by_id($id));
});

Flight::route('GET /blogs_by_user/@id', function($id){
   Flight::json(Flight::blog_service()->get_blogs_by_user_id($id));
});

Flight::route('POST /postBlog', function(){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json([
      Flight::blog_service()->add_blog($data),
      Flight::blog_service()->last_id()
   ]);
});



Flight::route('PUT /blogs/@id', function($id){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json(Flight::blog_service()->update_blog($id, $data));
});

Flight::route('DELETE /blogs/@id', function($id){
   Flight::json(Flight::blog_service()->delete_blog($id));
});

Flight::route('GET /blogs/user/@user_id', function($user_id){
   Flight::json(Flight::blog_service()->get_blogs_by_user_id($user_id));
});

