<?php

declare(strict_types=1);

namespace App\Services\Camara;

use App\Services\AbstractService;
use App\Repositories\Camara\CamaraRepository;
/**
 * Class CamaraService
 * @package App\Services\Camara
 */

 class CamaraService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(CamaraRepository $repository)
    {
        $this->repository = $repository;
    
    }

    public function trimString(int $id) : string
    {
        
        $result = $this->repository->findOneBy($id);

        dd(str_replace(' ', '',$result['nome']));
        return $result;

    }
}
