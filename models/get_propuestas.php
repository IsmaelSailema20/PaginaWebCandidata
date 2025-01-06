<?php
// get_propuestas.php

error_reporting(E_ALL);
ini_set('display_errors', 1);


header('Access-Control-Allow-Origin: http://localhost:5173');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'Conexion.php';

class Propuestas {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    public function obtenerPropuestasYCategorias() {
        try {
            $sqlPropuestas = "SELECT
                                p.id_propuesta,
                                p.titulo_propuesta,
                                p.subtitle,
                                p.descripcion_propuesta,
                                p.icon,
                                p.visible,
                                p.is_favorite,
                                p.alcance_propuesta,
                                p.id_candidato,
                                p.img_url,
                                m.id_miembro,
                                m.nombre_miembro,
                                m.url_to_image_placeholder AS imgSrc,
                                c.nombre_cat_propuesta AS categoria
                            FROM propuestas p
                            LEFT JOIN miembros m ON p.id_candidato = m.id_miembro
                            LEFT JOIN propuestas_categorias pc ON p.id_propuesta = pc.id_propuesta
                            LEFT JOIN categorias_propuestas c ON pc.id_categoria = c.id_cat_propuesta";

            $sqlCategorias = "SELECT id_cat_propuesta, nombre_cat_propuesta FROM categorias_propuestas";

            $stmtPropuestas = $this->conn->prepare($sqlPropuestas);
            $stmtPropuestas->execute();
            $propuestas = $stmtPropuestas->fetchAll(PDO::FETCH_ASSOC);

            $stmtCategorias = $this->conn->prepare($sqlCategorias);
            $stmtCategorias->execute();
            $categorias = $stmtCategorias->fetchAll(PDO::FETCH_ASSOC);
            $propuestas = array_map(function ($propuesta) {
                $propuesta['visible'] = $propuesta['visible'] == 1;
                return $propuesta;
            }, $propuestas);

            return ['propuestas' => $propuestas, 'categorias' => $categorias];
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

try {
    $propuestas = new Propuestas();
    $resultado = $propuestas->obtenerPropuestasYCategorias();
    echo json_encode($resultado);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

