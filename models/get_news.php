<?php
require_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    $query = $conn->prepare("SELECT * 
                             FROM eventos_noticias 
                             WHERE tipo = 'Noticia' AND visible = 1
                             ORDER BY fecha DESC 
                             LIMIT 4");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener noticias: " . $e->getMessage()]);
}
?>
