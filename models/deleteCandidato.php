
<?php 
require_once 'conexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
try {
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id_miembro'];

    if (isset($id)) {
        $query = "DELETE FROM miembros WHERE id_miembro = :id_miembro";

        $result = $conn->prepare($query);

        $result->bindParam(':id_miembro', $id, PDO::PARAM_INT);

        $result->execute();

        if ($result->rowCount() > 0) {
            echo json_encode(["success" => "Miembro eliminado correctamente"]);
        } else {
            echo json_encode(["error" => "No se encontró el miembro o no hubo cambios"]);
        }
    } else {
        echo json_encode(["error" => "Falta el id_miembro en la solicitud"]);
    }

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
