<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Agenda;

use App\Http\Controllers\AbstractController;
use App\Services\Agendamento\AgendamentoService ;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

    public function findAll(Request $request): JsonResponse
    {
        try {
            $limit = (int) $request->get('limit', 100);
            $orderBy = $request->get('order_by', []);
            $result = $this->service->findAll($limit,$orderBy);
            $searchString = $request->get('q','');

            if(!empty($searchString)){
                $result = $this->service->searchBy(
                    $searchString,
                    $this->searchFFields,
                    $limit,
                    $orderBy
                );
            }
            $response = $this->successResponse($result, Response::HTTP_PARTIAL_CONTENT);
        } catch (Exception $e) {
            $response = $this->errorResponse($e);
        }

        return response()->json($response, $response['status_code']);
    }
    public function findAllDay(Request $request): JsonResponse
    {
        try {
            $limit = (int) $request->get('limit', 100);
            $orderBy = $request->get('order_by', []);
            $result = $this->service->findAllDay($limit,$orderBy);
            $searchString = $request->get('q','');

            if(!empty($searchString)){
                $result = $this->service->searchBy(
                    $searchString,
                    $this->searchFFields,
                    $limit,
                    $orderBy
                );
            }
            $response = $this->successResponse($result, Response::HTTP_PARTIAL_CONTENT);
        } catch (Exception $e) {
            $response = $this->errorResponse($e);
        }

        return response()->json($response, $response['status_code']);
    }
}
