<?php

use OpenApi\Annotations as OA;

/**
 * @OA\Get(
 *     path="/blogs",
 *     tags={"blogs"},
 *     summary="Retrieve a list of blogs",
 *     @OA\Response(
 *         response=200,
 *         description="A list of blogs",  
 *     ),
 * )
 */

Flight::route('GET /blogs', function(){
   Flight::json(Flight::blog_service()->get_blogs());
});

/**
 * @OA\Get(
 *     path="/blogs/{id}",
 *     tags={"blogs"},
 *     summary="Retrieve a blog by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the blog"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Blog details",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="Blog ID"
 *             ),
 *             @OA\Property(
 *                 property="title",
 *                 type="string",
 *                 description="Blog title"
 *             ),
 *             @OA\Property(
 *                 property="content",
 *                 type="string",
 *                 description="Blog content"
 *             ),
 *             @OA\Property(
 *                 property="author",
 *                 type="string",
 *                 description="Blog author"
 *             ),
 *             @OA\Property(
 *                 property="created_at",
 *                 type="string",
 *                 format="date-time",
 *                 description="Creation date of the blog"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Blog not found"
 *     )
 * )
 */
Flight::route('GET /blogs/@id', function($id){
   Flight::json(Flight::blog_service()->get_blog_by_id($id));
});


/**
 * @OA\Get(
 *     path="/blogs_by_user/{id}",
 *     tags={"blogs"},
 *     summary="Retrieve a list of blogs by user ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the user"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="A list of blogs by the user",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(
 *                     property="id",
 *                     type="integer",
 *                     description="Blog ID"
 *                 ),
 *                 @OA\Property(
 *                     property="title",
 *                     type="string",
 *                     description="Blog title"
 *                 ),
 *                 @OA\Property(
 *                     property="content",
 *                     type="string",
 *                     description="Blog content"
 *                 ),
 *                 @OA\Property(
 *                     property="author",
 *                     type="string",
 *                     description="Blog author"
 *                 ),
 *                 @OA\Property(
 *                     property="created_at",
 *                     type="string",
 *                     format="date-time",
 *                     description="Creation date of the blog"
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="No blogs found for the user"
 *     )
 * )
 */
Flight::route('GET /blogs_by_user/@id', function($id){
   Flight::json(Flight::blog_service()->get_blogs_by_user_id($id));
});




/**
 * @OA\Post(
 *     path="/postBlog",
 *     tags={"blogs"},
 *     summary="Add a new blog",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="UserId",
 *                 type="integer",
 *                 description="ID of the user"
 *             ),
 *             @OA\Property(
 *                 property="Name",
 *                 type="string",
 *                 maxLength=45,
 *                 description="Name of the blog"
 *             ),
 *             @OA\Property(
 *                 property="Summary",
 *                 type="string",
 *                 description="Summary of the blog"
 *             ),
 *             @OA\Property(
 *                 property="Macros",
 *                 type="string",
 *                 description="Macros of the blog"
 *             ),
 *             @OA\Property(
 *                 property="Image",
 *                 type="string",
 *                 format="binary",
 *                 description="Image associated with the blog"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Blog successfully added",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="blog_id",
 *                 type="integer",
 *                 description="ID of the newly created blog"
 *             ),
 *             @OA\Property(
 *                 property="last_id",
 *                 type="integer",
 *                 description="ID of the last inserted blog"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     )
 * )
 */
Flight::route('POST /postBlog', function(){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json([
      Flight::blog_service()->add_blog($data),
      Flight::blog_service()->last_id()
   ]);
});


/**
 * @OA\Put(
 *     path="/blogs/{id}",
 *     tags={"blogs"},
 *     summary="Update a blog by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the blog to be updated"
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="UserId",
 *                 type="integer",
 *                 description="ID of the user"
 *             ),
 *             @OA\Property(
 *                 property="Name",
 *                 type="string",
 *                 maxLength=45,
 *                 description="Name of the blog"
 *             ),
 *             @OA\Property(
 *                 property="Summary",
 *                 type="string",
 *                 description="Summary of the blog"
 *             ),
 *             @OA\Property(
 *                 property="Macros",
 *                 type="string",
 *                 description="Macros of the blog"
 *             ),
 *             @OA\Property(
 *                 property="Image",
 *                 type="string",
 *                 format="binary",
 *                 description="Image associated with the blog"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Blog successfully updated",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="boolean",
 *                 description="Whether the update was successful"
 *             ),
 *             @OA\Property(
 *                 property="blog",
 *                 type="object",
 *                 description="The updated blog details",
 *                 @OA\Property(
 *                     property="id",
 *                     type="integer",
 *                     description="Blog ID"
 *                 ),
 *                 @OA\Property(
 *                     property="UserId",
 *                     type="integer",
 *                     description="ID of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="Name",
 *                     type="string",
 *                     description="Name of the blog"
 *                 ),
 *                 @OA\Property(
 *                     property="Summary",
 *                     type="string",
 *                     description="Summary of the blog"
 *                 ),
 *                 @OA\Property(
 *                     property="Macros",
 *                     type="string",
 *                     description="Macros of the blog"
 *                 ),
 *                 @OA\Property(
 *                     property="Image",
 *                     type="string",
 *                     format="binary",
 *                     description="Image associated with the blog"
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Blog not found"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     )
 * )
 */
Flight::route('PUT /blogs/@id', function($id){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json(Flight::blog_service()->update_blog($id, $data));
});

Flight::route('GET /blogs/user/@user_id', function($user_id){
   Flight::json(Flight::blog_service()->get_blogs_by_user_id($user_id));
});

