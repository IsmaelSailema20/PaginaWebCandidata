<?php
// Incluir la clase de conexión
include_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    // Obtener los datos enviados en la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Comprobar si los datos están presentes
    if (!empty($data)) {
        // Empezar una transacción para garantizar que el proceso de borrar e insertar sea atómico
        $conn->beginTransaction();

        // Primero borrar todos los registros existentes en la tabla
        $deleteSql = "DELETE FROM informacion_partido";
        $conn->exec($deleteSql);

        // Preparar la consulta SQL para insertar los nuevos registros
        $insertSql = "INSERT INTO informacion_partido (tipo, descripcion) VALUES (:tipo, :descripcion)";
        $stmt = $conn->prepare($insertSql);

        // Iterar sobre el objeto para insertar cada campo como un registro
        foreach ($data as $tipo => $descripcion) {
            // Vincular parámetros y ejecutar la consulta por cada par tipo-descripción
            $stmt->bindParam(':tipo', $tipo);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->execute();
        }

        // Confirmar la transacción
        $conn->commit();

        // Respuesta exitosa
        echo json_encode(["success" => true, "message" => "Información actualizada correctamente."]);
    } else {
        // Si no se reciben datos
        echo json_encode(["success" => false, "message" => "No se recibieron datos válidos."]);
    }
} catch (Exception $e) {
    // En caso de error, revertir la transacción y mostrar el mensaje de error
    $conn->rollBack();
    echo json_encode(["error" => "Error al actualizar la información: " . $e->getMessage()]);
}
?>
