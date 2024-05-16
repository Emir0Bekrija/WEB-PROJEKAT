<?php
require_once __DIR__ . '/BaseDao.class.php';

class InstructionsDao extends BaseDao{

    public function __construct(){
        parent::__construct("instructions");
    }

    public function get_instructions(){
        return $this->query("SELECT * FROM instructions", []);
    }

    public function get_instruction($id){
        return $this->query("SELECT instruction FROM instructions WHERE blogID = :blogID", ["blogID" => $id]);
    }

    public function add_instruction($instruction){
        $this->insert("instructions", $instruction);
        return $instruction;
    }

    public function update_instruction($id, $instruction){
        $this->update("instructions", $id, $instruction);
    }

    public function delete_instruction($id){
        $this->execute("DELETE FROM instructions WHERE id = :id", ["id" => $id]);
    }
}