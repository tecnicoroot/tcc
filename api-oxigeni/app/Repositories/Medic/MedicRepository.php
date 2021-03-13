<?php

declare(strict_types=1);

namespace App\Repositories\Medic;

use App\Repositories\AbstractRepository;
use App\Models\Medic;

/**
 * Class MedicRepository
 * @package App\Repositories\Medic
 */

 class MedicRepository extends AbstractRepository
 {
    public function __construct(Medic $model)
    {
      $this->model =  $model;
    }
 }
