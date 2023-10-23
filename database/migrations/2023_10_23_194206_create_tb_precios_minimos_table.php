<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_precios_minimos', function (Blueprint $table) {
            $table->id('idPrecioMinimo');
            $table->integer('primerEspecieVivo');
            $table->integer('segundaEspecieVivo');
            $table->integer('terceraEspecieVivo');
            $table->integer('cuartaEspecieVivo');
            $table->integer('primerEspecieBeneficiado');
            $table->integer('segundaEspecieBeneficiado');
            $table->integer('terceraEspecieBeneficiado');
            $table->integer('cuartaEspecieBeneficiado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_precios_minimos');
    }
};
