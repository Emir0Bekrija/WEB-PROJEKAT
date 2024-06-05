<?php

require_once __DIR__ . "/../dao/UserDao.class.php";

class UserService{
    private $dao;
    public function __construct(){
        $this->dao = new UserDao();
    }

    public function get_all_users(){
        return $this->dao->get_all_users();
    }

    public function get_user($id){
        return $this->dao->get_user_by_id($id);
    }

    public function add_user($user){
        $user['password'] = password_hash($user['password'], PASSWORD_DEFAULT);
        return $this->dao->addUser($user);
    }

    public function update_user($id, $user){
        $this->dao->update_user($id, $user);
        return true;
    }
}