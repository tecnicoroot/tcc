<?php

declare(strict_types=1);

namespace App\Repositories\Agendamento;

use App\Repositories\AbstractRepository;
use App\Models\Agendamento;

/**
 * Class AgendamentoRepository
 * @package App\Repositories\Agendamento
 */

 class AgendamentoRepository extends AbstractRepository
 {
    public function __construct(Agendamento $model)
    {
      $this->model =  $model;
    }
 }