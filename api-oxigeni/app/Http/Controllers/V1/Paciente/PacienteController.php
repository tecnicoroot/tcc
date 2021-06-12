<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\Paciente;

use App\Http\Controllers\AbstractController;
use App\Services\Paciente\PacienteService ;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
/**
 * Class Pacienteontroller
 * @package App\Http\Controllers\V1\Paciente
 */
class PacienteController extends AbstractController
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
     * PacienteController constructor
     * @param  PacienteService $service
     */
    public function __construct(PacienteService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }
    public function pacienteIsRegistered(Request $request) : JsonResponse
    {
        try {
        
               
            $result['exist'] = $this->service->pacienteIsRegistered($request->all());
            $response = $this->successResponse($result);
           
        } catch (Exception $e) {
            $response = $this->errorResponse($e);
        }

        return response()->json($response, $response['status_code']);
    }
    
    public function verificaExistePacienteAgendamento(Request $request) : JsonResponse
    {
       
        try {   
            $result = $this->service->verificaExistePacienteAgendamento($request->get('nome'), $request->get('nascimento'));
            $response = $this->successResponse($result);
           
        } catch (Exception $e) {
            $response = $this->errorResponse($e);
        }

        return response()->json($response, $response['status_code']);

    }

    public function existePacienteAgendamento(Request $request) : JsonResponse
    {
       
        try {   
            $result = $this->service->existePacienteAgendamento($request->get('nome'), $request->get('nascimento'));
            $response = $this->successResponse($result);
           
        } catch (Exception $e) {
            $response = $this->errorResponse($e);
        }

        return response()->json($response, $response['status_code']);

    }
}
