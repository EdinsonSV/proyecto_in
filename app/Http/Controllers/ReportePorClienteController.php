<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ReportePorCliente\TraerClientesReportePorCliente;
use App\Models\ReportePorCliente\CantidadReportePorCliente;
use App\Models\ReportePorCliente\PesoReportePorCliente;
use Illuminate\Support\Facades\DB;

class ReportePorClienteController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_por_cliente');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesReportePorCliente(Request $request){

        $nombreReportePorCliente = $request->input('idClientePorReporte');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesReportePorCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
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

    public function consulta_TraerReportePorCliente(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
        $codigoCliente = $request->input('codigoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select tb_procesos.idProceso, 
                    fechaRegistroPes, 
                    nombreEspecie, pesoNetoPes, cantidadPes, observacionPes, 
                    horaPes,valorConversion, tb_pesadas.idPesada
                    from tb_procesos 
                    inner join tb_pesadas on tb_procesos.idProceso = tb_pesadas.idProceso
                    inner join tb_especies_venta on tb_especies_venta.idEspecie = tb_pesadas.idEspecie
                    WHERE estadoPes = 1 and 
                    fechaRegistroPes BETWEEN ? and ? and tb_pesadas.codigoCli = ?
                    ORDER BY fechaRegistroPes, idPesada ASC', [$fechaDesde, $fechaHasta, $codigoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarCantidadReportePorCliente(Request $request)
    {
        $idCodigoPesada = $request->input('idCodigoPesada');
        $nuevoCantidadReportePorCliente = $request->input('nuevoCantidadReportePorCliente');

        if (Auth::check()) {
            $CantidadReportePorCliente = new CantidadReportePorCliente;
            $CantidadReportePorCliente->where('idPesada', $idCodigoPesada)
                ->update([
                    'cantidadPes' => $nuevoCantidadReportePorCliente,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPesoReportePorCliente(Request $request)
    {
        $idCodigoPesada = $request->input('idCodigoPesada');
        $nuevoPesoReportePorCliente = $request->input('nuevoPesoReportePorCliente');

        if (Auth::check()) {
            $CantidadReportePorCliente = new PesoReportePorCliente;
            $CantidadReportePorCliente->where('idPesada', $idCodigoPesada)
                ->update([
                    'pesoNetoPes' => $nuevoPesoReportePorCliente,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
