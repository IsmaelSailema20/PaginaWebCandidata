
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
        empty($data['tipo_miembro']) ||
        !isset($data['visible']) 
    ) {
        echo json_encode(["error" => "Todos los campos son obligatorios.", "data" => $data]);
        exit;
    }

    $query = "UPDATE miembros 
              SET nombre_miembro = :nombre, 
                  descripcion_miembro = :descripcion, 
                  tipo_miembro = :tipo, 
                  nivel_academico = :nivel,
                  url_to_image_placeholder = :imagen, 
                  facebook_url = :facebook, 
                  instagram_url = :instagram, 
                  visible = :visible 
              WHERE id_miembro = :id";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':nombre', $data['nombre_miembro'], PDO::PARAM_STR);
    $stmt->bindParam(':descripcion', $data['descripcion_miembro'], PDO::PARAM_STR); 
    $stmt->bindParam(':tipo', $data['tipo_miembro'], PDO::PARAM_STR);
    $stmt->bindParam(':nivel', $data['nivel_academico'], PDO::PARAM_STR);
    $stmt->bindParam(':imagen', $data['imgSrc'], PDO::PARAM_STR);
    $stmt->bindParam(':facebook', $data['facebook_url'], PDO::PARAM_STR);
    $stmt->bindParam(':instagram', $data['instagram_url'], PDO::PARAM_STR);
    $stmt->bindParam(':visible', $data['visible'], PDO::PARAM_INT);

    $id = $data['id_miembro'];
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["success" => "El miembro ha sido actualizado exitosamente.",$data]);
    } else {
        echo json_encode(["error" => "No se pudo actualizar el miembro."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
