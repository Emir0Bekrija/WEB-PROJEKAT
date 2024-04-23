<?php

require_once __DIR__ . "/../dao/CommentsDao.class.php";

class CommentsService{
    private $dao;
    public function __construct(){
        $this->dao = new CommentsDao();
    }

    public function get_comments($id){
        return $this->dao->get_comments($id);
    }

    public function add_comment($comment){
        return $this->dao->add_comment($comment);
    }

}