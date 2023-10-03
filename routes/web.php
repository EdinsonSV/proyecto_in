<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\RegistrarClientesController;
use App\Http\Controllers\ValorDeConversionController;
use App\Http\Controllers\PreciosController;
use App\Http\Controllers\ReniecController;
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

Route::post('/register',[RegisterController::class,'register']);

Route::post('/login',[LoginController::class,'login']);
Route::get('/logout',[LoginController::class,'logout']);
Route::get('/consultarDNI',[ReniecController::class,'consultarDNI']);

Route::get('/home',[InicioController::class,'index']);
Route::get('/register',[RegisterController::class,'show']);
Route::get('/registrar_clientes',[RegistrarClientesController::class,'show']);
Route::get('/valor_conversion',[ValorDeConversionController::class,'show']);
Route::get('/precios',[PreciosController::class,'show']);

Route::get('/fn_consulta_DatosEspecie', [InicioController::class,'consulta_DatosEspecie']);
Route::get('/fn_consulta_TraerDatosEnTiempoReal', [InicioController::class,'consulta_TraerDatosEnTiempoReal']);

Route::get('/fn_consulta_TraerGrupos', [RegistrarClientesController::class,'consulta_TraerGrupos']);
Route::get('/fn_consulta_TraerZonas', [RegistrarClientesController::class,'consulta_TraerZonas']);
Route::get('/fn_consulta_TraerDocumentos', [RegistrarClientesController::class,'consulta_TraerDocumentos']);
Route::get('/fn_consulta_TraerCodigoCli', [RegistrarClientesController::class,'consulta_TraerCodigoCli']);
Route::get('/fn_consulta_RegistrarCliente', [RegistrarClientesController::class,'consulta_RegistrarCliente']);

Route::get('/fn_consulta_TraerValorConversion', [ValorDeConversionController::class,'consulta_TraerValorConversion']);
Route::get('/fn_consulta_ActualizarValorConversion', [ValorDeConversionController::class,'consulta_ActualizarValorConversion']);

Route::get('/fn_consulta_TraerPreciosXPresentacion', [PreciosController::class,'consulta_TraerPreciosXPresentacion']);
Route::get('/fn_consulta_ActualizarPrecioXPresentacion', [PreciosController::class,'consulta_ActualizarPrecioXPresentacion']);