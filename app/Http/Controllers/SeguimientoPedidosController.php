<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SeguimientoPedidosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('seguimiento_pedidos');
        }
        return redirect('/login');
    }

    public function consulta_TraerPedidosSeguimientoClientes(Request $request ){

        $fechaBuscarPedidos = $request->input('fechaBuscarPedidos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto,
    idPedido,
    codigoCliPedido,
    SUM(CASE WHEN tb_pesadas.idEspecie = 1 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadPrimerEspecie,
    SUM(CASE WHEN tb_pesadas.idEspecie = 2 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadSegundaEspecie,
    SUM(CASE WHEN tb_pesadas.idEspecie = 3 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadTerceraEspecie,
    SUM(CASE WHEN tb_pesadas.idEspecie = 4 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadCuartaEspecie,
    MAX(tb_pedidos.fechaRegistroPedido) AS fechaRegistroPedido,
    MAX(tb_pedidos.comentarioPedido) AS comentarioPedido,
    MAX(tb_pedidos.estadoPedido) AS estadoPedido,
    tb_pedidos.cantidadPrimerEspecie AS cantidadPrimerEspecie,
    tb_pedidos.cantidadSegundaEspecie AS cantidadSegundaEspecie,
    tb_pedidos.cantidadTerceraEspecie AS cantidadTerceraEspecie,
    tb_pedidos.cantidadCuartaEspecie AS cantidadCuartaEspecie
FROM tb_pedidos
INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pedidos.codigoCliPedido
INNER JOIN tb_zonas ON tb_zonas.idZona = tb_clientes.idZona  
LEFT JOIN tb_pesadas ON tb_pesadas.codigoCli = tb_pedidos.codigoCliPedido
                    AND DATE(tb_pesadas.fechaRegistroPes) = DATE(tb_pedidos.fechaRegistroPedido)
                    AND tb_pesadas.estadoPes = 1
WHERE estadoPedido = 1 AND fechaRegistroPedido = ?
GROUP BY idPedido, nombreCompleto, codigoCliPedido, cantidadPrimerEspecie, cantidadSegundaEspecie, cantidadTerceraEspecie, cantidadCuartaEspecie
ORDER BY FIELD(tb_zonas.idZona, 4, 2, 3, 1), nombreCompleto ASC;
',[$fechaBuscarPedidos]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
