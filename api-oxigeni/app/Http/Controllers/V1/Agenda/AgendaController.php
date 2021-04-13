<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Agenda;

use App\Http\Controllers\AbstractController;
use App\Services\Agendamento\AgendamentoService ;

/**
 * Class AgendaController
 * @package App\Http\Controllers\V1\Agenda
 */
class AgendaController extends AbstractController
{
    /**
     * @var array|string[]
     */
    protected  array $searchFields = [
       
    ] ;

    /**
     * __construct
     * AgendaController constructor
     * @param  AgendamentoService $service
     */
    public function __construct(AgendamentoService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
