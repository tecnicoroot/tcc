<?php

declare(strict_types=1);

namespace App\Repositories\Paciente;

use App\Repositories\AbstractRepository;
use App\Models\Paciente;

/**
 * Class PacienteRepository
 * @package App\Repositories\Paciente
 */

 class PacienteRepository extends AbstractRepository
 {
    public function __construct(Paciente $model)
    {
      $this->model =  $model;
    }
    public function pacienteIsRegistered(string $nome, string $dataBorn) : bool
    {
      $results = $this->model->where('nome', 'like', '%'.$nome.'%')
                              ->where('data_nascimento' , '=' , $dataBorn)
                              ->first();
     
      if($results != null){
        return true;
      };

      return false;
    }
 }
