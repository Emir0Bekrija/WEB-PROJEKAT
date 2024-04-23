<?php

require_once __DIR__ . '/../dao/BlogDao.class.php';

class BlogService{
    private $dao;
    public function __construct(){
        $this->dao = new BlogDao();
    }

    public function get_blogs(){
        return $this->dao->get_blogs();
    }

    public function get_blog($id){
        return $this->dao->get_blog($id);
    }

    public function add_blog($blog){
        return $this->dao->add_blog($blog);
    }

}