<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once 'conexion.php';

try {
    // Obtener el nivel enviado desde el frontend
    $nivel = $_POST['nivel'] ?? null;

    if (!$nivel) {
        echo json_encode(['success' => false, 'message' => 'Nivel no especificado']);
        exit();
    }

    $conn = (new Conexion())->conectar();

    // Iniciar una transacción
    $conn->beginTransaction();

    // Eliminar datos de las tablas relevantes
    $tablesToDelete = ['propuestas_categorias', 'propuestas', 'miembros', 'secciones_inicio', 'eventos_noticias', 'propuestas', 'votos', 'votaciones', 'sugerencias', 'settings']; // Reemplaza con los nombres de tus tablas
    foreach ($tablesToDelete as $table) {
        $queryDelete = "DELETE FROM $table";
        $conn->exec($queryDelete);
    }

    // Verificar si ya existe un registro en la tabla niveles
    $queryCheck = "SELECT COUNT(*) as count FROM niveles";
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->execute();
    $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        // Si ya existe, actualizar el nivel
        $queryUpdate = "UPDATE niveles SET nivel = :nivel WHERE id = 1"; // Ajusta 'id = 1' según tu clave primaria
        $stmtUpdate = $conn->prepare($queryUpdate);
        $stmtUpdate->bindParam(':nivel', $nivel, PDO::PARAM_STR);

        if (!$stmtUpdate->execute()) {
            throw new Exception('Error al actualizar el nivel');
        }
    } else {
        // Si no existe, insertar un nuevo nivel
        $queryInsert = "INSERT INTO niveles (nivel) VALUES (:nivel)";
        $stmtInsert = $conn->prepare($queryInsert);
        $stmtInsert->bindParam(':nivel', $nivel, PDO::PARAM_STR);

        if (!$stmtInsert->execute()) {
            throw new Exception('Error al crear el nivel');
        }
    }

    // Confirmar la transacción
    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Nivel cambiado correctamente y datos eliminados']);
} catch (Exception $e) {
    // Revertir la transacción en caso de error
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
