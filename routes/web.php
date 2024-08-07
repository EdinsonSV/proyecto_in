<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\RegistrarClientesController;
use App\Http\Controllers\ValorDeConversionController;
use App\Http\Controllers\PreciosController;
use App\Http\Controllers\ReniecController;
use App\Http\Controllers\ReportePorClienteController;
use App\Http\Controllers\ReporteDePagosController;
use App\Http\Controllers\ConsultarClientesController;
use App\Http\Controllers\PesadasController;
use App\Http\Controllers\ZonasController;
use App\Http\Controllers\ConsultarUsuariosController;
use App\Http\Controllers\ReportePorProveedorController;
use App\Http\Controllers\ReporteAcumuladoController;
use App\Http\Controllers\AgregarSaldoController;
use App\Http\Controllers\ConfiguracionesController;
use App\Http\Controllers\DeudaMaximaController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\SeguimientoPedidosController;

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

/* ============================== Controladores para Login y Registro de Clientes ============================== */

Route::middleware(['guest'])->group(function () {
    Route::view('/', 'login')->name('login');
    Route::view('/login', 'login')->name('login');
});
Route::post('/login',[LoginController::class,'login']);
Route::get('/logout',[LoginController::class,'logout']);
Route::get('/consultarDNI',[ReniecController::class,'consultarDNI']);

/* ============================== Termina Controladores para Login y Registro de Clientes ============================== */

/* ============================== Controladores para Mostrar Vistas ============================== */

Route::get('/home',[InicioController::class,'index']);
Route::get('/registrar_usuarios',[RegisterController::class,'show']);
Route::get('/registrar_clientes',[RegistrarClientesController::class,'show']);
Route::get('/valor_conversion',[ValorDeConversionController::class,'show']);
Route::get('/precios',[PreciosController::class,'show']);
Route::get('/reporte_por_cliente',[ReportePorClienteController::class,'show']);
Route::get('/reporte_de_pagos',[ReporteDePagosController::class,'show']);
Route::get('/consultar_clientes',[ConsultarClientesController::class,'show']);
Route::get('/pesadas',[PesadasController::class,'show']);
Route::get('/zonas',[ZonasController::class,'show']);
Route::get('/consultar_usuarios',[ConsultarUsuariosController::class,'show']);
Route::get('/reporte_por_proveedor',[ReportePorProveedorController::class,'show']);
Route::get('/reporte_acumulado',[ReporteAcumuladoController::class,'show']);
Route::get('/agregar_saldo',[AgregarSaldoController::class,'show']);
Route::get('/configuraciones',[ConfiguracionesController::class,'show']);
Route::get('/pedidos',[PedidosController::class,'show']);
Route::get('/deuda_maxima',[DeudaMaximaController::class,'show']);
Route::get('/seguimiento_pedidos',[SeguimientoPedidosController::class,'show']);

/* ============================== Termina Controladores para Mostrar Vistas ============================== */

Route::get('/fn_consulta_DatosEspecie', [InicioController::class,'consulta_DatosEspecie']);
Route::get('/fn_consulta_TraerDatosEnTiempoReal', [InicioController::class,'consulta_TraerDatosEnTiempoReal']);
Route::get('/fn_consulta_TraerDatosEnTiempoRealCompra', [InicioController::class,'consulta_TraerDatosEnTiempoRealCompra']);
Route::get('/fn_consulta_TraerDatosDiasAnteriores', [InicioController::class,'consulta_TraerDatosDiasAnteriores']);
Route::get('/fn_consulta_TraerDatosDiasAnterioresCompra', [InicioController::class,'consulta_TraerDatosDiasAnterioresCompra']);

Route::get('/fn_consulta_RolesUsuario', [RegisterController::class,'consulta_RolesUsuario']);
Route::get('/fn_consulta_RegistrarUsuario',[RegisterController::class,'consulta_RegistrarUsuario']);
Route::get('/fn_consulta_RegistrarUsuarioRoles',[RegisterController::class,'consulta_RegistrarUsuarioRoles']);

Route::get('/fn_consulta_TraerGrupos', [RegistrarClientesController::class,'consulta_TraerGrupos']);
Route::get('/fn_consulta_TraerZonas', [RegistrarClientesController::class,'consulta_TraerZonas']);
Route::get('/fn_consulta_TraerDocumentos', [RegistrarClientesController::class,'consulta_TraerDocumentos']);
Route::get('/fn_consulta_TraerCodigoCli', [RegistrarClientesController::class,'consulta_TraerCodigoCli']);
Route::get('/fn_consulta_RegistrarCliente', [RegistrarClientesController::class,'consulta_RegistrarCliente']);

Route::get('/fn_consulta_TraerValorConversion', [ValorDeConversionController::class,'consulta_TraerValorConversion']);
Route::get('/fn_consulta_ActualizarValorConversion', [ValorDeConversionController::class,'consulta_ActualizarValorConversion']);

