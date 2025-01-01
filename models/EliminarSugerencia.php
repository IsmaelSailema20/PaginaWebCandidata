<?php
require_once 'conexion.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Crear conexión a la base de datos
$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();

// Obtener datos enviados en el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_sugerencia'])) {
    $id_sugerencia = $data['id_sugerencia'];

    try {
        // Actualizar el campo "visible" a 0 para ocultar la sugerencia
        $sqlUpdateVisible = "UPDATE sugerencias SET visible = 0 WHERE id_sugerencia = :id_sugerencia";
        $stmt = $conn->prepare($sqlUpdateVisible);
        $stmt->bindParam(':id_sugerencia', $id_sugerencia, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["ok" => true, "message" => "Sugerencia actualizada correctamente."]);
        } else {
            echo json_encode(["ok" => false, "message" => "Error al actualizar la sugerencia."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["ok" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["ok" => false, "message" => "ID de sugerencia no proporcionado."]);
}

$conn = null;
