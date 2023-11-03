<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PesadasController extends Controller
{
    //
    public function show(){
        if (Auth::check()){
            return view('pesadas');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarPesadasDesdeHasta(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_pesadas.idPesada,
                    tb_pesadas.idProceso,
                    tb_pesadas.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas.pesoNetoPes,
                    tb_pesadas.horaPes,
                    tb_pesadas.codigoCli,
                    tb_pesadas.fechaRegistroPes,
                    tb_pesadas.cantidadPes,
                    tb_pesadas.precioPes,
                    tb_pesadas.numBalanzaPes,
                    tb_pesadas.numeroJabasPes,
                    tb_pesadas.valorConversion,
                    tb_pesadas.estadoPes,
                    tb_pesadas.estadoWebPes,
                    tb_pesadas.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pesadas
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas.codigoCli
            INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas.idEspecie
            AND fechaRegistroPes BETWEEN ? AND ? ORDER BY fechaRegistroPes DESC, idPesada ASC', [$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}