<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Paciente;

use App\Http\Controllers\AbstractController;
use App\Services\Paciente\PacienteService ;

/**
 * Class Pacienteontroller
 * @package App\Http\Controllers\V1\Paciente
 */
class PacienteController extends AbstractController
{
    /**
     * @var array|string[]
     */
    protected  array $searchFields = [
       'nome',
       'crm'
    ] ;

    /**
     * __construct
     * PacienteController constructor
     * @param  PacienteService $service
     */
    public function __construct(PacienteService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
