<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

include 'Conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

class PropuestasVisibilidad {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    public function cambiarVisibilidad($id, $visible) {
        try {
            $sql = "UPDATE propuestas SET visible = :visible WHERE id_propuesta = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':visible', $visible, PDO::PARAM_BOOL);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            return ['success' => true, 'message' => 'Visibilidad actualizada'];
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id']) || !isset($data['visible'])) {
        throw new Exception('Datos incompletos');
    }

    $propuestasVisibilidad = new PropuestasVisibilidad();
    $resultado = $propuestasVisibilidad->cambiarVisibilidad($data['id'], $data['visible']);

    echo json_encode($resultado);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}