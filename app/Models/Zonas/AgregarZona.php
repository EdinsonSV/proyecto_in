<?php

namespace App\Models\Zonas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarZona extends Model
{
    use HasFactory;
    protected $table = 'tb_zonas'; // Nombre de tu tabla
    protected $primaryKey = 'idZona'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'nombreZon',
        'estadoZona',
    ];

}
