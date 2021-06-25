<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ConveniosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('convenios')->insert([
            'nome' => 'Particular',
            'telefone' => '(99)9999-9999',
            'fax'=> '(99)9999-9999',
            'email' => 'particular@email.com',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);

        DB::table('convenios')->insert([
            'nome' => 'Sabin Sinai',
            'telefone' => '(99)8888-8888',
            'fax'=> '(99)9999-8888',
            'email' => 'sabinsinai@email.com',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);
        DB::table('convenios')->insert([
            'nome' => 'Unimed',
            'telefone' => '(99)7777-7777',
            'fax'=> '(99)9999-7777',
            'email' => 'unimed@email.com',
            'created_at' => (new \DateTime())->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);
    }
}
