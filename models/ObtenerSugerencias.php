<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();

$sql = "SELECT * FROM sugerencias";
$result = $conn->query($sql);

$sugerencias = array();

if ($result) {
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $sugerencias[] = $row;
    }
}

echo json_encode($sugerencias);

$conn = null;
?>