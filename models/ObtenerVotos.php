<?php
require_once 'conexion.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

try {
    $conexion = new Conexion();
    $conn = $conexion->conectar();

    $sql = "SELECT v.id_votacion, vot.nombre_votacion, COUNT(v.id_voto) AS total_votos
            FROM votos v
            JOIN votaciones vot ON v.id_votacion = vot.id_votacion
            GROUP BY v.id_votacion";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>