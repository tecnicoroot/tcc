<?php

namespace App\Models;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use Notifiable;
    protected $fillable = [
        'razaosocial','nomefantasia','cnpj','ie','telefone','fax','email','endereco','numero','complemento','bairro','cidade','estado','cep',
    ];


}
