<?php

namespace App\Models\ReportePorProveedor;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarGuia extends Model
{
    protected $table = 'tb_guias'; // Nombre de tu tabla
    protected $primaryKey = 'idGuia'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'estadoGuia',
    ];
}
