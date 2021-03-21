<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Agendamento;

use App\Http\Controllers\AbstractController;
use App\Services\Agendamento\AgendamentoService ;

/**
 * Class AgendamentoController
 * @package App\Http\Controllers\V1\Agendamento
 */
class AgendamentoController extends AbstractController
{
    /**
     * @var array|string[]
     */
    protected  array $searchFields = [
       
    ] ;

    /**
     * __construct
     * AgendamentoController constructor
     * @param  AgendamentoService $service
     */
    public function __construct(AgendamentoService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
