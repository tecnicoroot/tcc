<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CamarasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('camaras')->insert([
            'nome' => 'Camara 1',
            'descricao' => 'ZP-100-MGF',
            'nome_descricao_sem_espaco' =>'Camara1',
            'em_manutencao' => '0',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);

        DB::table('camaras')->insert([
            'nome' => 'Camara 2',
            'descricao' => 'ZP-200-MGF',
            'nome_descricao_sem_espaco' =>'Camara2',
            'em_manutencao' => '0',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);

        DB::table('camaras')->insert([
            'nome' => 'Camara 3',
            'descricao' => 'ZP-300-MGF',
            'nome_descricao_sem_espaco' =>'Camara3',
            'em_manutencao' => '0',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);
    }
}
