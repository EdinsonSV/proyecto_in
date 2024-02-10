<?php

namespace App\Models\AgregarPedido;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarPedido extends Model
{
    use HasFactory;
    protected $table = 'tb_pedidos'; // Nombre de tu tabla
    protected $primaryKey = 'idPedido'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPedido',
        'codigoCliPedido',
        'cantidadPrimerEspecie',
        'cantidadSegundaEspecie',
        'cantidadTerceraEspecie',
        'cantidadCuartaEspecie',
        'fechaRegistroPedido',
        'comentarioPedido',
        'estadoPedido',
    ];

}
