<?php
require_once 'conexion.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Conectar a la base de datos
$conexion = new Conexion();
$conn = $conexion->conectar();

try {
    // Consulta de datos
    $stmt = $conn->query("SELECT setting_key, setting_value FROM settings");
    $settings = [];

    // Obtener resultados como array asociativo
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    // Retornar los resultados en formato JSON
    echo json_encode($settings);

} catch (PDOException $e) {
    // Manejo de errores
    echo json_encode(['error' => $e->getMessage()]);
}
?>