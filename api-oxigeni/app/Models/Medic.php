<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medic extends Model
{
    protected $table = 'medicos';
    protected $fillable = [
        'crm','nome','telefone','celular','fax','email',
    ];
}
