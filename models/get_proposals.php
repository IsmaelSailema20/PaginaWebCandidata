<?php
include 'conexion.php'; // Incluye el archivo de conexión
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if ($conn) {
    // Consulta SQL para obtener las primeras 3 propuestas
    $sql = "SELECT * FROM propuestas WHERE is_favorite = 1 ORDER BY id_propuesta";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $propuestas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver las propuestas en formato JSON
    echo json_encode($propuestas);
} else {
    echo json_encode(["error" => "No se pudo establecer la conexión."]);
}
?>