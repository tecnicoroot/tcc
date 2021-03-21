<?php

declare(strict_types=1);

namespace App\Services\Empresa;

use App\Services\AbstractService;
use App\Repositories\Empresa\EmpresaRepository;
/**
 * Class EmpresaService
 * @package App\Services\Empresa
 */

 class EmpresaService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(EmpresaRepository $repository)
    {
        $this->repository = $repository;
    
    }
}
