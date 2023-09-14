<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_menus')->insert([
            ['idMenu' => 1, 'nombreMenu' => 'CLIENTES'],
            ['idMenu' => 2, 'nombreMenu' => 'REPORTES'],
            ['idMenu' => 3, 'nombreMenu' => 'CONTABILIDAD'],
            ['idMenu' => 4, 'nombreMenu' => 'SISTEMA Y BALANZA'],
        ]);
    }
}
