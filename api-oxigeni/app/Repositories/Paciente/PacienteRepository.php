<?php

declare(strict_types=1);

namespace App\Repositories\Paciente;

use App\Repositories\AbstractRepository;
use App\Models\Paciente;
use DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
 
/**
 * Class PacienteRepository
 * @package App\Repositories\Paciente
 */

 class PacienteRepository extends AbstractRepository
 {
    public function __construct(Paciente $model)
    {
      $this->model =  $model;
    }
    public function pacienteIsRegistered(string $nome, string $dataBorn) : bool
    {
      $results = $this->model->where('nome', 'like', '%'.$nome.'%')
                              ->where('data_nascimento' , '=' , $dataBorn)
                              ->first();
     
      if($results != null){
        return true;
      };

      return false;
    }

    public function verificaExistePacienteAgendamento(string $nome, string $nascimento) : array
    {
      try{
        $result = $this->model::where('nome', 'like', '%'.$nome.'%')->where('data_nascimento', '=', $nascimento )->get();
        //dd($result);
        return $result->toArray() ;
      }catch (ModelNotFoundException $e){
        echo $e->getMessage();
        return false;
      }
      
    }

    public function existePacienteAgendamento(string $nome, string $nascimento) : array
    {
     return db::select("update agendamentos 
     set eh_paciente = 1
     where 1=1
     and (agendamentos.nome like concat('%', '".$nome."', '%'))
     and agendamentos.data_nascimento in (select data_nascimento from pacientes where data_nascimento = '".$nascimento."');"
         );
    
    }
 }
