<?php
include 'conexion.php'; // Incluye el archivo de conexión
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// Consulta para obtener los miembros que no son líderes (excluyendo al líder con id_miembro = 1)
$query = "SELECT * FROM miembros WHERE tipo_miembro != 'LÍDER'"; // Asegúrate de que el nombre de la tabla y las columnas sean correctas

$stmt = $conn->prepare($query);
$stmt->execute();

// Obtener los resultados
$members = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Comprobar si se obtuvieron miembros
if ($members) {
    echo json_encode($members);
} else {
    echo json_encode(["message" => "No se encontraron miembros"]);
}
?>
