<?php
// Incluir la clase de conexión
include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
try {
    $sql = "SELECT * FROM miembros WHERE tipo_miembro = 'PRESIDENTE' OR tipo_miembro = 'ALCALDE' OR tipo_miembro = 'RECTOR'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $leader = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($leader) {
        echo json_encode($leader);
    } else {
        echo json_encode(["error" => "Líder no encontrado"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener eventos: " . $e->getMessage()]);
}
?>