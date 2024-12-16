<?php
require_once 'conexion.php'; // Asegúrate de tener configurado este archivo para la conexión a la base de datos.

header("Access-Control-Allow-Origin: *"); // Permitir acceso desde cualquier origen (útil para desarrollo).
header('Content-Type: application/json'); // Indicamos que la salida será en formato JSON.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Permite estos métodos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permite estos encabezados

try {
    // Crear una instancia de la conexión
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();

    // Consulta SQL para obtener los datos de eventos
    $selectEventos = "SELECT 
    urlImagen AS url 
    FROM eventos_noticias WHERE visible = 1";

    // Preparar y ejecutar la consulta
    $result = $conn->prepare($selectEventos);
    $result->execute();

    // Obtener los datos en un array asociativo
    $data = $result->fetchAll(PDO::FETCH_ASSOC);

    // Convertir los datos a formato JSON
    echo json_encode($data);

} catch (Exception $e) {
    // En caso de error, devolver el mensaje en formato JSON
    echo json_encode(["error" => $e->getMessage()]);
}