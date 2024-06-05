<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * @OA\Get(
 *     path="/users",
 *   tags={"users"},
 *     summary="Retrieve all users",
 *     @OA\Response(
 *         response=200,
 *         description="List of users retrieved successfully",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(
 *                     property="id",
 *                     type="integer",
 *                     description="ID of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="Name",
 *                     type="string",
 *                     description="Name of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="Surname",
 *                     type="string",
 *                     description="Surname of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="email",
 *                     type="string",
 *                     description="Email of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="username",
 *                     type="string",
 *                     description="Username of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="password",
 *                     type="string",
 *                     description="Password of the user"
 *                 ),
 *                 @OA\Property(
 *                     property="bio",
 *                     type="string",
 *                     description="Bio of the user"
 *                 )
 *             )
 *         )
 *     )
 * )
 */
Flight::route('GET /users', function(){
   Flight::json(Flight::user_service()->get_all_users());
});


/**
 * @OA\Get(
 *     path="/users/{id}",
 *   tags={"users"},
 *     summary="Retrieve a user by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the user to retrieve"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User successfully retrieved",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="User ID"
 *             ),
 *             @OA\Property(
 *                 property="username",
 *                 type="string",
 *                 description="Username of the user"
 *             ),
 *             @OA\Property(
 *                 property="email",
 *                 type="string",
 *                 description="Email of the user"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="User not found"
 *     )
 * )
 */
Flight::route('GET /users/@id', function($id){
   Flight::json(Flight::user_service()->get_user($id));
});


/**
 * @OA\Post(
 *     path="/register",
 *  tags={"users"},
 *     summary="Add a new user",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="Name",
 *                 type="string",
 *                 description="Name of the user"
 *             ),
 *             @OA\Property(
 *                 property="Surname",
 *                 type="string",
 *                 description="Surname of the user"
 *             ),
 *             @OA\Property(
 *                 property="email",
 *                 type="string",
 *                 description="Email of the user"
 *             ),
 *             @OA\Property(
 *                 property="password",
 *                 type="string",
 *                 description="Password of the user"
 *             ),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User successfully added",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="ID of the added user"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     )
 * )
 */
Flight::route('POST /register', function(){
   $request = Flight::request();
   $data = $request->data->getData();

   if($data['Name'] == NULL || $data['Name'] == ''){
      Flight::halt(500, "First name is required");
   }

   if($data['Surname'] == NULL || $data['Surname'] == ''){
      Flight::halt(500, "Last name is required");
   }

   if($data['email'] == NULL || $data['email'] == ''){
      Flight::halt(500, "Email is required");
   }

   if($data['password'] == NULL || $data['password'] == ''){
      Flight::halt(500, "Password is required");
   }

   Flight::json([
      Flight::user_service()->add_user($data),
   ]);
});


/**
 * @OA\Put(
 *     path="/users/{id}",
 *  tags={"users"},
 *     summary="Update a user by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the user to update"
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="Name",
 *                 type="string",
 *                 description="Name of the user"
 *             ),
 *             @OA\Property(
 *                 property="Surname",
 *                 type="string",
 *                 description="Surname of the user"
 *             ),
 *             @OA\Property(
 *                 property="username",
 *                 type="string",
 *                 description="Username of the user"
 *             ),
 *             @OA\Property(
 *                 property="bio",
 *                 type="string",
 *                 description="Bio of the user"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User successfully updated"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="User not found"
 *     )
 * )
 */
Flight::route('PUT /users/@id', function($id){
   $request = Flight::request();
   $data = $request->data->getData();
   Flight::json(Flight::user_service()->update_user($id, $data));
});