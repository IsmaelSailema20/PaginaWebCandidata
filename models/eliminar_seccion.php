<?php

include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Eliminar la sección por su ID
    $query = "DELETE FROM secciones_inicio WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "Sección eliminada exitosamente."]);
    } else {
        echo json_encode(["mensaje" => "Error al eliminar la sección."]);
    }
} else {
    echo json_encode(["mensaje" => "ID no proporcionado."]);
}

?>
