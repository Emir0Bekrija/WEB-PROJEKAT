<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


Flight::group('/auth', function () {
    /**
     * @OA\Post(
     *     path="/auth/login",
     *     tags={"auth"},
     *     summary="Login to system using email and password",
     *     @OA\Response(
     *         response=200,
     *         description="User data and JWT",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="id",
     *                 type="integer",
     *                 description="ID of the added user"
     *             )
     *         )
     *     ),
     *     @OA\RequestBody(
     *     description="Login credentials",
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(
 *                      property="email",
 *                      type="string",
 *                      example="someemail@example.com",
 *                      description="Email of the user"
 *                 ),
 *                 @OA\Property(
     *                property="password",
     *                type="string",
     *                example="somepassword",
     *                description="Password of the user"
     *            )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input"
     *     )
     * )
     */
    Flight::route('POST /login', function(){
        $request = Flight::request();
        $data = $request->data->getData();
        $email = $data['email'];

        $user = Flight::auth_service()->get_user_by_email($email);

        if(!$user || !password_verify($data['password'], $user['password'])){
            Flight::halt(403, "Invalid username or password");
        }

        unset($user['password']);

        $jwt_payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => Time() + (60*60*24) // valid for one day
        ];

        $token = JWT::encode(
            $jwt_payload,
            JWT_SECRET,
            'HS256'
        );


        Flight::json(array_merge($user, ['token' => $token]));

    });




    /**
     * @OA\Post(
     *     path="/auth/logout",
     *     tags={"auth"},
     *     summary="Logout from the system",
     *     security={
     *         {"ApiKey": {}}
     *     },
     *     @OA\Response(
     *         response=200,
     *         description="User logged out successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="id",
     *                 type="integer",
     *                 description="ID of the added user"
     *             )
     *         )
     *     ),
     * )
     */
    Flight::route('POST /logout', function(){

        try{
            $token = Flight::request()->getHeader('Authentication');
            if(!$token){
                Flight::halt(401, 'Missing authentication header');
            }

            $decoded_token = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));

            Flight::json([
                "jwt_decoded" => $decoded_token,
                'user' => $decoded_token->user
            ]);
            
        }
        catch(Exception $e){
            Flight::halt(401, $e->getMessage());
        }
    });




});