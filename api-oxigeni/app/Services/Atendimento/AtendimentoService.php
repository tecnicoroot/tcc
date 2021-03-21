<?php

declare(strict_types=1);

namespace App\Services\Atendimento;

use App\Services\AbstractService;
use App\Repositories\Atendimento\AtendimentoRepository;
/**
 * Class AtendimentoService
 * @package App\Services\Atendimento
 */

 class AtendimentoService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AtendimentoRepository $repository)
    {
        $this->repository = $repository;
    
    }
}
