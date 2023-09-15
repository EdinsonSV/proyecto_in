<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Home\DatosEspecie;
use App\Models\Home\TraerDatosEnTiempoReal;

class InicioController extends Controller
{
    public function index(){
        if (Auth::check()){
            return view('welcome');
        }
        return redirect('/login');
    }

    public function consultar_DatosEspecie(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DatosEspecie::select('idEspecie', 'nombreEspecie')
                ->where('idEspecie', '<=', 4)
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consultar_TraerDatosEnTiempoReal(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerDatosEnTiempoReal::select('idEspecie', 'pesoNetoPes', 'cantidadPes', 'valorConversion')
                ->where('fechaRegistroPes', '=', now()->toDateString())
                ->where('estadoPes', '=', 1)
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
