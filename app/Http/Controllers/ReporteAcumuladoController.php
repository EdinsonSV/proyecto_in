<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ReporteAcumulado\TraerDatosReporteAcumulado;

class ReporteAcumuladoController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_acumulado');
        }
        return redirect('/login');
    }

    public function consulta_TraerReporteAcumulado(Request $request)
    {
        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
        
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerDatosReporteAcumulado::select('idEspecie', 'pesoNetoPes', 'cantidadPes', 'valorConversion', 'idGrupo','fechaRegistroPes')
                ->where('estadoPes', '=', 1)
                ->whereBetween('fechaRegistroPes', [$fechaDesde, $fechaHasta])
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
