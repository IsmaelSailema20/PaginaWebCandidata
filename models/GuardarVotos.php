<?php
require_once 'conexion.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Responder a las solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);  // Respuesta para OPTIONS
    exit();
}

try {
    $conexion = new Conexion();
    $conn = $conexion->conectar();

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id_votacion'])) {
        $id_votacion = $data['id_votacion'];

        // Insertar el voto en la tabla 'votos'
        $sql = "INSERT INTO votos (id_votacion) VALUES (:id_votacion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_votacion', $id_votacion, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Voto registrado con éxito']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar el voto']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Parámetro faltante: id_votacion']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>