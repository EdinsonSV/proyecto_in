<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ConsultarClientes\TraerGruposConsultarClientes;

class ConsultarClientesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('consultar_clientes');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarClientes(){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idCliente,nombreTipoDocumento,numDocumentoCli,
                contactoCli,direccionCli,estadoCliente,
                fechaRegistroCli,horaRegistroCli,usuarioRegistroCli,
                codigoCli,idGrupo,comentarioCli,
                nombreZon,estadoEliminadoCli,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_clientes 
            INNER JOIN tb_zonas on tb_zonas.idZona = tb_clientes.idZona 
            INNER JOIN tb_estados on tb_estados.idEstadoCli = tb_clientes.idEstadoCli
            INNER JOIN tb_tipo_documento on tb_tipo_documento.idTipoDocumento = tb_clientes.tipoDocumentoCli WHERE estadoEliminadoCli = 1 ORDER BY FIELD(tb_zonas.idZona,4,2,3,1),nombreCompleto ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerGruposConsultarClientes()
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerGruposConsultarClientes::select('idGrupo', 'nombreGrupo')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerConsultarClienteEditar(Request $request){

        $codigoCli = $request->input('codigoCli');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idCliente,nombreTipoDocumento,numDocumentoCli,
                contactoCli,direccionCli,estadoCliente,tipoDocumentoCli,
                fechaRegistroCli,horaRegistroCli,usuarioRegistroCli,
                codigoCli,idGrupo,comentarioCli,
                estadoEliminadoCli,idZona,
                IFNULL(CONCAT_WS(" ", nombresUsu, apellidoPaternoUsu, apellidoMaternoUsu), "") AS nombreCompletoUsu,
                nombresCli, apellidoPaternoCli, apellidoMaternoCli
            FROM tb_clientes
            INNER JOIN users on users.id = tb_clientes.usuarioRegistroCli
            INNER JOIN tb_estados on tb_estados.idEstadoCli = tb_clientes.idEstadoCli
            INNER JOIN tb_tipo_documento on tb_tipo_documento.idTipoDocumento = tb_clientes.tipoDocumentoCli
            WHERE codigoCli = ?',[$codigoCli]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
