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
            $table->increments('id');
            $table->unsignedInteger('id_paciente');
            $table->foreign('id_paciente')->references('id')->on('pacientes');
            
            $table->unsignedInteger('id_camara');
            $table->foreign('id_camara')->references('id')->on('camaras')->nullable()->default(null);
            
            $table->unsignedInteger('id_convenio');
            $table->foreign('id_convenio')->references('id')->on('convenios');
            
            $table->unsignedInteger('id_agendamento');
            $table->foreign('id_agendamento')->references('id')->on('agendamentos');
            
            $table->enum( 'status',['Aguardando','Em andamento','Finalizado']);
            $table->dateTime('data_hora_chegada_paciente', 0)->nullable()->default(null);
            $table->dateTime('data_hora_inicio_procedimento', 0)->nullable()->default(null);
            $table->dateTime('data_hora_fim_procedimento', 0)->nullable()->default(null);
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
        Schema::dropIfExists('atendimentos');
    }
}
