<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $pasword = $data['password'];
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();
    $selectMiembros = "SELECT username, password FROM usuarios WHERE username = '$username' AND password = '$pasword'";

    $result = $conn->prepare($selectMiembros);
    $result->execute();

    $data = $result->fetchAll(PDO::FETCH_ASSOC);

    $dataJson = json_encode($data);

    echo $dataJson;

} catch (Exception $e) {
    echo json_encode(["error" => "No existe el usuario"]);
}
