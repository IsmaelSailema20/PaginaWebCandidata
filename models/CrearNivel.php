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

    // Comprobar si ya existe un registro en la base de datos
    $queryCheck = "SELECT COUNT(*) as count FROM niveles"; // Ajusta el nombre de la tabla si es necesario
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->execute();
    $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        // Si ya existe, actualizar el nivel
        $queryUpdate = "UPDATE niveles SET nivel = :nivel WHERE id = 1"; // Ajusta 'id = 1' si usas otra clave primaria
        $stmtUpdate = $conn->prepare($queryUpdate);
        $stmtUpdate->bindParam(':nivel', $nivel, PDO::PARAM_STR);

        if ($stmtUpdate->execute()) {
            echo json_encode(['success' => true, 'message' => 'Nivel actualizado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar el nivel']);
        }
    } else {
        // Si no existe, insertar un nuevo nivel
        $queryInsert = "INSERT INTO niveles (nivel) VALUES (:nivel)";
        $stmtInsert = $conn->prepare($queryInsert);
        $stmtInsert->bindParam(':nivel', $nivel, PDO::PARAM_STR);

        if ($stmtInsert->execute()) {
            echo json_encode(['success' => true, 'message' => 'Nivel creado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al crear el nivel']);
        }
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}