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
            'nome' => 'ZP-100-MGF',
            'descricao' => 'Camara 1',
            'nome_descricao_sem_espaco' =>'ZP-100-MGF',
            'em_manutencao' => '0',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);

        DB::table('camaras')->insert([
            'nome' => 'ZP-200-MGF',
            'descricao' => 'Camara 2',
            'nome_descricao_sem_espaco' =>'ZP-100-MGF',
            'em_manutencao' => '0',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);
    }
}
