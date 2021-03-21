<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Empresa;

use App\Http\Controllers\AbstractController;
use App\Services\Empresa\EmpresaService ;

/**
 * Class EmpresaController
 * @package App\Http\Controllers\V1\Empresa
 */
class EmpresaController extends AbstractController
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
     * EmpresaController constructor
     * @param  EmpresaService $service
     */
    public function __construct(EmpresaService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
