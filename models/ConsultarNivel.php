<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();

    // Consultar el nivel
    $queryNivel = "SELECT nivel FROM nivel"; // Cambiar según cómo se obtiene el nivel
    $stmtNivel = $conn->prepare($queryNivel);
    $stmtNivel->execute();

    if ($stmtNivel->rowCount() === 0) {
        echo json_encode(["error" => "No se pudo determinar el nivel"]);
        exit;
    }

    $nivel = $stmtNivel->fetch(PDO::FETCH_ASSOC)['nivel'];

    // Validar nivel
    $restricciones = [
        "Pais" => [
            "PRESIDENTE" => 1,
            "VICEPRESIDENTE" => 1
        ],
        "Provincia" => [
            "ALCALDE" => 1,
            "PREFECTO" => 1
        ],
        "Universidad" => [
            "*" => 4
        ]
    ];

    if (!array_key_exists($nivel, $restricciones)) {
        echo json_encode(["error" => "Nivel no válido"]);
        exit;
    }

    // Si el nivel es "Universidad", se hace una consulta simple de conteo
    if ($nivel == 'Universidad') {
        $queryMiembros = "SELECT COUNT(*) AS total_miembros FROM miembros";
        $stmtMiembros = $conn->prepare($queryMiembros);
        $stmtMiembros->execute();
        $resultado = $stmtMiembros->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            "nivel" => $nivel,
            "conteos" => (int) $resultado['total_miembros']
        ]);
        exit;
    }

    // Si el nivel es diferente, se realiza el conteo por tipo de miembro
    $tiposMiembros = array_keys($restricciones[$nivel]);
    $placeholders = implode(",", array_fill(0, count($tiposMiembros), "?"));
    $conteos = [];

    $queryMiembros = "
        SELECT tipo_miembro, COUNT(*) AS conteo
        FROM miembros
        WHERE tipo_miembro IN ($placeholders)
        GROUP BY tipo_miembro
    ";
    $stmtMiembros = $conn->prepare($queryMiembros);
    $stmtMiembros->execute($tiposMiembros);
    $resultados = $stmtMiembros->fetchAll(PDO::FETCH_ASSOC);

    // Asignar conteos a los tipos de miembros
    foreach ($resultados as $fila) {
        $conteos[$fila['tipo_miembro']] = (int) $fila['conteo'];
    }

    // Completar con valores faltantes según restricciones
    foreach ($restricciones[$nivel] as $tipo => $maximo) {
        if (!isset($conteos[$tipo])) {
            $conteos[$tipo] = 0;
        }
    }

    echo json_encode([
        "nivel" => $nivel,
        "conteos" => $conteos
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
