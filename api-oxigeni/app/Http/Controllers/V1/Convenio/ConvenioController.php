<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Convenio;

use App\Http\Controllers\AbstractController;
use App\Services\Convenio\ConvenioService ;

/**
 * Class Convenioontroller
 * @package App\Http\Controllers\V1\Convenio
 */
class ConvenioController extends AbstractController
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
     * MedicController constructor
     * @param  ConvenioService $service
     */
    public function __construct(ConvenioService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
