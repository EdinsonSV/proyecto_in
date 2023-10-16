<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            INNER JOIN tb_tipo_documento on tb_tipo_documento.idTipoDocumento = tb_clientes.tipoDocumentoCli');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
