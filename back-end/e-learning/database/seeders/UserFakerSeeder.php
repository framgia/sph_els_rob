<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserFakerSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        for ($i = 0; $i < 50; $i++)
        {
            DB::table('users')->insert([
                'first_name' => $faker->firstname,
                'last_name' => $faker->lastname,
                'email' => $faker->email,
                'password' => Hash::make($faker->password),
                'role' => 'member'
            ]);
        }
    }
}
