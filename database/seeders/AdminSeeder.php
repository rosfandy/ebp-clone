<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Staff;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $id = (string) Str::uuid();

        User::create([
            'id' => $id,
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified' => 1,
            'role' => 'Administrator',
            'phone_verified' => 1,
            'password' => Hash::make('admin123'),
            'updater' => $id,
        ]);

        Staff::create([
            'id' => (string) Str::uuid(),
            'user_id' => $id,
            'is_admin' => true,
            'updated_at' => now(),
            'created_at' => now(),
        ]);
    }
}
