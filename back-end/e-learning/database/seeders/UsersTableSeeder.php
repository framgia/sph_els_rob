<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => 'Rob',
            'last_name' => 'Del Rosario',
            'email' => 'rob@delrosario.com',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);
    }
}
