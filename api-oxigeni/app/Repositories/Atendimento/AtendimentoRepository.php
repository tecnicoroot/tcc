<?php

declare(strict_types=1);

namespace App\Repositories\Atendimento;

use App\Repositories\AbstractRepository;
use App\Models\Atendimento;

/**
 * Class AtendimentoRepository
 * @package App\Repositories\Atendimento
 */

 class AtendimentoRepository extends AbstractRepository
 {
    public function __construct(Atendimento $model)
    {
      $this->model =  $model;
    }
 }