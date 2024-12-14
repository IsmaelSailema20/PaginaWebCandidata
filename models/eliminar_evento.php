<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
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

    // Método para eliminar un evento
    public function eliminarEvento($id)
    {
        try {
            // Consulta SQL para eliminar el evento por ID
            $sqlDeleteEvento = "DELETE FROM eventos_noticias WHERE id = :id";

            $stmt = $this->conn->prepare($sqlDeleteEvento);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Ejecutar la eliminación
            $stmt->execute();

            // Verificar si se eliminó algún registro
            if ($stmt->rowCount() > 0) {
                return ['mensaje' => 'Evento eliminado con éxito'];
            } else {
                return ['error' => 'No se encontró el evento con el ID proporcionado'];
            }
        } catch (PDOException $e) {
            http_response_code(500);
            return ['error' => $e->getMessage()];
        }
    }
}

// Comprobar si se recibe la solicitud DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $eventos = new Eventos();

        // Obtener el ID del evento desde la URL
        if (isset($_GET['id'])) {
            $id = $_GET['id'];  // Recibir el id de la URL

            // Llamar al método para eliminar el evento
            $resultado = $eventos->eliminarEvento($id);

            // Devolver el resultado como JSON
            echo json_encode($resultado);
        } else {
            // Responder si falta el ID del evento
            http_response_code(400);
            echo json_encode(['error' => 'Falta el ID del evento']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>