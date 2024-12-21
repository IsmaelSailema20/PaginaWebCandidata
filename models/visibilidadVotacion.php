<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');  // Permite todas las solicitudes de origen
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type');  // Encabezados permitidos
header('Access-Control-Allow-Credentials: true');  // Permite credenciales (si las usas)
header('Content-Type: application/json; charset=UTF-8');

// Responder a las solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);  // Respuesta para OPTIONS
    exit();
}

include 'Conexion.php';

class Votaciones
{
    private $conn;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    // Método para cambiar la visibilidad de una votación
    public function cambiarVisibilidad($id_votacion, $visible)
    {
        try {
            // Consulta SQL para actualizar la visibilidad de la votación
            $sql = "UPDATE votaciones SET visible = :visible WHERE id_votacion = :id_votacion";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id_votacion', $id_votacion);
            $stmt->bindParam(':visible', $visible, PDO::PARAM_BOOL);

            if ($stmt->execute()) {
                return ['success' => true];
            } else {
                return ['success' => false, 'message' => 'No se pudo actualizar la visibilidad'];
            }
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }

}

try {
    // Recibir los datos JSON de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id_votacion']) && isset($data['visible'])) {
        $votaciones = new Votaciones();
        $resultado = $votaciones->cambiarVisibilidad($data['id_votacion'], $data['visible']);
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