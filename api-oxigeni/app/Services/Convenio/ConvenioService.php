<?php

declare(strict_types=1);

namespace App\Services\Convenio;

use App\Services\AbstractService;
use App\Repositories\Convenio\ConvenioRepository;
/**
 * Class ConvenioService
 * @package App\Services\Convenio
 */

 class ConvenioService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(ConvenioRepository $repository)
    {
        $this->repository = $repository;
    
    }
}
