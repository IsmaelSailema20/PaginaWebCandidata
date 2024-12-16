<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();

$sql = "SELECT * FROM votaciones";
$result = $conn->query($sql);

$votaciones = array();

if ($result) {
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $votaciones[] = $row;
    }
}

echo json_encode($votaciones);

$conn = null;
?>