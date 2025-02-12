<?php
require_once 'conexion.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Responder a las solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);  // Respuesta para OPTIONS
    exit();
}

class CrearVotacion
{
    private $conn;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    public function insertarVotacion($nombre_votacion, $descripcion, $imagen)
    {
        try {
            $sql = "INSERT INTO votaciones (nombre_votacion, descripcion, imagen) VALUES (:nombre_votacion, :descripcion, :imagen)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':nombre_votacion', $nombre_votacion, PDO::PARAM_STR);
            $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
            $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

            if ($stmt->execute()) {
                // Obtener el ID de la nueva votación
                $id_votacion = $this->conn->lastInsertId();

                return [
                    'success' => true,
                    'message' => 'Votación creada con éxito',
                    'data' => [
                        'id_votacion' => $id_votacion,
                        'nombre_votacion' => $nombre_votacion,
                        'descripcion' => $descripcion,
                        'imagen' => $imagen
                    ]
                ];
            } else {
                return ['success' => false, 'message' => 'No se pudo insertar la votación'];
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
    if (isset($data['nombre_votacion'], $data['descripcion'], $data['imagen'])) {
        $crearVotacion = new CrearVotacion();
        $resultado = $crearVotacion->insertarVotacion(
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