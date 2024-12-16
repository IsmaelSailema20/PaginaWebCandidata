<?php

// Incluye la clase de conexión
include_once 'conexion.php';

// Creamos la consulta para obtener todos los registros de la tabla
$query = "SELECT id, nombre, descripcion, url_de_la_imagen, visibilidad FROM secciones_inicio";

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
