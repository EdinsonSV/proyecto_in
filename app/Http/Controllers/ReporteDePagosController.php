<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;
use App\Models\AgregarPagoCliente\TraerClientesAgregarDescuentoCliente;
use App\Models\AgregarPagoCliente\TraerClientesCuentaDelCliente;

class ReporteDePagosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_de_pagos');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesAgregarPagoCliente(Request $request){

        $nombreAgregarPagoCliente = $request->input('inputAgregarPagoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarPagoCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','!=','3')
                ->where(function($query) use ($nombreAgregarPagoCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreAgregarPagoCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreAgregarPagoCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreAgregarPagoCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDeudaTotal(Request $request){

        $codigoCliente = $request->input('codigoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
                COALESCE(SUM((tp.pesoNetoPes * tp.precioPes) / tp.valorConversion), 0) as deudaTotal,
                COALESCE(SUM(tpg.cantidadAbonoPag), 0) as cantidadPagos
            FROM
                tb_pesadas tp
            LEFT JOIN
                tb_pagos tpg ON tp.codigoCli = tpg.codigoCli
            WHERE
                tp.estadoPes = 1
                AND tp.codigoCli = ?', [$codigoCliente]);

        // Devuelve los datos en formato JSON
        return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerClientesAgregarDescuento(Request $request){

        $nombreReportePorCliente = $request->input('idAgregarDescuento');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarDescuentoCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','!=','3')
                ->where(function($query) use ($nombreReportePorCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreReportePorCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreReportePorCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreReportePorCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerClientesCuentaDelCliente(Request $request){

        $nombreCuentaDelCliente = $request->input('idCuentaDelCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesCuentaDelCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','!=','3')
                ->where(function($query) use ($nombreCuentaDelCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreCuentaDelCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreCuentaDelCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreCuentaDelCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VentaAnterior($codigoCli, $fecha) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('COALESCE(SUM((pesoNetoPes * precioPes) / valorConversion), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }    

    public function consulta_PrimeraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadPrimerEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_SegundaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSegundaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_TerceraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadTerceraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_CuartaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadCuartaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_Descuentos($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_descuentos')
            ->selectRaw('fechaRegistroDesc')
            ->selectRaw('SUM(IF(especieDesc = 1 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(especieDesc = 2 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(especieDesc = 3 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(especieDesc = 4 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalDescuentoCuartaEspecie')
            ->selectRaw('SUM(pesoDesc) AS totalPesoDescuento')
            ->selectRaw('SUM(pesoDesc * precioDesc) AS totalVentaDescuento')
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroDesc', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroDesc')
            ->get();
    
        return $consulta;
    }  
    
    public function consulta_PagoAnterior($codigoCli, $fecha) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('codigoCli', $codigoCli)
            ->where('fechaOperacionPag', '<', $fecha)
            ->value('pagoAnterior');
    
        return $consulta;
    }
    
    public function consulta_Pagos($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('fechaOperacionPag')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaOperacionPag', [$fechaInicio, $fechaFin])
            ->groupBy('fechaOperacionPag')
            ->get();
    
        return $consulta;
    }     
    
    public function consulta_TraerCuentaDelCliente(Request $request) {

        $fechaInicio = $request->input('fechaDesde');
        $fechaFin = $request->input('fechaHasta');
        $codigoCli = $request->input('codigoCliente');

        if (Auth::check()) {
    
            $datos = [
                'totalesPrimerEspecie' => $this->consulta_PrimeraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesSegundaEspecie' => $this->consulta_SegundaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesTerceraEspecie' => $this->consulta_TerceraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesCuartaEspecie' => $this->consulta_CuartaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalDescuentos' => $this->consulta_Descuentos($codigoCli, $fechaInicio, $fechaFin),
                'totalPagos' => $this->consulta_Pagos($codigoCli, $fechaInicio, $fechaFin),
                'ventaAnterior' => $this->consulta_VentaAnterior($codigoCli, $fechaInicio),
                'pagoAnterior' => $this->consulta_PagoAnterior($codigoCli, $fechaInicio),
            ];
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
