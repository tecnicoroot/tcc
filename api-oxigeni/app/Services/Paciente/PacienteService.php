<?php

declare(strict_types=1);

namespace App\Services\Paciente;

use App\Services\AbstractService;
use App\Repositories\Paciente\PacienteRepository;
/**
 * Class PacienteService
 * @package App\Services\Paciente
 */

 class PacienteService extends AbstractService
 {
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PacienteRepository $repository)
    {
        $this->repository = $repository;
    
    }
    public function pacienteIsRegistered(array $data): bool
    {
        $nome = $data["nome"];
        $dataBurn = $data["data_nascimento"];
        return $this->repository->pacienteIsRegistered($nome, $dataBurn);
    }

    public function verificaExistePacienteAgendamento(string $nome, string $nascimento): array
    {
       
        return $this->repository->verificaExistePacienteAgendamento($nome,$nascimento);
    }

    public function existePacienteAgendamento(string $nome, string $nascimento): array
    {
       
        return $this->repository->existePacienteAgendamento($nome,$nascimento);
    }
}
