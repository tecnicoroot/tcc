<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medic extends Model
{
    use SoftDeletes;
    protected $table = 'medicos';
    protected $fillable = [
        'crm','nome','telefone','celular','fax','email',
    ];
}
