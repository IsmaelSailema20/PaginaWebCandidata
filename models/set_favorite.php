<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'Conexion.php';

class PropuestaManager
{
    private $conn;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }
    public function setFavorite($datos)
    {
        if (!isset($datos['id_propuesta']) || !isset($datos['is_favorite'])) {
            return ['error' => 'Datos incompletos'];
        }

        $id_propuesta = intval($datos['id_propuesta']);
        $is_favorite = intval($datos['is_favorite']);

        if ($is_favorite !== 0 && $is_favorite !== 1) {
            return ['error' => 'Valor de is_favorite inválido'];
        }

        try {
            $this->conn->beginTransaction();

            if ($is_favorite === 1) {
                $stmt = $this->conn->prepare("SELECT COUNT(*) as count FROM propuestas WHERE is_favorite = 1");
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $count = intval($result['count']);

                if ($count >= 4) {
                    $this->conn->rollBack();
                    return ['error' => 'Ya se han seleccionado 4 propuestas favoritas'];
                }
            }

            $stmt = $this->conn->prepare("UPDATE propuestas SET is_favorite = :is_favorite WHERE id_propuesta = :id_propuesta");
            $stmt->bindValue(':is_favorite', $is_favorite, PDO::PARAM_INT);
            $stmt->bindValue(':id_propuesta', $id_propuesta, PDO::PARAM_INT);
            $stmt->execute();

            $this->conn->commit();

            if ($stmt->rowCount() > 0) {
                return ['success' => 'Propuesta actualizada correctamente'];
            } else {
                return ['error' => 'Propuesta no encontrada o ya está en el estado deseado'];
            }
        } catch (PDOException $e) {
            $this->conn->rollBack();
            return ['error' => 'Error al actualizar la propuesta: ' . $e->getMessage()];
        }
    }
}

try {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    if (!is_array($data)) {
        throw new Exception('Datos de entrada inválidos');
    }

    $propuestaManager = new PropuestaManager();
    $resultado = $propuestaManager->setFavorite($data);

    if (isset($resultado['error'])) {
        http_response_code(400);
    } else {
        http_response_code(200);
    }
    echo json_encode($resultado);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

