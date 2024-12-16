<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Responder a las solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
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

    // Método para editar un evento existente
    public function editarEvento($id, $titulo, $tipo, $descripcion, $lugar, $fecha, $hora, $imagen, $visible)
    {
        try {
            // Formatear la fecha y hora para el campo DATETIME
            $fechaHora = $fecha . ' ' . $hora;

            // Consulta SQL para actualizar un evento existente
            $sqlUpdateEvento = "UPDATE eventos_noticias SET 
                                    titulo_evento_noticia = :titulo,
                                    descrip_evento_noticia = :descripcion,
                                    lugar_Evt = :lugar,
                                    fecha = STR_TO_DATE(:fechaHora, '%Y-%m-%d %H:%i'),
                                    urlImagen = :imagen,
                                    tipo = :tipo,
                                    visible = :visible
                                WHERE id = :id";

            $stmt = $this->conn->prepare($sqlUpdateEvento);
            $stmt->bindParam(':titulo', $titulo);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':lugar', $lugar);
            $stmt->bindParam(':fechaHora', $fechaHora);
            $stmt->bindParam(':imagen', $imagen);
            $stmt->bindParam(':tipo', $tipo);
            $stmt->bindParam(':visible', $visible);
            $stmt->bindParam(':id', $id);

            // Ejecutar la actualización
            $stmt->execute();

            // Consultar el evento actualizado
            $sqlEventoActualizado = "SELECT 
                                        id, 
                                        titulo_evento_noticia AS titulo, 
                                        descrip_evento_noticia AS descripcion,
                                        lugar_Evt AS lugar,
                                        DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha,
                                        TIME_FORMAT(fecha, '%H:%i') AS hora,
                                        urlImagen AS imagen,
                                        tipo,
                                        visible
                                    FROM eventos_noticias 
                                    WHERE id = :id";

            $stmtActualizado = $this->conn->prepare($sqlEventoActualizado);
            $stmtActualizado->bindParam(':id', $id);
            $stmtActualizado->execute();
            $eventoActualizado = $stmtActualizado->fetch(PDO::FETCH_ASSOC);

            // Devolver el evento actualizado en formato JSON
            return ['evento' => $eventoActualizado];
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

// Comprobar si se recibe la solicitud POST para editar un evento
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $eventos = new Eventos();
        $data = json_decode(file_get_contents("php://input"), true);  // Obtener los datos en formato JSON

        // Validar que los datos necesarios estén presentes
        if (
            isset($data['id']) &&
            isset($data['titulo']) &&
            isset($data['tipo']) &&
            isset($data['descripcion']) &&
            isset($data['lugar']) &&
            isset($data['fecha']) &&
            isset($data['hora']) &&
            isset($data['imagen'])
        ) {
            // Llamar al método para editar el evento
            $resultado = $eventos->editarEvento(
                $data['id'],
                $data['titulo'],
                $data['tipo'],
                $data['descripcion'],
                $data['lugar'],
                $data['fecha'],
                $data['hora'],
                $data['imagen'],
                isset($data['visible']) ? $data['visible'] : true
            );

            // Devolver el resultado como JSON
            echo json_encode($resultado);
        } else {
            // Responder si falta algún dato obligatorio
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos requeridos']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>