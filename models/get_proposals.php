<?php
include 'conexion.php'; // Incluye el archivo de conexión
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if ($conn) {
    // Consulta SQL para obtener las primeras 3 propuestas
    $sql = "SELECT id_propuesta, titulo_propuesta, subtitle, descripcion_propuesta, icon, alcance_propuesta FROM propuestas ORDER BY id_propuesta ASC LIMIT 3";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $propuestas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver las propuestas en formato JSON
    echo json_encode($propuestas);
} else {
    echo json_encode(["error" => "No se pudo establecer la conexión."]);
}
?>