Route::get('/fn_consulta_TraerPreciosXPresentacion', [PreciosController::class,'consulta_TraerPreciosXPresentacion']);
Route::get('/fn_consulta_ActualizarPrecioXPresentacion', [PreciosController::class,'consulta_ActualizarPrecioXPresentacion']);
Route::get('/fn_consulta_TraerGruposPrecios', [PreciosController::class,'consulta_TraerGruposPrecios']);
Route::get('/fn_consulta_TraerPreciosMinimos', [PreciosController::class,'consulta_TraerPreciosMinimos']);
Route::get('/fn_consulta_ActualizarPrecioMinimo', [PreciosController::class,'consulta_ActualizarPrecioMinimo']);
Route::get('/fn_consulta_AgregarNuevoPrecioPollo', [PreciosController::class,'consulta_AgregarNuevoPrecioPollo']);

Route::get('/fn_consulta_TraerClientesReportePorCliente', [ReportePorClienteController::class,'consulta_TraerClientesReportePorCliente']);
Route::get('/fn_consulta_TraerReportePorCliente', [ReportePorClienteController::class,'consulta_TraerReportePorCliente']);
Route::get('/fn_consulta_ActualizarCantidadReportePorCliente', [ReportePorClienteController::class,'consulta_ActualizarCantidadReportePorCliente']);
Route::get('/fn_consulta_ActualizarPesoReportePorCliente', [ReportePorClienteController::class,'consulta_ActualizarPesoReportePorCliente']);
Route::get('/fn_consulta_EliminarPesada', [ReportePorClienteController::class,'consulta_EliminarPesada']);

Route::get('/fn_consulta_ConsultarClientes', [ConsultarClientesController::class,'consulta_ConsultarClientes']);
Route::get('/fn_consulta_TraerGruposConsultarClientes', [ConsultarClientesController::class,'consulta_TraerGruposConsultarClientes']);
Route::get('/fn_consulta_TraerConsultarClienteEditar', [ConsultarClientesController::class,'consulta_TraerConsultarClienteEditar']);
Route::get('/fn_consulta_ActualizarCliente', [ConsultarClientesController::class,'consulta_ActualizarCliente']);
Route::get('/fn_consulta_EliminarCliente', [ConsultarClientesController::class,'consulta_EliminarCliente']);

Route::get('/fn_consulta_TraerClientesAgregarPagoCliente', [ReporteDePagosController::class,'consulta_TraerClientesAgregarPagoCliente']);
Route::get('/fn_consulta_TraerDeudaTotal', [ReporteDePagosController::class,'consulta_TraerDeudaTotal']);
Route::get('/fn_consulta_TraerClientesAgregarDescuento', [ReporteDePagosController::class,'consulta_TraerClientesAgregarDescuento']);
Route::get('/fn_consulta_TraerClientesCuentaDelCliente', [ReporteDePagosController::class,'consulta_TraerClientesCuentaDelCliente']);
Route::get('/fn_consulta_TraerCuentaDelCliente', [ReporteDePagosController::class,'consulta_TraerCuentaDelCliente']);
Route::get('/fn_consulta_AgregarPagoCliente', [ReporteDePagosController::class,'consulta_AgregarPagoCliente']);
Route::get('/fn_consulta_AgregarDescuentoCliente', [ReporteDePagosController::class,'consulta_AgregarDescuentoCliente']);
Route::get('/fn_consulta_TraerPreciosClienteDescuento', [ReporteDePagosController::class,'consulta_TraerPreciosClienteDescuento']);
Route::get('/fn_consulta_TraerPagosFechas', [ReporteDePagosController::class,'consulta_TraerPagosFechas']);
Route::get('/fn_consulta_EditarPago', [ReporteDePagosController::class,'consulta_EditarPago']);
Route::get('/fn_consulta_ActualizarPagoCliente', [ReporteDePagosController::class,'consulta_ActualizarPagoCliente']);
Route::get('/fn_consulta_EliminarPago', [ReporteDePagosController::class,'consulta_EliminarPago']);
Route::get('/fn_consulta_RegistroDescuentos', [ReporteDePagosController::class,'consulta_RegistroDescuentos']);
Route::get('/fn_consulta_EditarDescuentoCliente', [ReporteDePagosController::class,'consulta_EditarDescuentoCliente']);
Route::get('/fn_consulta_EditarDescuentos', [ReporteDePagosController::class,'consulta_EditarDescuentos']);
Route::get('/fn_consulta_EliminarDescuento', [ReporteDePagosController::class,'consulta_EliminarDescuento']);
Route::get('/fn_consulta_CambiarPrecioPesadas', [ReporteDePagosController::class,'consulta_CambiarPrecioPesadas']);

