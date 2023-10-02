<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Precios\ActualizarPreciosXPresentacion;

class PreciosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('precios');
        }
        return redirect('/login');
    }

    public function consulta_TraerPreciosXPresentacion(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_precio_x_presentacion.idPrecio, 
                   tb_precio_x_presentacion.codigoCli, 
                   tb_precio_x_presentacion.primerEspecie,
                   tb_precio_x_presentacion.segundaEspecie,
                   tb_precio_x_presentacion.terceraEspecie,
                   tb_precio_x_presentacion.cuartaEspecie,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_precio_x_presentacion
            JOIN tb_clientes ON tb_clientes.codigoCli = tb_precio_x_presentacion.codigoCli WHERE tb_clientes.idEstadoCli != 3');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
