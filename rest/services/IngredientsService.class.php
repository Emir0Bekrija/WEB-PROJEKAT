<?php

require_once __DIR__ . '/../dao/IngredientsDao.class.php';

class IngrediendsService{
    private $dao;
    public function __construct(){
        $this->dao = new IngredientsDao();
    }

    public function get_ingredients(){
        return $this->dao->get_ingredients();
    }

    public function get_ingredient($id){
        return $this->dao->get_ingredient($id);
    }

    public function add_ingredient($ingredient){
        return $this->dao->add_ingredient($ingredient);
    }

    public function update_ingredient($id, $ingredient){
        return $this->dao->update_ingredient($id, $ingredient);
    }

    public function delete_ingredient($id){
        return $this->dao->delete_ingredient($id);
    }
}