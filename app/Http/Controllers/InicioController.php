<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class InicioController extends Controller
{
    public function index(){
        if (Auth::check()){
            return view('welcome');
        }
        return redirect('/login');
    }
}
