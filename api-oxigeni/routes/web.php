<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/



$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/v1/auth/login', 'V1\Auth\AuthController@login');
//$router->post('/v1/user/get', 'V1\User\UserController@create');$//router->post('/v1/medico/reg', 'V1\Medic\MedicController@create');

$router->group(['middleware' => 'auth'], function () use ($router) {

    /**
     * Auth
     */

    $router->post('/v1/auth/logout', 'V1\Auth\AuthController@logout');
    $router->post('/v1/auth/me', 'V1\Auth\AuthController@me');
    $router->post('/v1/auth/refresh', 'V1\Auth\AuthController@refresh');
    $router->post('/v1/auth/token', 'AuthController@respondWithToken');

    /**
     * User
     */

    $router->post('/v1/user/register', 'V1\User\UserController@create');
    //$router->put('/v1/user/register/{id}', 'AuthController@update');
    $router->put('/v1/user/register/password/{id}', 'V1\User\UserController@updatePassword'); 
    $router->get('v1/user/{id}', "V1\User\UserController@findOneBy");
    $router->delete('/v1/user/destroy/{id}', "V1\User\UserController@delete");

    /**
     * Medico 
     */    

    $router->post('/v1/medic/register', 'V1\Medic\MedicController@create');
    $router->get('v1/medic/{id}', "V1\Medic\MedicController@findOneBy");
});

