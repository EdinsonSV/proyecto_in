<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ZonasController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('zonas');
        }
        return redirect('/login');
    }
    
    public function consulta_ConsultarZonas(){
        if (Auth::check()) {
            $datos = DB::select('
            SELECT idZona,
            nombreZon,
            descripcionZon,
            (SELECT COUNT(idZona) FROM tb_clientes WHERE tb_clientes.idZona = tb_zonas.idZona) as cantidadClientesZona FROM tb_zonas');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}