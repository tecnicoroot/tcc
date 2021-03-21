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
    $router->put('/v1/user/register/{id}', 'V1\User\UserController@update');
    $router->put('/v1/user/register/password/{id}', 'V1\User\UserController@updatePassword'); 
    $router->get('/v1/user/{id}', "V1\User\UserController@findOneBy");
    $router->delete('/v1/user/destroy/{id}', "V1\User\UserController@delete");

    /**
     * Medico 
     */    

    $router->post('/v1/medic/register', 'V1\Medic\MedicController@create');
    $router->put('/v1/medic/register/{param}', "V1\Medic\MedicController@editBy");
    $router->get('/v1/medic/{id}', "V1\Medic\MedicController@findOneBy");
    $router->delete('/v1/medic/destroy/{id}', "V1\Medic\MedicController@delete");

    /**
     * Convenio 
     */    

    $router->post('/v1/convenio/register', 'V1\Convenio\ConvenioController@create');
    $router->put('/v1/convenio/register/{param}', "V1\Convenio\ConvenioController@editBy");
    $router->get('/v1/convenio/{id}', "V1\Convenio\ConvenioController@findOneBy");
    $router->delete('/v1/convenio/destroy/{id}', "V1\Convenio\ConvenioController@delete");
    /**
     * Paciente 
     */    
    $router->post('/v1/paciente/register', 'V1\Paciente\PacienteController@create');
    $router->put('/v1/paciente/register/{param}', "V1\Paciente\PacienteController@editBy");
    $router->get('/v1/paciente/{id}', "V1\Paciente\PacienteController@findOneBy");
    $router->delete('/v1/paciente/destroy/{id}', "V1\Paciente\PacienteController@delete");

     /**
     * Empresa 
     */    

    $router->post('/v1/empresa/register', 'V1\Empresa\EmpresaController@create');
    $router->put('/v1/empresa/register/{param}', "V1\Empresa\EmpresaController@editBy");
    $router->get('/v1/empresa/{id}', "V1\Empresa\EmpresaController@findOneBy");
    $router->delete('/v1/empresa/destroy/{id}', "V1\Empresa\EmpresaController@delete");

    /**
     * Câmara Hiperbárica
     */
    $router->post('/v1/camara/register', 'V1\Camara\CamaraController@create');
    $router->put('/v1/camara/register/{param}', "V1\Camara\CamaraController@editBy");
    $router->get('/v1/camara/{id}', "V1\Camara\CamaraController@findOneBy");
    $router->delete('/v1/camara/destroy/{id}', "V1\Camara\CamaraController@delete");

     /**
     * Agendamento 
     */    
    $router->post('/v1/agendamento/register', 'V1\Agendamento\AgendamentoController@create');
    $router->put('/v1/agendamento/register/{param}', "V1\Agendamento\AgendamentoController@editBy");
    $router->get('/v1/agendamento/{id}', "V1\Agendamento\AgendamentoController@findOneBy");
    $router->delete('/v1/agendamento/destroy/{id}', "V1\Agendamento\AgendamentoController@delete");
    
    /**
     * Atendimento
     */


});

