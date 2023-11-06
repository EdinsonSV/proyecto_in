<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Zonas\AgregarZona;

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
            (SELECT COUNT(idZona) FROM tb_clientes WHERE tb_clientes.idZona = tb_zonas.idZona) as cantidadClientesZona 
            FROM tb_zonas WHERE estadoZona = 1');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarZona(Request $request){

        $nombreAgregarZona = $request->input('nombreAgregarZona');

        if (Auth::check()) {
            $agregarZona = new AgregarZona;
            $agregarZona->nombreZon = $nombreAgregarZona;
            $agregarZona->estadoZona = 1;
            $agregarZona->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }



}