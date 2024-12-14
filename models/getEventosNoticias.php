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

class Eventos
{
    private $conn;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    public function obtenerEventos()
    {
        try {
            // Consulta SQL
            $sqlEventos = "SELECT 
                                id,
                                titulo_evento_noticia AS titulo,
                                descrip_evento_noticia AS descripcion,
                                lugar_Evt AS lugar,
                                DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha,
                                TIME_FORMAT(fecha, '%H:%i') AS hora,
                                urlImagen AS imagen,
                                tipo AS tipo 
                            FROM eventos_noticias";

            // Ejecutar la consulta
            $stmtEventos = $this->conn->prepare($sqlEventos);
            $stmtEventos->execute();
            $eventos = $stmtEventos->fetchAll(PDO::FETCH_ASSOC);

            // Responder con los eventos en JSON
            return ['eventos' => $eventos];
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

try {
    $eventos = new Eventos();
    $resultado = $eventos->obtenerEventos();
    echo json_encode($resultado);  // Devolver el resultado como JSON
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>