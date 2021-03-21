<?php
/**
 * Created by PhpStorm.
 * User: suporte
 * Date: 14/08/2017
 * Time: 12:36
 */

namespace App\Models;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Convenio extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'nome','telefone','celular','fax','email',
    ];
}