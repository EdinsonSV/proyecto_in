<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\InicioController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::middleware(['guest'])->group(function () {
    Route::view('/', 'login')->name('login');
    Route::view('/login', 'login')->name('login');
});

Route::get('/home',[InicioController::class,'index']);

Route::get('/register',[RegisterController::class,'show']);
Route::post('/register',[RegisterController::class,'register']);
Route::post('/login',[LoginController::class,'login']);
Route::get('/logout',[LoginController::class,'logout']);