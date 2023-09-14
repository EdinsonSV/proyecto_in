<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InicioController extends Controller
{
    public function index(){
        if (Auth::check()){
            return view('welcome');
        }
        return redirect('/login');
    }

    public function consultarDatos(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta SQL directamente
            $datos = DB::select("SELECT idEspecie, nombreEspecie FROM tb_especies_venta WHERE idEspecie <= 4");

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
