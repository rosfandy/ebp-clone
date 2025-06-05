<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use App\Models\Faculty;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = 10;
        $faker = Faker::create();

        $faculties = Faculty::with('departments')->get();

        $userIds = [];

        for ($i = 0; $i < $count; $i++) {
            $userId = (string) Str::uuid();
            $updatedUserId = (string) Str::uuid();
            DB::table('users')->insert([
                'id' => $userId,
                'email' => $faker->userName() . '@student.its.ac.id',
                'name' => $faker->name(),
                'role' => 'Mahasiswa',
                'username' => mt_rand(1000000000, 9999999999),
                'gender' => $faker->randomElement(['male', 'female']),
                'birthdate' => $faker->date(),
                'phone' => $faker->phoneNumber(),
                'updater' => $updatedUserId,
            ]);
            $userIds[] = $userId;
        }

        $students = [];
        for ($i = 0; $i < $count; $i++) {
            $faculty = $faculties->random();
            // $faculty = 4;
            $department = $faculty->departments->random();
            // $department = 21;

            $students[] = [
                'id' => (string) Str::uuid(),
                'user_id' => $userIds[$i],
                'degree_id' => rand(1, 6),
                'faculty_id' => $faculty->id,
                'department_id' => $department->id,
                'verification_status_id' => rand(1, 6),
                'final_project' => strtoupper($faker->sentence(6)),
                'repository_code' => $faker->url(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('students')->insert($students);
    }
}
