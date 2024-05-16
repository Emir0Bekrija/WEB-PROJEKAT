<?php
require_once __DIR__ . '/BaseDao.class.php';

class BlogDao extends BaseDao{

    public function __construct(){
        parent::__construct("blogs");
    }

    public function get_blogs(){
        return $this->query("SELECT * FROM blogs", []);
    }

    public function last_id(){
        return $this->connection->lastInsertId();
    }

    public function get_blog_by_id($id){
        return $this->query_unique("SELECT * FROM blogs WHERE idblogs = :idblogs", ["idblogs" => $id]);
    }

    public function get_blogs_by_user_id($user_id){
        return $this->query("SELECT * FROM blogs WHERE UserId = :UserId", ["UserId" => $user_id]);
    }

    public function add_blog($blog){
        $this->insert("blogs", $blog);
        return $blog;
    }

    public function update_blog($id, $blog){
        $this->update("blogs", $id, $blog);
    }

    public function delete_blog($id){
        $this->execute("DELETE FROM blogs WHERE id = :id", ["id" => $id]);
    }
}