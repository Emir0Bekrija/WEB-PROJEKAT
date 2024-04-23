<?php
require_once __DIR__ . '/BaseDao.class.php';


class UserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("user");
    }

    public function get_user_by_id($id)
    {
        return $this->query_unique("SELECT * FROM user WHERE id = :id", 
        ["id" => $id]);
    }

    public function addUser($user)
    {
        $this->insert("user", $user);
    }

    public function update_user($id, $user)
    {
        $this->update("user", $id, $user);
    }

    
}