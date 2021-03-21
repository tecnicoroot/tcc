<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtendimentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atendimentos', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_agendamento');
            $table->foreign('id_agendamento')->references('id')->on('agendamentos')->onDelete('cascade');
            $table->dateTime('data_hora_chegada_paciente', 0);
            $table->dateTime('data_hora_inicio_procedimento', 0);
            $table->dateTime('data_hora_fim_procedimento', 0);
            $table->softDeletes();
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
