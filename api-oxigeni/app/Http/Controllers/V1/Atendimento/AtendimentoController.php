<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Atendimento;

use App\Http\Controllers\AbstractController;
use App\Services\Atendimento\AtendimentoService ;

/**
 * Class AtendimentoController
 * @package App\Http\Controllers\V1\Atendimento
 */
class AtendimentoController extends AbstractController
{
    /**
     * @var array|string[]
     */
    protected  array $searchFields = [
       
    ] ;

    /**
     * __construct
     * AtendimentoController constructor
     * @param  AtendimentoService $service
     */
    public function __construct(AtendimentoService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
