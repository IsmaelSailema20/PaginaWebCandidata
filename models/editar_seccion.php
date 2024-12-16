<?php

include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;
    $nombre = $data->nombre;
    $descripcion = $data->descripcion;
    $url_de_la_imagen = $data->url_de_la_imagen;
    $visibilidad = $data->visibilidad;

    // Actualizar la sección
    $query = "UPDATE secciones_inicio SET nombre = :nombre, descripcion = :descripcion, url_de_la_imagen = :url_de_la_imagen, visibilidad = :visibilidad WHERE id = :id";
    $stmt = $conn->prepare($query);
    
    // Bind de los parámetros
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':url_de_la_imagen', $url_de_la_imagen);
    $stmt->bindParam(':visibilidad', $visibilidad);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Sección actualizada exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar la sección."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID no proporcionado."]);
}

?>
