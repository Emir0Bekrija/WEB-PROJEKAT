<?php

Flight::route('GET /ingredients', function(){
    Flight::json(Flight::ingredients_service()->get_ingredients());
});


/**
 * @OA\Get(
 *     path="/ingredients/{id}",
 *     tags={"ingredients"},
 *     summary="Retrieve an ingredient by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the ingredient to retrieve"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Ingredient successfully retrieved",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="Ingredient ID"
 *             ),
 *             @OA\Property(
 *                 property="name",
 *                 type="string",
 *                 description="Ingredient name"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 description="Ingredient description"
 *             ),
 *             @OA\Property(
 *                 property="quantity",
 *                 type="integer",
 *                 description="Ingredient quantity"
 *             ),
 *             @OA\Property(
 *                 property="unit",
 *                 type="string",
 *                 description="Ingredient unit"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Ingredient not found"
 *     )
 * )
 */
Flight::route('GET /ingredients/@id', function($id){
    Flight::json(Flight::ingredients_service()->get_ingredient($id));
});


/**
 * @OA\Post(
 *     path="/postIngredient",
 *     tags={"ingredients"},
 *     summary="Add a new ingredient",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="blogID",
 *                 type="integer",
 *                 description="ID of the blog associated with the ingredient"
 *             ),
 *             @OA\Property(
 *                 property="ingredient",
 *                 type="string",
 *                 description="Name of the ingredient"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Ingredient successfully added",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="ID of the added ingredient"
 *             ),
 *             @OA\Property(
 *                 property="blogID",
 *                 type="integer",
 *                 description="ID of the blog associated with the ingredient"
 *             ),
 *             @OA\Property(
 *                 property="ingredient",
 *                 type="string",
 *                 description="Name of the ingredient"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     )
 * )
 */
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

/**
 * @OA\Delete(
 *     path="/ingredients/{id}",
 *    tags={"ingredients"},
 *     summary="Delete an ingredient by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the ingredient to delete"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Ingredient successfully deleted"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Ingredient not found"
 *     )
 * )
 */
Flight::route('DELETE /ingredients/@id', function($id){
    Flight::json(Flight::ingredients_service()->delete_ingredient($id));
});

