<?php
require_once __DIR__ . '/BaseDao.class.php';


class UserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("users");
    }

    public function get_all_users()
    {
        return $this->query("SELECT * FROM users", []);
    }

    public function get_user_by_id($id)
    {
        return $this->query_unique("SELECT * FROM users WHERE idUsers = :idUsers", 
        ["idUsers" => $id]);
    }

    public function addUser($user)
    {
        $this->insert("users", $user);
    }

    public function update_user($id, $user)
    {
        $this->update("users", $id, $user);
    }

    
}