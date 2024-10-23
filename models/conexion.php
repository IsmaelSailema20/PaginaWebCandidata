<?php

class Conexion
{
    public function conectar()
    {
        define('server', 'localhost');
        define('db', 'candidatura');
        define('user', 'root');
        define('password', "");

        try {
            $conn = new PDO("mysql:host=" . server . ";dbname=" . db, user, password);
            return $conn;
        } catch (Exception $e) {
            die("error al conectar" . $e->getMessage());
        }
    }

}
$conexion = new Conexion();
$conn = $conexion->conectar();

// Para comprobar la conexión, simplemente puedes devolver un mensaje
if ($conn) {
    echo json_encode(["message" => "Conexión exitosa a la base de datos."]);
} else {
    echo json_encode(["error" => "No se pudo establecer la conexión."]);
}