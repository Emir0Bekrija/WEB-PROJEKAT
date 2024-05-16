<?php
require_once __DIR__ . '/BaseDao.class.php';

class CommentsDao extends BaseDao{

    public function __construct(){
        parent::__construct("comments");
    }

    public function get_comments($id){
        return $this->query("SELECT * FROM comments WHERE blogID = :blogID", ["blogID" => $id]);
    }

    public function add_comment($comment){
        $this->insert("comments", $comment);
    }
}