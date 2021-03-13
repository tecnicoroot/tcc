<?php
declare(strict_types=1);

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\AbstractController;
use Illuminate\Http\Request;
use App\Services\User\AuthService;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AuthController
 * @package App\Http\Controllers\V1\Auth
 */
class AuthController extends AbstractController
{

    private $authService;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
        //$this->middleware('auth');
    }

    public function login(Request $request)
    {
        return $this->authService->login($request);
    }
    public function logout()
    {
        return  $this->authService->logout();
    }

    public function me(){
        return "ok";
    }
}
