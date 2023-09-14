<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inicio extends Model
{
    use HasFactory;
    protected $table = 'tb'; // Nombre de la tabla
    protected $primaryKey = 'idEspecie'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    // Campos que se pueden llenar masivamente (si es necesario)
    protected $fillable = [
        'idEspecie',
        'nombreEspecie',
        // Agrega otros campos aquí si es necesario
    ];
}
