
<?php

// Incluye la clase de conexión
include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$query = "SELECT * FROM secciones_inicio WHERE visibilidad = 1";

// Ejecutamos la consulta
$stmt = $conn->prepare($query);
$stmt->execute();

// Verificamos si la consulta devolvió resultados
if ($stmt->rowCount() > 0) {
    // Obtenemos los resultados en un arreglo asociativo
    $secciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Respondemos con los datos en formato JSON
    echo json_encode($secciones);
} else {
    // Si no hay registros, respondemos con un mensaje
    echo json_encode(["mensaje" => "No se encontraron secciones."]);
}

?>