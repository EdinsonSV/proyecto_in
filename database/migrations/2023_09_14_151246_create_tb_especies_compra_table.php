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
        Schema::create('tb_especies_compra', function (Blueprint $table) {
            $table->id('idEspecie');
            $table->string('nombreEspecie', 100);
            $table->timestamps(); // Opcional, agrega campos created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_especies_compra');
    }
};
