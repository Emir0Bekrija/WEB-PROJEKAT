<?php

require_once __DIR__ . '/../dao/InstructionsDao.class.php';

class InstructionsService{
    private $dao;
    public function __construct(){
        $this->dao = new InstructionsDao();
    }

    public function get_instructions(){
        return $this->dao->get_instructions();
    }

    public function get_instruction($id){
        return $this->dao->get_instruction($id);
    }

    public function add_instruction($instruction){
        return $this->dao->add_instruction($instruction);
    }

    public function update_instruction($id, $instruction){
        return $this->dao->update_instruction($id, $instruction);
    }

    public function delete_instruction($id){
        return $this->dao->delete_instruction($id);
    }
}