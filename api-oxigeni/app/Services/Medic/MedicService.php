<?php

declare(strict_types=1);

namespace App\Services\Medic;

use App\Services\AbstractService;
use App\Repositories\Medic\MedicRepository;
/**
 * Class MedicService
 * @package App\Services\Medic
 */

 class MedicService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(MedicRepository $repository)
    {
        $this->repository = $repository;
    
    }
}
