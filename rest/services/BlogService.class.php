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

    public function get_blog_by_id($id){
        return $this->dao->get_blog_by_id($id);
    }

    public function get_blogs_by_user_id($user_id){
        return $this->dao->get_blogs_by_user_id($user_id);
    }

    public function last_id(){
        return $this->dao->last_id();
    }

    public function add_blog($blog){
        return $this->dao->add_blog($blog);
    }

    public function update_blog($id, $blog){
        return $this->dao->update_blog($id, $blog);
    }

    public function delete_blog($id){
        return $this->dao->delete_blog($id);
    }

}