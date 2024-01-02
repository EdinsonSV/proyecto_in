<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Pesadas\TraerClientesCambiarPesadaCliente;
use App\Models\Pesadas\CambiarPesadaCliente;

class PesadasController extends Controller
{
    //
    public function show(){
        if (Auth::check()){
            return view('pesadas');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarPesadasDesdeHasta(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_pesadas.idPesada,
                    tb_pesadas.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas.pesoNetoPes,
                    tb_pesadas.horaPes,
                    tb_pesadas.codigoCli,
                    tb_pesadas.fechaRegistroPes,
                    tb_pesadas.cantidadPes,
                    tb_pesadas.precioPes,
                    tb_pesadas.numBalanzaPes,
                    tb_pesadas.numeroJabasPes,
                    tb_pesadas.valorConversion,
                    tb_pesadas.estadoPes,
                    tb_pesadas.estadoWebPes,
                    tb_pesadas.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pesadas
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas.codigoCli
            INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas.idEspecie
            WHERE fechaRegistroPes BETWEEN ? AND ? ORDER BY fechaRegistroPes DESC, idPesada ASC', [$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerClientesCambiarPesadaCliente(Request $request){

        $nombreCambiarPesadaCliente = $request->input('inputCambiarPesadaCliente');
        $fechaCambioDePesada = $request->input('fechaCambioDePesada');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesCambiarPesadaCliente::select('tb_clientes.idCliente', 'tb_clientes.codigoCli', DB::raw('CONCAT_WS(" ", tb_clientes.nombresCli, tb_clientes.apellidoPaternoCli, tb_clientes.apellidoMaternoCli) AS nombreCompleto'))
                ->where('tb_clientes.estadoEliminadoCli','=','1')
                ->where('tb_clientes.idEstadoCli','=','1')
                ->where(function($query) use ($nombreCambiarPesadaCliente) {
                    $query->where('tb_clientes.nombresCli', 'LIKE', "%$nombreCambiarPesadaCliente%")
                        ->orWhere('tb_clientes.apellidoPaternoCli', 'LIKE', "%$nombreCambiarPesadaCliente%")
                        ->orWhere('tb_clientes.apellidoMaternoCli', 'LIKE', "%$nombreCambiarPesadaCliente%");
                })
                ->get();
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_DatosParaCambioPesada(Request $request){

        $codigoCliente = $request->input('codigoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_precio_x_presentacion.codigoCli,
                   primerEspecie, segundaEspecie, terceraEspecie, cuartaEspecie,
                   valorConversionPrimerEspecie,valorConversionSegundaEspecie,
                   valorConversionTerceraEspecie,valorConversionCuartaEspecie
            FROM tb_precio_x_presentacion
            WHERE tb_precio_x_presentacion.codigoCli = ?',[$codigoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_CambiarPesadaCliente(Request $request)
    {
        $codPesadaActual = $request->input('codPesadaActual');
        $codigoCliCambiarPesada = $request->input('codigoCliCambiarPesada');
        $precioCambiarPesada = $request->input('precioCambiarPesada');
        $valorConversionCambiarPesada = $request->input('valorConversionCambiarPesada');

        if (Auth::check()) {
            $CambiarPesadaCliente = new CambiarPesadaCliente;
            $CambiarPesadaCliente->where('idPesada', $codPesadaActual)
                ->update([
                    'codigoCli' => $codigoCliCambiarPesada,
                    'precioPes' => $precioCambiarPesada,
                    'valorConversion' => $valorConversionCambiarPesada,
                    'estadoWebPes' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    
}