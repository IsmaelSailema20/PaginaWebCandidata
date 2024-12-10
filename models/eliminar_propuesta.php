<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'Conexion.php';

class PropuestaManager {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    public function eliminarPropuesta($id) {
        try {
            // Begin transaction
            $this->conn->beginTransaction();

            // Remove category links first
            $sqlRemoveLinks = "DELETE FROM propuestas_categorias WHERE id_propuesta = :id";
            $stmtRemoveLinks = $this->conn->prepare($sqlRemoveLinks);
            $stmtRemoveLinks->bindValue(':id', $id);
            $stmtRemoveLinks->execute();

            // Then remove the proposal
            $sqlPropuesta = "DELETE FROM propuestas WHERE id_propuesta = :id";
            $stmtPropuesta = $this->conn->prepare($sqlPropuesta);
            $stmtPropuesta->bindValue(':id', $id);
            $stmtPropuesta->execute();

            // Commit transaction
            $this->conn->commit();

            return ['success' => true];
        } catch (PDOException $e) {
            // Rollback transaction in case of error
            $this->conn->rollBack();
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

// Handle the request
try {
    // Get the proposal ID from the query string
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($id === null) {
        throw new Exception('ID de propuesta no proporcionado');
    }

    $propuestaManager = new PropuestaManager();
    $resultado = $propuestaManager->eliminarPropuesta($id);

    echo json_encode($resultado);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}