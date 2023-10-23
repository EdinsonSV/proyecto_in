<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConsultarUsuariosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('consultar_usuarios');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarUsuarios(){
        if (Auth::check()) {

        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}