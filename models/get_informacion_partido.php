<?php
// Incluir la clase de conexión
include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
try {
    $sql = "SELECT * FROM informacion_partido";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $info_partido = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];
    foreach ($info_partido as $row) {
        $result[$row['tipo']] = $row['descripcion'];
    }

    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener la información del partido: " . $e->getMessage()]);
}
?>