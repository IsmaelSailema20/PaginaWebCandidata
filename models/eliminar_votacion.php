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

class BorrarVotaciones
{
    private $conn;

    public function __construct()
    {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    // Método para eliminar una votacion
    public function eliminarVotacion($id)
    {
        try {

            $sqlDeleteVotacion = "DELETE FROM votaciones WHERE id_votacion = :id_votacion";

            $stmt = $this->conn->prepare($sqlDeleteVotacion);
            $stmt->bindParam(':id_votacion', $id, PDO::PARAM_INT);

            // Ejecutar la eliminación
            $stmt->execute();

            // Verificar si se eliminó algún registro
            if ($stmt->rowCount() > 0) {
                return ['mensaje' => 'Votacion eliminado con éxito'];
            } else {
                return ['error' => 'No se encontró la votacion con el ID proporcionado'];
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
        $eventos = new BorrarVotaciones();

        // Obtener el ID del evento desde la URL
        if (isset($_GET['id_votacion'])) {
            $id = $_GET['id_votacion'];  // Recibir el id de la URL

            // Llamar al método para eliminar el evento
            $resultado = $eventos->eliminarVotacion($id);

            // Devolver el resultado como JSON
            echo json_encode($resultado);
        } else {
            // Responder si falta el ID del evento
            http_response_code(400);
            echo json_encode(['error' => 'Falta el ID de la votacion']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>