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
 }
