<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportePorProveedorController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_por_proveedor');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarProveedor(){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select tb_guias.idGuia, 
                    tb_guias.numGuia,
                    tb_especies_venta.nombreEspecie,
                    tb_guias.pesoGuia,
                    tb_guias.cantidadGuia,
                    tb_guias.precioGuia,
                    tb_guias.fechaGuia,
                    tb_guias.idProveedor,
                    tb_guias.idEspecie
                    from tb_guias
                    JOIN tb_especies_venta ON tb_guias.idEspecie = tb_especies_venta.idEspecie');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}