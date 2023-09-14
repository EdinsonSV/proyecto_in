<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesDeUsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_roles_de_usuario')->insert([
            ['idRol' => 1, 'idUsuario' => 1, 'idMenu' => 0, 'idSubMenu' => 1, 'estadoRol' => 1],
            ['idRol' => 2, 'idUsuario' => 1, 'idMenu' => 1, 'idSubMenu' => 2, 'estadoRol' => 1],
            ['idRol' => 3, 'idUsuario' => 1, 'idMenu' => 1, 'idSubMenu' => 3, 'estadoRol' => 1],
            ['idRol' => 4, 'idUsuario' => 1, 'idMenu' => 1, 'idSubMenu' => 4, 'estadoRol' => 1],
            ['idRol' => 5, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 5, 'estadoRol' => 1],
            ['idRol' => 6, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 6, 'estadoRol' => 1],
            ['idRol' => 7, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 7, 'estadoRol' => 1],
            ['idRol' => 8, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 8, 'estadoRol' => 1],
            ['idRol' => 9, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 9, 'estadoRol' => 1],
            ['idRol' => 10, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 10, 'estadoRol' => 1],
            ['idRol' => 11, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 11, 'estadoRol' => 1],
            ['idRol' => 12, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 12, 'estadoRol' => 1],
            ['idRol' => 13, 'idUsuario' => 1, 'idMenu' => 4, 'idSubMenu' => 13, 'estadoRol' => 1],
            ['idRol' => 14, 'idUsuario' => 1, 'idMenu' => 4, 'idSubMenu' => 14, 'estadoRol' => 1],
            ['idRol' => 15, 'idUsuario' => 1, 'idMenu' => 4, 'idSubMenu' => 15, 'estadoRol' => 1],
        ]);
    }
}
