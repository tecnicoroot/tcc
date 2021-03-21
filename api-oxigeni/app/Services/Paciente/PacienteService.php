<?php

declare(strict_types=1);

namespace App\Services\Paciente;

use App\Services\AbstractService;
use App\Repositories\Paciente\PacienteRepository;
/**
 * Class PacienteService
 * @package App\Services\Paciente
 */

 class PacienteService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PacienteRepository $repository)
    {
        $this->repository = $repository;
    
    }
}
