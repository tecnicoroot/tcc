<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AgendamentosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('agendamentos')->insert([
            "data_hora_marcada" => "2021-06-12 07:00",
            "data_nascimento"=> "2021-05-28",
            "eh_paciente"=> "1",
            "id_convenio"=> 1,
            "nome"=> "Caio Gama dos Santos Silva"
        ]);
    }
}
