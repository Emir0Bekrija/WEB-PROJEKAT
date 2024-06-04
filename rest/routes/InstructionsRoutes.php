<?php

Flight::route('GET /instructions', function(){
    Flight::json(Flight::instructions_service()->get_instructions());
});


/**
 * @OA\Get(
 *     path="/instructions/{id}",
 *    tags={"instructions"},
 *     summary="Retrieve an instruction by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the instruction to retrieve"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Instruction successfully retrieved",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="Instruction ID"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 description="Instruction description"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Instruction not found"
 *     )
 * )
 */
Flight::route('GET /instructions/@id', function($id){
    Flight::json(Flight::instructions_service()->get_instruction($id));
});

/**
 * @OA\Post(
 *     path="/postInstruction",
 *    tags={"instructions"},
 *     summary="Add a new instruction",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="blogID",
 *                 type="integer",
 *                 description="ID of the blog associated with the instruction"
 *             ),
 *             @OA\Property(
 *                 property="instruction",
 *                 type="string",
 *                 description="Instruction content"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Instruction successfully added",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 description="ID of the added instruction"
 *             ),
 *             @OA\Property(
 *                 property="blogID",
 *                 type="integer",
 *                 description="ID of the blog associated with the instruction"
 *             ),
 *             @OA\Property(
 *                 property="instruction",
 *                 type="string",
 *                 description="Instruction content"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     )
 * )
 */
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

/**
 * @OA\Delete(
 *     path="/instructions/{id}",
 *   tags={"instructions"},
 *     summary="Delete an instruction by its ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="integer"
 *         ),
 *         description="The ID of the instruction to delete"
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Instruction successfully deleted"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Instruction not found"
 *     )
 * )
 */
Flight::route('DELETE /instructions/@id', function($id){
    Flight::json(Flight::instructions_service()->delete_instruction($id));
});