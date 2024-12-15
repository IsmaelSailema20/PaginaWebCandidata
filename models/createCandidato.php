<?php
require_once 'conexion.php'; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data['nombre_miembro']) ||
        empty($data['descripcion_miembro']) || 
        empty($data['tipo_miembro']) 
           ) {
        echo json_encode(["error" => "Todos los campos son obligatorios.", "data" => $data]);
        exit;
    }

    $query = "INSERT INTO miembros (
                  nombre_miembro, 
                  descripcion_miembro, 
                  tipo_miembro, 
                  nivel_academico, 
                  url_to_image_placeholder, 
                  facebook_url, 
                  instagram_url, 
                  visible
              ) VALUES (
                  :nombre, 
                  :descripcion, 
                  :tipo, 
                  :nivel, 
                  :imagen, 
                  :facebook, 
                  :instagram, 
                  :visible
              )";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':nombre', $data['nombre_miembro'], PDO::PARAM_STR);
    $stmt->bindParam(':descripcion', $data['descripcion_miembro'], PDO::PARAM_STR);
    $stmt->bindParam(':tipo', $data['tipo_miembro'], PDO::PARAM_STR);
    $stmt->bindParam(':nivel', $data['nivel_academico'], PDO::PARAM_STR);
    $stmt->bindParam(':imagen', $data['imgSrc'], PDO::PARAM_STR);
    $stmt->bindParam(':facebook', $data['facebook_url'], PDO::PARAM_STR);
    $stmt->bindParam(':instagram', $data['instagram_url'], PDO::PARAM_STR);
    $stmt->bindParam(':visible', $data['visible'], PDO::PARAM_INT);

    if ($stmt->execute()) {
        $nuevoId = $conn->lastInsertId();

        echo json_encode([
            "success" => "El candidato ha sido creado exitosamente.",
            "nuevoMiembro" => array_merge($data, ["id_miembro" => $nuevoId])
        ]);
    } else {
        echo json_encode(["error" => "No se pudo crear el candidato."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
