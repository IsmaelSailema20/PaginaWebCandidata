<?php

class Conexion
{
    private $server = 'localhost';
    private $db = 'candidatura';
    private $user = 'root';
    private $password = 'root';

    public function conectar()
    {
        try {
            $conn = new PDO("mysql:host=" . $this->server . ";dbname=" . $this->db, $this->user, $this->password);
            return $conn;
        } catch (Exception $e) {
            die("error al conectar: " . $e->getMessage());
        }
    }
}

$conexion = new Conexion();
$conn = $conexion->conectar();

if ($conn) {
} else {
    echo json_encode(["error" => "No se pudo establecer la conexión."]);
}