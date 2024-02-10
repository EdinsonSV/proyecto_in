<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPedido\AgregarPedido;
use App\Models\AgregarPedido\EliminarPedidoCliente;
use App\Models\AgregarPedido\ActualizarPedidoCliente;


class PedidosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('pedidos');
        }
        return redirect('/login');
    }

    public function consulta_TraerPedidosClientes(Request $request ){

        $fechaBuscarPedidos = $request->input('fechaBuscarPedidos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
            IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto,
            idPedido ,codigoCliPedido, cantidadPrimerEspecie, cantidadSegundaEspecie, cantidadTerceraEspecie,
            cantidadCuartaEspecie, fechaRegistroPedido, comentarioPedido, estadoPedido
            FROM tb_pedidos
            INNER JOIN tb_clientes on tb_clientes.codigoCli = tb_pedidos.codigoCliPedido
            INNER JOIN tb_zonas on tb_zonas.idZona = tb_clientes.idZona  
            WHERE estadoPedido = 1 and fechaRegistroPedido = ?
            ORDER BY FIELD(tb_zonas.idZona,4,2,3,1),nombreCompleto ASC',[$fechaBuscarPedidos]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarPedidoCliente(Request $request){

        $selectedCodigoCliPedidos = $request->input('selectedCodigoCliPedidos');
        $idRegistrarPrimerEspeciePedido = $request->input('idRegistrarPrimerEspeciePedido');
        $idRegistrarSegundaEspeciePedido = $request->input('idRegistrarSegundaEspeciePedido');
        $idRegistrarTerceraEspeciePedido = $request->input('idRegistrarTerceraEspeciePedido');
        $idRegistrarCuartaEspeciePedido = $request->input('idRegistrarCuartaEspeciePedido');
        $comentarioAgregarPedido = $request->input('comentarioAgregarPedido');
        $fechaAgregarPedido = $request->input('fechaAgregarPedido');

        if (Auth::check()) {
            $agregarPedido = new AgregarPedido;
            $agregarPedido->codigoCliPedido = $selectedCodigoCliPedidos;
            $agregarPedido->cantidadPrimerEspecie = $idRegistrarPrimerEspeciePedido === null ? 0 : $idRegistrarPrimerEspeciePedido;
            $agregarPedido->cantidadSegundaEspecie = $idRegistrarSegundaEspeciePedido === null ? 0 : $idRegistrarSegundaEspeciePedido;
            $agregarPedido->cantidadTerceraEspecie = $idRegistrarTerceraEspeciePedido === null ? 0 : $idRegistrarTerceraEspeciePedido;
            $agregarPedido->cantidadCuartaEspecie = $idRegistrarCuartaEspeciePedido === null ? 0 : $idRegistrarCuartaEspeciePedido;
            $agregarPedido->comentarioPedido = $comentarioAgregarPedido;
            $agregarPedido->fechaRegistroPedido = $fechaAgregarPedido;
            $agregarPedido->estadoPedido = 1;
            $agregarPedido->save();

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarPedido(Request $request)
    {
        $codigoPedido = $request->input('codigoPedido');

        if (Auth::check()) {
            $EliminarPedidoCliente = new EliminarPedidoCliente;
            $EliminarPedidoCliente->where('idPedido', $codigoPedido)
                ->update([
                    'estadoPedido' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPedidoCliente(Request $request)
    {
        $idRegistrarPrimerEspeciePedido = $request->input('idRegistrarPrimerEspeciePedido');
        $idRegistrarSegundaEspeciePedido = $request->input('idRegistrarSegundaEspeciePedido');
        $idRegistrarTerceraEspeciePedido = $request->input('idRegistrarTerceraEspeciePedido');
        $idRegistrarCuartaEspeciePedido = $request->input('idRegistrarCuartaEspeciePedido');
        $comentarioAgregarPedido = $request->input('comentarioAgregarPedido');
        $fechaAgregarPedido = $request->input('fechaAgregarPedido');
        $idPedidoCliente = $request->input('idPedidoCliente');

        if (Auth::check()) {
            $ActualizarPedidoCliente = new ActualizarPedidoCliente;
            $ActualizarPedidoCliente = new ActualizarPedidoCliente;
            $ActualizarPedidoCliente->where('idPedido', $idPedidoCliente)
                ->update([
                    'cantidadPrimerEspecie' => $idRegistrarPrimerEspeciePedido,
                    'cantidadSegundaEspecie' => $idRegistrarSegundaEspeciePedido,
                    'cantidadTerceraEspecie' => $idRegistrarTerceraEspeciePedido,
                    'cantidadCuartaEspecie' => $idRegistrarCuartaEspeciePedido,
                    'fechaRegistroPedido' => $fechaAgregarPedido,
                    'comentarioPedido' => $comentarioAgregarPedido,
                ]);
            
            return response()->json(['success' => true], 200);
        }
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
