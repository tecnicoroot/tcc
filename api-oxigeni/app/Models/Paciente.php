<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    protected $fillable = [
        'nome',
        'datanascimento',
        'sexo',
        'cpf',
        'identidade',
        'telefone',
        'celular',
        'email',
        'planosaude',
        'numeroplano',
        'endereco',
        'numero','complemento','bairro','cidade','estado','cep'
    ];
}
