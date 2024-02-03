<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PedidosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('pedidos');
        }
        return redirect('/login');
    }
}
