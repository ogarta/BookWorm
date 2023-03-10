<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(10)->create();

        User::create([
            'last_name' => 'customer',
            'first_name' => 'test',
            'email' => 'test@gmail.com',
            'admin' => false,
            'password' => bcrypt('123456'),
            'phone_number' => '0123456789',
        ]);
    }
}
