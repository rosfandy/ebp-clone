<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Degree;

class DegreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $degrees = [
            [
                'code' => 'S1',
                'name' => 'Sarjana'
            ],
            [
                'code' => 'S2',
                'name' => 'Magister'
            ],
            [
                'code' => 'S3',
                'name' => 'Doktor'
            ],
            [
                'code' => 'D1',
                'name' => 'Diploma 1'
            ],
            [
                'code' => 'D2',
                'name' => 'Diploma 2'
            ],
            [
                'code' => 'D3',
                'name' => 'Diploma 3'
            ],
        ];

        foreach ($degrees as $data) {
            Degree::create([
                'code' => $data['code'],
                'name' => strtoupper($data['name']),
            ]);
        }
    }
}
