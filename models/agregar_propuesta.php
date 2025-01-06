<?php
// agregar_propuesta.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *'); // Ajusta esto según tu configuración de CORS
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

    // Función para validar la URL de la imagen
    private function validarImagenUrl($url) {
        return filter_var($url, FILTER_VALIDATE_URL) && preg_match('/\.(jpeg|jpg|gif|png|svg)$/i', $url);
    }

    public function agregarPropuesta($datos) {
        try {
            // Validar img_url si está proporcionada
            if (!empty($datos['img_url']) && !$this->validarImagenUrl($datos['img_url'])) {
                throw new Exception('URL de imagen inválida.');
            }

            $this->conn->beginTransaction();

            $sqlPropuesta = "INSERT INTO propuestas
                (titulo_propuesta, subtitle, descripcion_propuesta, icon, id_candidato, alcance_propuesta, img_url)
                VALUES (:titulo, :subtitle, :descripcion, :icon, :id_candidato, :alcance_propuesta, :img_url)";

            $stmtPropuesta = $this->conn->prepare($sqlPropuesta);
            $stmtPropuesta->bindValue(':titulo', $datos['titulo_propuesta']);
            $stmtPropuesta->bindValue(':subtitle', $datos['subtitle']);
            $stmtPropuesta->bindValue(':descripcion', $datos['descripcion_propuesta']);
            $stmtPropuesta->bindValue(':icon', $datos['icon']);
            $stmtPropuesta->bindValue(':id_candidato', $datos['id_candidato']);
            $stmtPropuesta->bindValue(':alcance_propuesta', $datos['alcance_propuesta']);
            $stmtPropuesta->bindValue(':img_url', $datos['img_url'] ?? null); // Maneja valores nulos
            $stmtPropuesta->execute();

            $idPropuesta = $this->conn->lastInsertId();

            $sqlCategoria = "SELECT id_cat_propuesta FROM categorias_propuestas
                WHERE nombre_cat_propuesta = :categoria";
            $stmtCategoria = $this->conn->prepare($sqlCategoria);
            $stmtCategoria->bindValue(':categoria', $datos['categoria']);
            $stmtCategoria->execute();
            $categoria = $stmtCategoria->fetch(PDO::FETCH_ASSOC);

            if ($categoria) {
                $sqlVinculo = "INSERT INTO propuestas_categorias
                    (id_propuesta, id_categoria) VALUES (:id_propuesta, :id_categoria)";
                $stmtVinculo = $this->conn->prepare($sqlVinculo);
                $stmtVinculo->bindValue(':id_propuesta', $idPropuesta);
                $stmtVinculo->bindValue(':id_categoria', $categoria['id_cat_propuesta']);
                $stmtVinculo->execute();
            }

            $this->conn->commit();

            return [
                'success' => true,
                'propuesta' => [
                    'id_propuesta' => $idPropuesta,
                    'titulo_propuesta' => $datos['titulo_propuesta'],
                    'subtitle' => $datos['subtitle'],
                    'descripcion_propuesta' => $datos['descripcion_propuesta'],
                    'icon' => $datos['icon'],
                    'categoria' => $datos['categoria'],
                    'id_candidato' => $datos['id_candidato'],
                    'alcance_propuesta' => $datos['alcance_propuesta'],
                    'img_url' => $datos['img_url'] ?? null
                ]
            ];
        } catch (PDOException $e) {
            $this->conn->rollBack();
            http_response_code(500);
            return ['error' => $e->getMessage()];
        } catch (Exception $e) {
            http_response_code(400);
            return ['error' => $e->getMessage()];
        }
    }
}

try {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    $propuestaManager = new PropuestaManager();
    $resultado = $propuestaManager->agregarPropuesta($data);

    echo json_encode($resultado);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>