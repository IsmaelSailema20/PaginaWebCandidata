<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

    public function editarPropuesta($datos) {
        try {
            // Begin transaction
            $this->conn->beginTransaction();

            // Update proposal
            $sqlPropuesta = "UPDATE propuestas
                SET titulo_propuesta = :titulo,
                    subtitle = :subtitle,
                    descripcion_propuesta = :descripcion,
                    icon = :icon
                WHERE id_propuesta = :id";

            $stmtPropuesta = $this->conn->prepare($sqlPropuesta);
            $stmtPropuesta->bindValue(':titulo', $datos['titulo_propuesta']);
            $stmtPropuesta->bindValue(':subtitle', $datos['subtitle']);
            $stmtPropuesta->bindValue(':descripcion', $datos['descripcion_propuesta']);
            $stmtPropuesta->bindValue(':icon', $datos['icon']);
            $stmtPropuesta->bindValue(':id', $datos['id_propuesta']);
            $stmtPropuesta->execute();

            // Find category ID
            $sqlCategoria = "SELECT id_cat_propuesta FROM categorias_propuestas
                WHERE nombre_cat_propuesta = :categoria";
            $stmtCategoria = $this->conn->prepare($sqlCategoria);
            $stmtCategoria->bindValue(':categoria', $datos['categoria']);
            $stmtCategoria->execute();
            $categoria = $stmtCategoria->fetch(PDO::FETCH_ASSOC);

            // Update proposal-category link
            if ($categoria) {
                // First, remove existing category link
                $sqlRemoveLink = "DELETE FROM propuestas_categorias
                    WHERE id_propuesta = :id_propuesta";
                $stmtRemoveLink = $this->conn->prepare($sqlRemoveLink);
                $stmtRemoveLink->bindValue(':id_propuesta', $datos['id_propuesta']);
                $stmtRemoveLink->execute();

                // Then, add new category link
                $sqlVinculo = "INSERT INTO propuestas_categorias
                    (id_propuesta, id_categoria) VALUES (:id_propuesta, :id_categoria)";
                $stmtVinculo = $this->conn->prepare($sqlVinculo);
                $stmtVinculo->bindValue(':id_propuesta', $datos['id_propuesta']);
                $stmtVinculo->bindValue(':id_categoria', $categoria['id_cat_propuesta']);
                $stmtVinculo->execute();
            }

            // Commit transaction
            $this->conn->commit();

            return [
                'success' => true,
                'propuesta' => $datos
            ];
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
    // Get the raw POST data
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    $propuestaManager = new PropuestaManager();
    $resultado = $propuestaManager->editarPropuesta($data);

    echo json_encode($resultado);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}