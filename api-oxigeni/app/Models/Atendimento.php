<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Atendimento extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'id_paciente',
        'id_camara',
        'id_convenio',
        'id_agendamento',
        'status',
        'data_hora_chegada_paciente',
        'data_hora_inicio_procedimento',
        'data_hora_fim_procedimento'
    ];
}
