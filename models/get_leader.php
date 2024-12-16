<?php
// Incluir la clase de conexión
include_once 'conexion.php';

// Crear una nueva instancia de la clase Conexion
$conexion = new Conexion();
$conn = $conexion->conectar();

if ($conn) {
    // Consulta para obtener la información del líder
    $sql = "SELECT nombre_miembro, descripcion_miembro, url_to_image_placeholder, facebook_url, instagram_url 
            FROM miembros 
            WHERE tipo_miembro = 'LÍDER' AND visible = 1";
    
    // Ejecutar la consulta
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Verificar si hay resultados
    if ($stmt->rowCount() > 0) {
        // Recuperar el resultado
        $leader = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($leader);  // Devolver los resultados en formato JSON
    } else {
        echo json_encode(['error' => 'No se encontró el líder del partido.']);
    }
} else {
    echo json_encode(["error" => "No se pudo establecer la conexión."]);
}
?>
