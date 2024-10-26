<?php
require_once 'conexion.php';

header("Acces-Control-Allow-Origin");
header("Content-type: application/json");

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();
$nombre_usuario = $_POST['nombre_usuario'];
$apellido_usuario = $_POST['apellido_usuario'];
$correo_electronico = $_POST['correo_electronico'];
$genero = $_POST['genero'];
$tipo_persona = $_POST['tipo_persona'];
$sugerencia = $_POST['sugerencia'];
$sqlInsertSugerencia = "INSERT INTO sugerencias (id_sugerencia, nombre_usuario, apellido_usuario, correo_electronico, genero, tipo_persona, sugerencia) VALUES (NULL, '$nombre_usuario', '$apellido_usuario', '$correo_electronico', '$genero', '$tipo_persona', '$sugerencia' );";
$result = $conn->prepare($sqlInsertSugerencia);
$result->execute();
//print_r("se inserto correctamente");
$dataJson = json_encode("Se inserto correctamente");
print_r($dataJson);
