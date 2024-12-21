<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Responder a las solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);  // Respuesta para OPTIONS
    exit();
}

include 'Conexion.php';

class EditarVotacion
{
    private $conn;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    // Método para actualizar una votación
    public function actualizarVotacion($id_votacion, $nombre_votacion, $descripcion, $imagen)
    {
        try {
            $sql = "UPDATE votaciones 
                    SET nombre_votacion = :nombre_votacion, 
                        descripcion = :descripcion, 
                        imagen = :imagen 
                    WHERE id_votacion = :id_votacion";

            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id_votacion', $id_votacion, PDO::PARAM_INT);
            $stmt->bindParam(':nombre_votacion', $nombre_votacion, PDO::PARAM_STR);
            $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
            $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return ['success' => true, 'message' => 'Votación actualizada con éxito'];
            } else {
                return ['success' => false, 'message' => 'Error al actualizar la votación'];
            }
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

try {
    // Leer los datos enviados desde la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar que se enviaron los parámetros necesarios
    if (isset($data['id_votacion'], $data['nombre_votacion'], $data['descripcion'], $data['imagen'])) {
        $editarVotacion = new EditarVotacion();
        $resultado = $editarVotacion->actualizarVotacion(
            $data['id_votacion'],
            $data['nombre_votacion'],
            $data['descripcion'],
            $data['imagen']
        );

        echo json_encode($resultado);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan parámetros en la solicitud']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>