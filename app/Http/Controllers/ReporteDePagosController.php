<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;
use App\Models\AgregarPagoCliente\TraerClientesAgregarDescuentoCliente;
use App\Models\AgregarPagoCliente\TraerClientesCuentaDelCliente;
use App\Models\AgregarPagoCliente\AgregarPagoCliente;
use App\Models\AgregarPagoCliente\AgregarDescuentoCliente;

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
                ->where('idEstadoCli','=','1')
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
            SELECT COALESCE((SELECT SUM(tp.pesoNetoPes * tp.precioPes / tp.valorConversion) 
                            FROM tb_pesadas tp 
                            WHERE tp.estadoPes = 1 AND tp.codigoCli = ?), 0) as deudaTotal,
                COALESCE((SELECT SUM(tpg.cantidadAbonoPag) 
                            FROM tb_pagos tpg 
                            WHERE tpg.codigoCli = ? AND estadoPago = 1), 0) as cantidadPagos,
                COALESCE((SELECT SUM(td.pesoDesc * td.precioDesc) 
                            FROM tb_descuentos td 
                            WHERE td.codigoCli = ? AND estadoDescuento = 1), 0) as ventaDescuentos;
            ', [$codigoCliente,$codigoCliente,$codigoCliente]);

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
                ->where('estadoEliminadoCli','=',1)
                ->where('idEstadoCli','=',1)
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
                ->where('estadoEliminadoCli','=',1)
                ->where('idEstadoCli','=',1)
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
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaDescuentoPrimerEspecie')
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
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaDescuentoSegundaEspecie')
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
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaDescuentoTerceraEspecie')
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
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, pesoNetoPes / valorConversion, 0)) AS totalPesoDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, (pesoNetoPes / valorConversion) * precioPes, 0)) AS totalVentaDescuentoCuartaEspecie')
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
            ->selectRaw('SUM(IF(especieDesc = 1 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalPesoDescuentoCuartaEspeciePrimerEspecie')
            ->selectRaw('SUM(IF(especieDesc = 2 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalPesoDescuentoCuartaEspecieSegundaEspecie')
            ->selectRaw('SUM(IF(especieDesc = 3 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalPesoDescuentoCuartaEspecieTerceraEspecie')
            ->selectRaw('SUM(IF(especieDesc = 4 AND pesoDesc < 0.0, pesoDesc, 0)) AS totalPesoDescuentoCuartaEspecieCuartaEspecie')
            ->selectRaw('SUM(pesoDesc) AS totalPesoDescuento')
            ->selectRaw('SUM(pesoDesc * precioDesc) AS totalVentaDescuento')
            ->where('codigoCli', $codigoCli)
            ->where('estadoDescuento', '=',1)
            ->whereBetween('fechaRegistroDesc', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroDesc')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_DescuentosAnteriores($codigoCli, $fecha) {
        $consulta = DB::table('tb_descuentos')
            ->selectRaw('COALESCE(SUM(pesoDesc * precioDesc), 0) AS totalVentaDescuentoAnteriores')
            ->where('codigoCli', $codigoCli)
            ->where('estadoDescuento', '=',1)
            ->where('fechaRegistroDesc', '<', $fecha)
            ->value('totalVentaDescuentoAnteriores');
    
        return $consulta;
    }  
    
    public function consulta_PagoAnterior($codigoCli, $fecha) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('codigoCli', $codigoCli)
            ->where('estadoPago', '=', 1)
            ->where('fechaOperacionPag', '<', $fecha)
            ->value('pagoAnterior');
    
        return $consulta;
    }
    
    public function consulta_Pagos($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('fechaOperacionPag')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('codigoCli', $codigoCli)
            ->where('estadoPago', '=', 1)
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
                'totalVentaDescuentoAnterior' => $this->consulta_DescuentosAnteriores($codigoCli, $fechaInicio),
            ];
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarPagoCliente(Request $request){

        $codigoCliente = $request->input('codigoCliente');
        $montoAgregarPagoCliente = $request->input('montoAgregarPagoCliente');
        $fechaAgregarPagoCliente = $request->input('fechaAgregarPagoCliente');
        $formaDePago = $request->input('formaDePago');
        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');
        $comentarioAgregarPagoCliente = $request->input('comentarioAgregarPagoCliente');

        if (Auth::check()) {
            $agregarPagoCliente = new AgregarPagoCliente;
            $agregarPagoCliente->codigoCli = $codigoCliente;
            $agregarPagoCliente->tipoAbonoPag = $formaDePago;
            $agregarPagoCliente->cantidadAbonoPag = $montoAgregarPagoCliente;
            $agregarPagoCliente->fechaOperacionPag = $fechaAgregarPagoCliente;
            $agregarPagoCliente->codigoTransferenciaPag = $codAgregarPagoCliente;
            $agregarPagoCliente->observacion = $comentarioAgregarPagoCliente;
            $agregarPagoCliente->fechaRegistroPag = now()->toDateString();
            $agregarPagoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarDescuentoCliente(Request $request){

        $codigoCliente = $request->input('codigoCliente');
        $pesoAgregarDescuentoCliente = $request->input('pesoAgregarDescuentoCliente');
        $especieAgregarDescuentoCliente = $request->input('especieAgregarDescuentoCliente');
        $fechaAgregarDescuentoCliente = $request->input('fechaAgregarDescuentoCliente');
        $precioAgregarDescuentoCliente = $request->input('precioAgregarDescuentoCliente');

        if (Auth::check()) {
            $agregarDescuentoCliente = new AgregarDescuentoCliente;
            $agregarDescuentoCliente->codigoCli = $codigoCliente;
            $agregarDescuentoCliente->fechaRegistroDesc = $fechaAgregarDescuentoCliente;
            $agregarDescuentoCliente->especieDesc = $especieAgregarDescuentoCliente;
            $agregarDescuentoCliente->pesoDesc = $pesoAgregarDescuentoCliente;
            $agregarDescuentoCliente->precioDesc = $precioAgregarDescuentoCliente;
            $agregarDescuentoCliente->cantidadDesc = 0;
            $agregarDescuentoCliente->fechaRegistroDescuento = now()->toDateString();
            $agregarDescuentoCliente->horaRegistroDesc = now()->toTimeString();
            $agregarDescuentoCliente->estadoDescuento = 1;
            $agregarDescuentoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPreciosClienteDescuento(Request $request){

        $codigoCliente = $request->input('codigoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT idPrecio, 
                codigoCli, 
                primerEspecie,
                segundaEspecie,
                terceraEspecie,
                cuartaEspecie
            FROM tb_precio_x_presentacion
            WHERE codigoCli = ? ',[$codigoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosFechas(Request $request){

        $fechaDesde = $request->input('fechaDesdeTraerPagos');
        $fechaHasta = $request->input('fechaHastaTraerPagos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_pagos.idPagos, 
                    tb_pagos.cantidadAbonoPag,
                    tb_pagos.tipoAbonoPag,
                    tb_pagos.fechaOperacionPag,
                    tb_pagos.codigoTransferenciaPag,
                    tb_pagos.observacion,
                    tb_pagos.fechaRegistroPag,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pagos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
            WHERE tb_pagos.estadoPago = 1 and fechaRegistroPag BETWEEN ? AND ?', [$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
