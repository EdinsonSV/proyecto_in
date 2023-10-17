<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

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
            return redirect('/register')->with('success', 'Se registró el usuario correctamente.');
        } catch (\Exception $e) {
            return redirect('/register')->withErrors(['error' => 'Hubo un error al registrar el usuario.']);
        }
    }
}
