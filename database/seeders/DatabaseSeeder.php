<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Verification;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            FacultySeeder::class,
            DepartmentSeeder::class,
            VerificationSeeder::class,
            DegreeSeeder::class,
            LetterSeeder::class,
            AdminSeeder::class,
            StudentSeeder::class
        ]);
    }
}
