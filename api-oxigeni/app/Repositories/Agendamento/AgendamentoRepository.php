<?php

declare(strict_types=1);

namespace App\Repositories\Agendamento;

use App\Repositories\AbstractRepository;
use App\Models\Agendamento;

/**
 * Class AgendamentoRepository
 * @package App\Repositories\Agendamento
 */

 class AgendamentoRepository extends AbstractRepository
 {
    public function __construct(Agendamento $model)
    {
      $this->model =  $model;
    }

    public function findAll(int $limit = 100, array $orderBy = [],int $page =1): array
    {
        $results = $this->model::query();
        foreach($orderBy as $key => $value){
            if(strstr($key, '-')){
                $key = substr($key, 1);
            }

            $results->orderBy($key, $value);
        }

        return $results->paginate($limit)->appends([
            'order_by' => implode(',', array_keys($orderBy)),
            'limit' => $limit
        ])->toArray();
    }
    public function findAllDay(int $limit = 100, array $orderBy = [],int $page =1): array
    {
        
        $results = $this->model::query()->whereBetween('data_hora_marcada', 
                                                        [date('Y-m-d 00:00'), date('Y-m-d 00:00', strtotime("+1 day"))]) ;
        foreach($orderBy as $key => $value){
            if(strstr($key, '-')){
                $key = substr($key, 1);
            }
            $results->orderBy($key, $value);
        }

        return $results->paginate($limit)->appends([
            'order_by' => implode(',', array_keys($orderBy)),
            'limit' => $limit
        ])->toArray();
    }
 }