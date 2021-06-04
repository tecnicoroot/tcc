<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Camara;

use App\Http\Controllers\AbstractController;
use App\Services\Camara\CamaraService ;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class CamaraController
 * @package App\Http\Controllers\V1\Camara
 */
class CamaraController extends AbstractController
{
    /**
     * @var array|string[]
     */
    protected  array $searchFields = [
       'nome',
       'descricao'
    ] ;

    /**
     * __construct
     * CamaraController constructor
     * @param  CamaraService $service
     */
    public function __construct(CamaraService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }

    public function trimString(int $id) : string
    {
        //dd($id);
        return $this->service->trimString($id);
    }
}
