<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();
$nombre_votacion = $_POST['nombre_votacion'];
$descripcion = $_POST['descripcion'];
$imagen = $_POST['imagen'];

// Preparar consulta SQL para insertar la votación
$sqlInsertVotacion = "INSERT INTO votaciones (id_votacion, nombre_votacion, descripcion,imagen) VALUES (NULL, '$nombre_votacion', '$descripcion','$imagen' );";
$result = $conn->prepare($sqlInsertVotacion);
$result->execute();

$dataJson = json_encode("Se inserto correctamente");
print_r($dataJson);
?>