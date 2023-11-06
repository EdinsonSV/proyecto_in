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
        Schema::create('tb_pesadas', function (Blueprint $table) {
            $table->id('idPesada');
            $table->integer('idProceso');
            $table->integer('idEspecie');
            $table->decimal('pesoNetoPes', 8, 2)->nullable();
            $table->time('horaPes');
            $table->integer('codigoCli');
            $table->date('fechaRegistroPes')->default(now());
            $table->integer('cantidadPes');
            $table->decimal('precioPes', 8, 2);
            $table->integer('numBalanzaPes');
            $table->integer('numeroJabasPes')->default(0);
            $table->decimal('valorConversion', 8, 3);
            $table->integer('estadoPes')->default(1);
            $table->integer('estadoWebPes')->default(0);
            $table->string('observacionPes', 500)->nullable();
            $table->integer('idGrupo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pesadas');
    }
};
