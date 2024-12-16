<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();
$nivel = $_POST['nivel'];
$insertNivel = "INSERT INTO nivel values ('$nivel')";
$result = $conn->prepare($insertNivel);
$result->execute();
$dataJson = json_encode("Se inserto correctamente");
print_r($dataJson);