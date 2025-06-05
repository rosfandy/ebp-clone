<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use App\Models\Faculty;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = 10;
        $faker = Faker::create();
        $userIds = [];

        for ($i = 0; $i < $count; $i++) {
            $userId = (string) Str::uuid();
            $updatedUserId = (string) Str::uuid();
            DB::table('users')->insert([
                'id' => $userId,
                'email' => $faker->userName() . '@administrator.its.ac.id',
                'name' => $faker->name(),
                'username' => mt_rand(1000000000, 9999999999),
                'gender' => $faker->randomElement(['male', 'female']),
                'birthdate' => $faker->date(),
                'phone' => $faker->phoneNumber(),
                'updater' => $updatedUserId,
            ]);
            $userIds[] = $userId;
        }

        $staff = [];
        for ($i = 0; $i < $count; $i++) {
            $staff[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $userIds[$i],
                'is_admin' => false,
            ];
        }

        DB::table('staff')->insert($staff);
    }
}
