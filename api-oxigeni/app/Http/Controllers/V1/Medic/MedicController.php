<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Medic;

use App\Http\Controllers\AbstractController;
use App\Services\Medic\MedicService ;

/**
 * Class MedicController
 * @package App\Http\Controllers\V1\Medic
 */
class MedicController extends AbstractController
{
    /**
     * @var array|string[]
     */
   // protected  $searchFields = [
    //    'nome',
    //    'crm'
    //];

    /**
     * __construct
     * MedicController constructor
     * @param  MedicService $service
     */
    public function __construct(MedicService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
}
