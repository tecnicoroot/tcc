<?php

declare(strict_types=1);

namespace App\Repositories\Camara;

use App\Repositories\AbstractRepository;
use App\Models\Camara;

/**
 * Class CamaraRepository
 * @package App\Repositories\Camara
 */

 class CamaraRepository extends AbstractRepository
 {
    public function __construct(Camara $model)
    {
      $this->model =  $model;
    }
 }