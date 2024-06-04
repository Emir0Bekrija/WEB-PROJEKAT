<?php
require_once __DIR__ . '/BaseDao.class.php';

class IngredientsDao extends BaseDao{
    
        public function __construct(){
            parent::__construct("ingredients");
        }
    
        public function get_ingredients(){
            return $this->query("SELECT * FROM ingredients", []);
        }
    
        public function get_ingredient($id){
            return $this->query("SELECT ingredient FROM ingredients WHERE blogID = :blogID", ["blogID" => $id]);
        }
    
        public function add_ingredient($ingredient){
            $this->insert("ingredients", $ingredient);
            return $ingredient;
        }
    
        public function update_ingredient($id, $ingredient){
            $this->update($id, $ingredient, "idIngredients");
        }
    
        public function delete_ingredient($id){
            $this->execute("DELETE FROM ingredients WHERE blogID = :blogID", ["blogID" => $id]);
        }
        
}