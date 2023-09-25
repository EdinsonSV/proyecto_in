<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ValorConversion\ActualizarValorConversion;

class ValorDeConversionController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('valor_conversion');
        }
        return redirect('/login');
    }

    public function consulta_TraerValorConversion(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT tb_precio_x_presentacion.idPrecio, 
                   tb_precio_x_presentacion.codigoCli, 
                   tb_precio_x_presentacion.valorConversion,
                   CONCAT(tb_clientes.nombresCli, " ", tb_clientes.apellidoPaternoCli, " ", tb_clientes.apellidoMaternoCli) AS nombreCompleto
            FROM tb_precio_x_presentacion
            JOIN tb_clientes ON tb_clientes.codigoCli = tb_precio_x_presentacion.codigoCli
            WHERE tb_clientes.apellidoPaternoCli IS NOT NULL
              AND tb_clientes.apellidoMaternoCli IS NOT NULL
              AND tb_clientes.nombresCli IS NOT NULL
        ');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
