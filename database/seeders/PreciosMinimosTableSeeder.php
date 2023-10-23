<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PreciosMinimosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_precios_minimos')->insert([
            'primerEspecieVivo' => 5,
            'segundaEspecieVivo' => 5,
            'terceraEspecieVivo' => 5,
            'cuartaEspecieVivo' => 5,
            'primerEspecieBeneficiado' => 5,
            'segundaEspecieBeneficiado' => 5,
            'terceraEspecieBeneficiado' => 5,
            'cuartaEspecieBeneficiado' => 5,
        ]);
    }
}
