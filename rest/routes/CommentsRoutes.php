<?php


/**
 * @OA\Get(
 *     path="/comments/{id}",
 *    tags={"comments"},
 *     summary="Retrieve comments by blog ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the blog to retrieve comments for"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Comments successfully retrieved",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(
 *                     property="id",
 *                     type="integer",
 *                     description="Comment ID"
 *                 ),
 *                 @OA\Property(
 *                     property="content",
 *                     type="string",
 *                     description="Comment content"
 *                 ),
 *                 @OA\Property(
 *                     property="created_at",
 *                     type="string",
 *                     format="date-time",
 *                     description="Creation date of the comment"
 *                 ),
 *                 @OA\Property(
 *                     property="blog_id",
 *                     type="integer",
 *                     description="ID of the blog the comment belongs to"
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Comments not found"
 *     )
 * )
 */
Flight::route('GET /comments/@id', function($id){
    Flight::json(Flight::comments_service()->get_comments($id));
});


/**
 * @OA\Post(
 *     path="/comments",
 *    tags={"comments"},
 *     summary="Add a new comment",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="blogID",
 *                 type="integer",
 *                 description="ID of the blog the comment belongs to"
 *             ),
 *             @OA\Property(
 *                 property="userID",
 *                 type="integer",
 *                 description="ID of the user who made the comment"
 *             ),
 *             @OA\Property(
 *                 property="comment",
 *                 type="string",
 *                 description="The comment content"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Comment successfully added",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="ID of the added comment"
 *             ),
 *             @OA\Property(
 *                 property="blogID",
 *                 type="integer",
 *                 description="ID of the blog the comment belongs to"
 *             ),
 *             @OA\Property(
 *                 property="userID",
 *                 type="integer",
 *                 description="ID of the user who made the comment"
 *             ),
 *             @OA\Property(
 *                 property="comment",
 *                 type="string",
 *                 description="The comment content"
 *             ),
 *             @OA\Property(
 *                 property="created_at",
 *                 type="string",
 *                 format="date-time",
 *                 description="Creation date of the comment"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     )
 * )
 */
Flight::route('POST /comments', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::json(Flight::comments_service()->add_comment($data));
});

