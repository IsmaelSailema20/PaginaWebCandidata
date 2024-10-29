

<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();
    $selectMiembros = "SELECT nombre_miembro, tipo_miembro, descripcion_miembro AS title, url_to_image_placeholder AS imgSrc, facebook_url, instagram_url FROM miembros";
    
    $result = $conn->prepare($selectMiembros);
    $result->execute();

    $data = $result->fetchAll(PDO::FETCH_ASSOC);

    $dataJson = json_encode($data);

    echo $dataJson;

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
