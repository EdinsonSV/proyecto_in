<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ZonasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_zonas')->insert([
            ['idZona' => 1, 'nombreZon' => 'CAAS', 'descripcionZon' => 'CASS'],
            ['idZona' => 2, 'nombreZon' => 'MERCADO DE PIURA', 'descripcionZon' => 'MERCADO DE PIURA'],
            ['idZona' => 3, 'nombreZon' => 'MERCADO DE CASTILLA', 'descripcionZon' => 'MARCADO DE CASTILLA'],
            ['idZona' => 4, 'nombreZon' => 'MERCADO DE CAPULLANAS', 'descripcionZon' => 'MERCADO DE CAPULLANAS'],
        ]);
    }
}
