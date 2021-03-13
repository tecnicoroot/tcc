<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgendamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agendamentos', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_paciente');
            $table->foreign('id_paciente')->references('id')->on('pacientes')->onDelete('cascade');
            $table->unsignedInteger('id_convenio');
            $table->foreign('id_convenio')->references('id')->on('convenios')->onDelete('cascade');
            $table->dateTime('data_hora_marcada', 0);
            $table->dateTime('data_hora_chegada_paciente', 0);
            $table->dateTime('data_hora_inicio_procedimento', 0);
            $table->dateTime('data_hora_fim_procedimento', 0);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agendamentos');
    }
}
