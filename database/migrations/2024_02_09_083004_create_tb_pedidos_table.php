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
        Schema::create('tb_pedidos', function (Blueprint $table) {
            $table->id('idPedido');
            $table->integer('codigoCliPedido');
            $table->integer('cantidadPrimerEspecie')->default(0)->nullable();
            $table->integer('cantidadSegundaEspecie')->default(0)->nullable();
            $table->integer('cantidadTerceraEspecie')->default(0)->nullable();
            $table->integer('cantidadCuartaEspecie')->default(0)->nullable();
            $table->date('fechaRegistroPedido');
            $table->string('comentarioPedido', 200)->nullable();
            $table->integer('estadoPedido');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pedidos');
    }
};
