<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paciente extends Model
{

    use SoftDeletes;
    protected $fillable = [
        'nome',
        'data_nascimento',
        'sexo',
        'cpf',
        'identidade',
        'telefone',
        'celular',
        'email',
        'plano_saude',
        'numero_plano',
        'endereco',
        'numero','complemento','bairro','cidade','estado','cep'
    ];
}
