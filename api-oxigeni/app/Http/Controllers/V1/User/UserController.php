<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1\User;

use App\Http\Controllers\AbstractController;
use App\Services\User\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class UserController
 * @package App\Http\Controllers\V1\User
 */
class UserController extends AbstractController
{
    /**
     * @var array|string[]
     */
    protected array $searchFields = [
        'nome',
        'sobrenome'
    ];
    
    /**
     * __construct
     * AuthorController constructor
     * @param  UserService $service
     */
    public function __construct(UserService $service)
    {
        //$this->service = $service;
        parent::__construct($service);
    }

    public function updatePassword(int $id, Request $request): JsonResponse
    {
        try {
            $result['senha_alterada'] = $this->service->updatePassword($id, $request->all());
            $response = $this->successResponse($result);
        } catch (Exception $e) {
            $response = $this->errorResponse($e);
        }
        return response()->json($response, $response['status_code']);
    }
}



