<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agendamento extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'nome',
        'data_nascimento',
        'data_hora_marcada',
        'eh_paciente'
    ];
}
