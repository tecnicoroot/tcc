<?php

declare(strict_types=1);

namespace App\Repositories\Convenio;

use App\Repositories\AbstractRepository;
use App\Models\Convenio;

/**
 * Class ConvenioRepository
 * @package App\Repositories\Convenio
 */

 class ConvenioRepository extends AbstractRepository
 {
    public function __construct(Convenio $model)
    {
      $this->model =  $model;
    }
 }