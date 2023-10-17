<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('register');
        }
        return redirect('/login');
    }

    public function register(RegisterRequest $request){
        try {
            $user = User::create($request->validated());
            return response()->json(['success' => 'Se registró el usuario correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al registrar el usuario.'], 500);
        }
    }

    public function consulta_RolesUsuario(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select idSubMenu,idMenu,nombreSubMenu,idNombreSubMenu,hrefSubMenu,iconHtml,estadoSubMenu FROM tb_submenus');
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}