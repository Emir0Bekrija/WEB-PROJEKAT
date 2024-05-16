<?php

require_once __DIR__ . '/../config.php';

class BaseDao {
    protected $connection;

    private $table;

    public function __construct($table) {
        $this->table = $table;
        try {
            $this->connection = new PDO(
                "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME, 
                DB_USER, 
                DB_PASSWORD, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw $e;
        }

        
    }

     protected function query($query, $params) {
        $statement = $this->connection->prepare($query);
        $statement->execute($params);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_unique($query, $params) {
        $results = $this->query($query, $params);
        return reset($results);
    }

    protected function execute($query, $params) {
        $prepared_statement = $this->connection->prepare($query);
        if ($params) {
        foreach ($params as $key => $param) {
            $prepared_statement->bindValue($key, $param);
        }
        }
        $prepared_statement->execute();
        return $prepared_statement;
    }

    public function insert($table, $entity) {
        $query = "INSERT INTO {$table} (";
        // INSERT INTO patients (
        foreach ($entity as $column => $value) {
        $query .= $column . ", ";
        }
        // INSERT INTO patients (first_name, last_name, 
        $query = substr($query, 0, -2);
        // INSERT INTO patients (first_name, last_name
        $query .= ") VALUES (";
        // INSERT INTO patients (first_name, last_name) VALUES (
        foreach ($entity as $column => $value) {
        $query .= ":" . $column . ", ";
        }
        // INSERT INTO patients (first_name, last_name) VALUES (:first_name, :last_name, 
        $query = substr($query, 0, -2);
        // INSERT INTO patients (first_name, last_name) VALUES (:first_name, :last_name
        $query .= ")";
        // INSERT INTO patients (first_name, last_name) VALUES (:first_name, :last_name)

        $statement = $this->connection->prepare($query);
        $statement->execute($entity); // SQL injection prevention
        $entity['id'] = $this->connection->lastInsertId();
        return $entity;
    }

    public function update($id, $entity, $id_column = "id")
    {
        $query = "UPDATE " . $this->table . " SET ";
        foreach ($entity as $name => $value) {
            $query .= $name . "= :" . $name . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE {$id_column} = :id";
        $stmt = $this->connection->prepare($query);
        $entity['id'] = $id;
        $stmt->execute($entity);
    }

    public function delete($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
        $stmt->bindParam(':id', $id); // SQL injection prevention
        $stmt->execute();
    }
}