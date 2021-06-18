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
    $router->put('/v1/user/register/{param}', 'V1\User\UserController@editBy');
    $router->put('/v1/user/register/password/{id}', 'V1\User\UserController@updatePassword'); 
    $router->get('/v1/user/{id}', "V1\User\UserController@findOneBy");
    $router->delete('/v1/user/destroy/{id}', "V1\User\UserController@delete");

    $router->get('/v1/user/', "V1\User\UserController@findAll");
    $router->post('/v1/usuario/search', "V1\User\UserController@searchBy");

    /**0
     * Medico 
     */    

    $router->post('/v1/medic/register', 'V1\Medic\MedicController@create');
    $router->put('/v1/medic/register/{param}', "V1\Medic\MedicController@editBy");
    $router->get('/v1/medic/{id}', "V1\Medic\MedicController@findOneBy");
    $router->delete('/v1/medic/destroy/{id}', "V1\Medic\MedicController@delete");
    $router->get('/v1/medic/', "V1\Medic\MedicController@findAll");
    $router->post('/v1/medics/search', "V1\Medic\MedicController@searchBy");

    /**
     * Convenio 
     */    

    $router->post('/v1/convenio/register', 'V1\Convenio\ConvenioController@create');
    $router->put('/v1/convenio/register/{param}', "V1\Convenio\ConvenioController@editBy");
    $router->get('/v1/convenio/{id}', "V1\Convenio\ConvenioController@findOneBy");
    $router->delete('/v1/convenio/destroy/{id}', "V1\Convenio\ConvenioController@delete");
    $router->get('/v1/convenio/', "V1\Convenio\ConvenioController@findAll");
    $router->post('/v1/convenio/search', "V1\Convenio\ConvenioController@searchBy");
    /**
     * Paciente 
     */    
    $router->post('/v1/paciente/register', 'V1\Paciente\PacienteController@create');
    $router->put('/v1/paciente/register/{param}', "V1\Paciente\PacienteController@editBy");
    $router->get('/v1/paciente/{id}', "V1\Paciente\PacienteController@findOneBy");
    $router->delete('/v1/paciente/destroy/{id}', "V1\Paciente\PacienteController@delete");
    $router->get('/v1/paciente/', "V1\Paciente\PacienteController@findAll");
    $router->post('/v1/paciente/search', "V1\Paciente\PacienteController@searchBy");
    $router->post('/v1/paciente/pacineteIsRegistered', "V1\Paciente\PacienteController@pacienteIsRegistered");
    $router->post('/v1/paciente/verificaExistePacienteAgendamento', "V1\Paciente\PacienteController@verificaExistePacienteAgendamento");
    $router->post('/v1/paciente/existePacienteAgendamento', "V1\Paciente\PacienteController@existePacienteAgendamento");
     /**
     * Empresa 
     */    

    $router->post('/v1/empresa/register', 'V1\Empresa\EmpresaController@create');
    $router->put('/v1/empresa/register/{param}', "V1\Empresa\EmpresaController@editBy");
    $router->get('/v1/empresa/{id}', "V1\Empresa\EmpresaController@findOneBy");
    $router->delete('/v1/empresa/destroy/{id}', "V1\Empresa\EmpresaController@delete");
    $router->get('/v1/empresa/', "V1\Empresa\EmpresaController@findAll");
    $router->post('/v1/empresas/search', "V1\Empresa\EmpresaController@searchBy");

    /**
     * Câmara Hiperbárica
     */
    $router->post('/v1/camara/register', 'V1\Camara\CamaraController@create');
    $router->put('/v1/camara/register/{param}', "V1\Camara\CamaraController@editBy");
    $router->get('/v1/camara/{id}', "V1\Camara\CamaraController@findOneBy");
    $router->delete('/v1/camara/destroy/{id}', "V1\Camara\CamaraController@delete");
    $router->get('/v1/camara/', "V1\Camara\CamaraController@findAll");
    $router->post('/v1/camaras/search', "V1\Camara\CamaraController@searchBy");
    //$router->get('/v1/camara/semespaco/{id}', "V1\Camara\CamaraController@trimString");

     /**
     * Agenda 
     */    
    $router->post('/v1/agenda/register', 'V1\Agenda\AgendaController@create');
    $router->put('/v1/agenda/register/{param}', "V1\Agenda\AgendaController@editBy");
    $router->get('/v1/agenda/{id}', "V1\Agenda\AgendaController@findOneBy");
    $router->delete('/v1/agenda/destroy/{id}', "V1\Agenda\AgendaController@delete");
    $router->get('/v1/agenda/', "V1\Agenda\AgendaController@findAll");
    $router->post('/v1/agendas/search', "V1\Agenda\AgendaController@searchBy");
    $router->get('/v1/agendadia/', "V1\Agenda\AgendaController@findAllDay");
    /**
     * Atendimento
     */
    $router->post('/v1/atendimento/register', 'V1\Atendimento\AtendimentoController@create');
    $router->put('/v1/atendimento/register/{param}', "V1\Atendimento\AtendimentoController@editBy");
    $router->get('/v1/atendimento/{id}', "V1\Atendimento\AtendimentoController@findOneBy");
    $router->get('/v1/atendimento/', "V1\Atendimento\AtendimentoController@findAll");
    $router->delete('/v1/atendimento/destroy/{id}', "V1\Atendimento\AtendimentoController@delete");

});

