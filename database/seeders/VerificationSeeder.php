<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VerificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $verification = [
            [
                'name' => 'Aktivasi',
            ],
            [
                'name' => 'Validasi',
            ],
            [
                'name' => 'Publikasi',
            ],
            [
                'name' => 'Penerimaan TA',
            ],
            [
                'name' => 'Tanggungan',
            ],
            [
                'name' => 'Surat BP',
            ],
        ];

        foreach ($verification as $key => $value) {
            \App\Models\Verification::create($value);
        }
    }
}
