<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;
use App\Models\AgregarPagoCliente\TraerClientesAgregarDescuentoCliente;

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
}
