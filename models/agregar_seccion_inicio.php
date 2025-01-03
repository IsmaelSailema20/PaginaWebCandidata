<?php
// Incluye la clase de conexión
include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Obtiene los datos enviados desde el frontend (formulario)
$data = json_decode(file_get_contents('php://input'), true);

// Validamos si los datos necesarios están presentes
if (isset($data['nombre'], $data['descripcion'], $data['url_de_la_imagen'], $data['visibilidad'])) {
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];
    $url_de_la_imagen = $data['url_de_la_imagen'];
    $visibilidad = $data['visibilidad'] ? 1 : 0;  // Convertimos a 1 (true) o 0 (false)

    // Creamos la consulta SQL para insertar los datos
    $query = "INSERT INTO secciones_inicio (nombre, descripcion, url_de_la_imagen, visibilidad) 
              VALUES (:nombre, :descripcion, :url_de_la_imagen, :visibilidad)";

    // Preparamos la consulta
    $stmt = $conn->prepare($query);

    // Vinculamos los parámetros
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':url_de_la_imagen', $url_de_la_imagen);
    $stmt->bindParam(':visibilidad', $visibilidad, PDO::PARAM_BOOL);  // Usamos PDO::PARAM_BOOL para visibilidad

    // Ejecutamos la consulta y verificamos si se insertaron los datos
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success' => false, 'message' => 'Error al insertar la sección', 'error' => $errorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos necesarios']);
}
?>
