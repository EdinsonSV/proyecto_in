<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Registrar_clientes\TraerGrupos;
use App\Models\Registrar_clientes\TraerZonas;

class RegistrarClientesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('registrar_clientes');
        }
        return redirect('/login');
    }

    public function consultar_TraerGrupos(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerGrupos::select('idGrupo', 'nombreGrupo')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consultar_TraerZonas(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerZonas::select('idZona', 'nombreZon')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consultar_TraerCodigoCli(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos para obtener el último código diferente de 99999
            $ultimoCodigoCli = TraerCodigoCli::select('codigoCli')
                ->where('codigoCli', '<>', 99999)
                ->orderBy('idCliente', 'desc')
                ->value('codigoCli');

            if ($ultimoCodigoCli !== null) {
                // Devuelve el código encontrado en formato JSON
                return response()->json(['codigoCli' => $ultimoCodigoCli]);
            } else {
                // Si no se encontró ningún código diferente de 99999, devuelve 0
                return response()->json(['codigoCli' => 0]);
            }
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
