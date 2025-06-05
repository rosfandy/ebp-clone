<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $fakultas = [
            [
                'code' => 'FSAD',
                'name' => 'Fakultas Sains Dan Analitika Data'
            ],
            [
                'code' => 'FTK',
                'name' => 'Fakultas Teknologi Dan Kelautan'
            ],
            [
                'code' => 'FTIRS',
                'name' => 'Fakultas Teknologi Industri Dan Rekayasa Sistem'
            ],
            [
                'code' => 'FTEIC',
                'name' => 'Fakultas Teknologi Elektro Dan Informatika Cerdas'
            ],
            [
                'code' => 'FTSPK',
                'name' => 'Fakultas Teknik Sipil, Perencanaan Dan Kebumian'
            ],
            [
                'code' => 'FDKBD',
                'name' => 'Fakultas Desan Kreatif Dan Bisnis Digital'
            ],
            [
                'code' => 'FV',
                'name' => 'Fakultas Vokasi'
            ],
            [
                'code' => 'SIMT',
                'name' => 'Sekolah Interdisiplin Manajemen Dan Teknologi'
            ],
            [
                'code' => 'FKK',
                'name' => 'Fakultas Kedokteran Dan Kesehatan'
            ],
        ];

        foreach ($fakultas as $data) {
            \App\Models\Faculty::create(
                [
                    'code' => $data['code'],
                    'name' => strtoupper($data['name']),
                ]
            );
        };
    }
}
