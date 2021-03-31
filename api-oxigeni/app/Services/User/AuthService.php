<?php
namespace App\Services\User;

use App\Repositories\User\AuthRepository;
use Illuminate\Http\Request;
use App\Models\Validations\ValidationUser;
use App\Models\Validations\ValidationUserEdit;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Validations\ValidationAuth;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;
use DB;


class AuthService
{
    /**
    * @var \Tymon\JWTAuth\JWTAuth
    */
    protected $jwt;

    private $authRepository;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AuthRepository $authRepository, JWTAuth $jwt)
    {
        $this->authRepository = $authRepository;
        $this->jwt = $jwt;
    }



    
    public function login(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            ValidationAuth::RULE_AUTH
        );

    if($validator->fails()){

        return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
    }else{
        try {

            //if (! $token = $this->jwt->guard($request->only('email', 'password'))) {
            if (! $token =  $this->jwt->attempt($request->only('email', 'password'))) {
                return response()->json(['user_not_found'], 404);
            }


        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent' => $e->getMessage()], 500);

        }
    }


        return response()->json(compact('token'));
}


    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();

    }


}
