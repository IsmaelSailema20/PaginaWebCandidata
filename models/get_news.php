<?php
require_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
try {
    $query = $conn->prepare("SELECT titulo_evento_noticia AS titulo, descrip_evento_noticia AS descripcion, urlImagen 
                             FROM eventos_noticias 
                             WHERE tipo = 'Noticia' AND visible = 1");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener noticias: " . $e->getMessage()]);
}
?>
