<?php

declare(strict_types=1);

namespace App\Services\Agendamento;

use App\Services\AbstractService;
use App\Repositories\Agendamento\AgendamentoRepository;
/**
 * Class AgendamentoService
 * @package App\Services\Agendamento
 */

 class AgendamentoService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AgendamentoRepository $repository)
    {
        $this->repository = $repository;
    
    }
}
