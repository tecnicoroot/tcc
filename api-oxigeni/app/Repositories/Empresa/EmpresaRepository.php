<?php

declare(strict_types=1);

namespace App\Repositories\Empresa;

use App\Repositories\AbstractRepository;
use App\Models\Empresa;

/**
 * Class EmpresaRepository
 * @package App\Repositories\Empresa
 */

 class EmpresaRepository extends AbstractRepository
 {
    public function __construct(Empresa $model)
    {
      $this->model =  $model;
    }
 }
