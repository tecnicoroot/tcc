<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Camara extends Model
{

    use SoftDeletes;
    protected $fillable = [
        'nome',
        'descricao',
        'em_manutencao',
    ];
}