Route::get('/fn_consulta_ConsultarPesadasDesdeHasta', [PesadasController::class,'consulta_ConsultarPesadasDesdeHasta']);
Route::get('/fn_consulta_TraerClientesCambiarPesadaCliente', [PesadasController::class,'consulta_TraerClientesCambiarPesadaCliente']);
Route::get('/fn_consulta_DatosParaCambioPesada', [PesadasController::class,'consulta_DatosParaCambioPesada']);
Route::get('/fn_consulta_CambiarPesadaCliente', [PesadasController::class,'consulta_CambiarPesadaCliente']);

Route::get('/fn_consulta_ConsultarZonas', [ZonasController::class,'consulta_ConsultarZonas']);
Route::get('/fn_consulta_AgregarZona', [ZonasController::class,'consulta_AgregarZona']);
Route::get('/fn_consulta_EditarZona', [ZonasController::class,'consulta_EditarZona']);
Route::get('/fn_consulta_EliminarZona', [ZonasController::class,'consulta_EliminarZona']);

Route::get('/fn_consulta_ConsultarUsuarios', [ConsultarUsuariosController::class,'consulta_ConsultarUsuarios']);
Route::get('/fn_consulta_ConsultarUsuariosEditar', [ConsultarUsuariosController::class,'consulta_ConsultarUsuariosEditar']);
Route::get('/fn_consulta_ActualizarUsuario', [ConsultarUsuariosController::class,'consulta_ActualizarUsuario']);
Route::get('/fn_consulta_ActualizarUsuarioExtra', [ConsultarUsuariosController::class,'consulta_ActualizarUsuarioExtra']);
Route::get('/fn_consulta_ConsultarRolesUsuariosEditar', [ConsultarUsuariosController::class,'consulta_ConsultarRolesUsuariosEditar']);
Route::get('/fn_consulta_RegistrarUsuarioRolesEditar', [ConsultarUsuariosController::class,'consulta_RegistrarUsuarioRolesEditar']);
Route::get('/fn_consulta_EliminarUsuario', [ConsultarUsuariosController::class,'consulta_EliminarUsuario']);

Route::get('/fn_consulta_ConsultarProveedor', [ReportePorProveedorController::class,'consulta_ConsultarProveedor']);
Route::get('/fn_consulta_DatosProveedor', [ReportePorProveedorController::class,'consulta_DatosProveedor']);
Route::get('/fn_consulta_RegistrarGuia', [ReportePorProveedorController::class,'consulta_RegistrarGuia']);
Route::get('/fn_consulta_EliminarGuia', [ReportePorProveedorController::class,'consulta_EliminarGuia']);
Route::get('/fn_consulta_EditarGuia', [ReportePorProveedorController::class,'consulta_EditarGuia']);
Route::get('/fn_consulta_RegistrarGuiaEditar', [ReportePorProveedorController::class,'consulta_RegistrarGuiaEditar']);
Route::get('/fn_consulta_traerTotalesFechas', [ReportePorProveedorController::class,'consulta_traerTotalesFechas']);

Route::get('/fn_consulta_TraerReporteAcumulado',[ReporteAcumuladoController::class,'consulta_TraerReporteAcumulado']);
Route::get('/fn_consulta_TraerReporteAcumuladoDetalle',[ReporteAcumuladoController::class,'consulta_TraerReporteAcumuladoDetalle']);

Route::get('/fn_consulta_TraerClientesAgregarSaldo',[AgregarSaldoController::class,'consulta_TraerClientesAgregarSaldo']);
Route::get('/fn_consulta_AgregarSaldo',[AgregarSaldoController::class,'consulta_AgregarSaldo']);

Route::get('/fn_consulta_DeudaMaximaClientes',[DeudaMaximaController::class,'consulta_DeudaMaximaClientes']);
Route::get('/fn_consulta_ActualizarDeudaMaxima',[DeudaMaximaController::class,'consulta_ActualizarDeudaMaxima']);

Route::get('/fn_consulta_TraerPedidosClientes',[PedidosController::class,'consulta_TraerPedidosClientes']);
Route::get('/fn_consulta_AgregarPedidoCliente',[PedidosController::class,'consulta_AgregarPedidoCliente']);
Route::get('/fn_consulta_ActualizarPedidoCliente',[PedidosController::class,'consulta_ActualizarPedidoCliente']);
Route::get('/fn_consulta_EliminarPedido',[PedidosController::class,'consulta_EliminarPedido']);
Route::get('/fn_consulta_TraerPedidosAnteriores',[PedidosController::class,'consulta_TraerPedidosAnteriores']);
Route::get('/fn_consulta_VerificarPedido',[PedidosController::class,'consulta_VerificarPedido']);

Route::get('/fn_consulta_TraerPedidosSeguimientoClientes',[SeguimientoPedidosController::class,'consulta_TraerPedidosSeguimientoClientes']);