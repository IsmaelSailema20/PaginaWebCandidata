<?php
require_once 'conexion.php';


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();

// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_sugerencia']) && isset($data['estado'])) {
    $id_sugerencia = $data['id_sugerencia'];
    $estado = $data['estado'];

    try {
        // Actualizar el estado de la sugerencia
        $sqlUpdateEstado = "UPDATE sugerencias SET estado = :estado WHERE id_sugerencia = :id_sugerencia";
        $stmt = $conn->prepare($sqlUpdateEstado);
        $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
        $stmt->bindParam(':id_sugerencia', $id_sugerencia, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["ok" => true, "message" => "Estado actualizado correctamente."]);
        } else {
            echo json_encode(["ok" => false, "message" => "Error al actualizar el estado."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["ok" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["ok" => false, "message" => "Datos incompletos."]);
}

$conn = null;
