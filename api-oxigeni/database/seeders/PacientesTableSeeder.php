<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PacientesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pacientes')->insert([
            "nome" => "David Luis da Silva",
            "data_nascimento" => "1983-06-19",
            "sexo" => "Masculino",
            "cpf" => "01425638627",
            "identidade" => "MG12727776",
            "telefone" => "3232343031",
            "celular" => "32987075868",
            "email" => "tecnicoroot@gmail.com",
            "plano_saude" => "1",
            "numero_plano" => "999999999",
            "endereco" =>"Rua Antonio Bento de Vasconcelos",
            "numero" => "185",
            "complemento" => "01",
            "bairro" => "Previdenciários",
            "cidade" => "Juiz de Fora",
            "estado" => "MG",
            "cep" => "36031290",
        ]);

        DB::table('pacientes')->insert([
            "nome" => "Jerusa Gama dos Santos",
            "data_nascimento" => "1992-12-10",
            "sexo" => "Feminino",
            "cpf" => "99999999999",
            "identidade" => "MG12727776",
            "telefone" => "3232343031",
            "celular" => "32987075868",
            "email" => "tecnicoroot@gmail.com",
            "plano_saude" => "1",
            "numero_plano" => "999999999",
            "endereco" =>"Rua Antonio Bento de Vasconcelos",
            "numero" => "185",
            "complemento" => "01",
            "bairro" => "Previdenciários",
            "cidade" => "Juiz de Fora",
            "estado" => "MG",
            "cep" => "36031290",
        ]);

        DB::table('pacientes')->insert([
            "nome" => "Ana Flavia Soares da Silva",
            "data_nascimento" => "2006-03-31",
            "sexo" => "Feminino",
            "cpf" => "88888888888",
            "identidade" => "MG12727776",
            "telefone" => "3232343031",
            "celular" => "32987075868",
            "email" => "tecnicoroot@gmail.com",
            "plano_saude" => "1",
            "numero_plano" => "999999999",
            "endereco" =>"Rua Antonio Bento de Vasconcelos",
            "numero" => "185",
            "complemento" => "01",
            "bairro" => "Previdenciários",
            "cidade" => "Juiz de Fora",
            "estado" => "MG",
            "cep" => "36031290",
        ]);

        DB::table('pacientes')->insert([
            "nome" => "Caio Gama dos Santos Silva",
            "data_nascimento" => "2021-05-28",
            "sexo" => "Masculino",
            "cpf" => "77777777777",
            "identidade" => "MG12727776",
            "telefone" => "3232343031",
            "celular" => "32987075868",
            "email" => "tecnicoroot@gmail.com",
            "plano_saude" => "1",
            "numero_plano" => "999999999",
            "endereco" =>"Rua Antonio Bento de Vasconcelos",
            "numero" => "185",
            "complemento" => "01",
            "bairro" => "Previdenciários",
            "cidade" => "Juiz de Fora",
            "estado" => "MG",
            "cep" => "36031290",
        ]);
    }
}
