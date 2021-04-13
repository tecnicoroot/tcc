<?php

namespace App\Models;
//use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa extends Model
{
    use SoftDeletes;
    //use Notifiable;
    protected $fillable = [
        'razao_social','nome_fantasia','cnpj','ie','telefone','fax',
        'email','endereco','numero','complemento','bairro','cidade',
        'estado','cep','status','contato'
    ];


}
