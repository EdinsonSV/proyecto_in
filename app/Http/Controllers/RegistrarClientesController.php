<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegistrarClientesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('registrar_clientes');
        }
        return redirect('/login');
    }
}
