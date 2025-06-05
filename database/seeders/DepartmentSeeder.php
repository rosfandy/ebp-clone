<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $department = [
            [
                'faculty_id' => '1',
                'code' => 'FSAD01',
                'name' => 'Fisika'
            ],
            [
                'faculty_id' => '1',
                'code' => 'FSAD02',
                'name' => 'Matematika'
            ],
            [
                'faculty_id' => '1',
                'code' => 'FSAD03',
                'name' => 'Statistika'
            ],
            [
                'faculty_id' => '1',
                'code' => 'FSAD04',
                'name' => 'Kimia'
            ],
            [
                'faculty_id' => '1',
                'code' => 'FSAD05',
                'name' => 'Biologi'
            ],
            [
                'faculty_id' => '1',
                'code' => 'FSAD06',
                'name' => 'Aktuaria'
            ],
            [
                'faculty_id' => '2',
                'code' => 'FTK01',
                'name' => 'Teknik Perkapalan'
            ],
            [
                'faculty_id' => '2',
                'code' => 'FTK02',
                'name' => 'Teknik Sistem Perkapalan'
            ],
            [
                'faculty_id' => '2',
                'code' => 'FTK03',
                'name' => 'Teknik Kelautan'
            ],
            [
                'faculty_id' => '2',
                'code' => 'FTK04',
                'name' => 'Teknik Transportasi Laut'
            ],
            [
                'faculty_id' => '3',
                'code' => 'FTIRS01',
                'name' => 'Teknik Mesin'
            ],
            [
                'faculty_id' => '3',
                'code' => 'FTIRS02',
                'name' => 'Teknik Kimia'
            ],
            [
                'faculty_id' => '3',
                'code' => 'FTIRS03',
                'name' => 'Teknik Fisika'
            ],
            [
                'faculty_id' => '3',
                'code' => 'FTIRS04',
                'name' => 'Teknik Sistem Dan Industri'
            ],
            [
                'faculty_id' => '3',
                'code' => 'FTIRS05',
                'name' => 'Teknik Material'
            ],
            [
                'faculty_id' => '4',
                'code' => 'FTEIC01',
                'name' => 'Teknik Elektro'
            ],
            [
                'faculty_id' => '4',
                'code' => 'FTEIC02',
                'name' => 'Teknik Biomedik'
            ],
            [
                'faculty_id' => '4',
                'code' => 'FTEIC03',
                'name' => 'Teknik Komputer'
            ],
            [
                'faculty_id' => '4',
                'code' => 'FTEIC04',
                'name' => 'Teknik Informatika'
            ],
            [
                'faculty_id' => '4',
                'code' => 'FTEIC05',
                'name' => 'Sistem Informasi'
            ],
            [
                'faculty_id' => '4',
                'code' => 'FTEIC06',
                'name' => 'Teknologi Informasi'
            ],
            [
                'faculty_id' => '5',
                'code' => 'FTSPK01',
                'name' => 'Teknik Sipil'
            ],
            [
                'faculty_id' => '5',
                'code' => 'FTSPK02',
                'name' => 'Arsitektur'
            ],
            [
                'faculty_id' => '5',
                'code' => 'FTSPK03',
                'name' => 'Teknik Lingkungan'
            ],
            [
                'faculty_id' => '5',
                'code' => 'FTSPK04',
                'name' => 'Perencanaan Wilayah Dan Kota'
            ],
            [
                'faculty_id' => '5',
                'code' => 'FTSPK05',
                'name' => 'Teknik Geomatika'
            ],
            [
                'faculty_id' => '5',
                'code' => 'FTSPK06',
                'name' => 'Teknik Geofisika'
            ],
            [
                'faculty_id' => '6',
                'code' => 'FDKBD01',
                'name' => 'Desain Produk Industri'
            ],
            [
                'faculty_id' => '6',
                'code' => 'FDKBD02',
                'name' => 'Desain Interior'
            ],
            [
                'faculty_id' => '6',
                'code' => 'FDKBD03',
                'name' => 'Desain Komunikasi Visual'
            ],
            [
                'faculty_id' => '6',
                'code' => 'FDKBD04',
                'name' => 'Manajemen Bisnis'
            ],
            [
                'faculty_id' => '6',
                'code' => 'FDKBD05',
                'name' => 'Studi Pembangunan'
            ],
            [
                'faculty_id' => '6',
                'code' => 'FDKBD06',
                'name' => 'Manajemen Teknologi'
            ],
            [
                'faculty_id' => '7',
                'code' => 'FV01',
                'name' => 'Teknik Infrastruktur Sipil'
            ],
            [
                'faculty_id' => '7',
                'code' => 'FV02',
                'name' => 'Teknik Mesin Industri'
            ],
            [
                'faculty_id' => '7',
                'code' => 'FV03',
                'name' => 'Teknik Elektro Otomasi'
            ],
            [
                'faculty_id' => '7',
                'code' => 'FV04',
                'name' => 'Teknik Kimia Industri'
            ],
            [
                'faculty_id' => '7',
                'code' => 'FV05',
                'name' => 'Teknik Instrumentasi'
            ],
            [
                'faculty_id' => '7',
                'code' => 'FV06',
                'name' => 'Statistika Bisnis'
            ],
            [
                'faculty_id' => '8',
                'code' => 'SIMT01',
                'name' => 'Manajemen Teknologi'
            ],
            [
                'faculty_id' => '9',
                'code' => 'FKK01',
                'name' => 'Teknologi Kedokteran'
            ],
            [
                'faculty_id' => '9',
                'code' => 'FKK02',
                'name' => 'Kedokteran'
            ],
            [
                'faculty_id' => '9',
                'code' => 'FKK03',
                'name' => 'Pendidikan Profesi Dokter'
            ],
        ];

        foreach ($department as $data) {
            Department::create([
                'code' => $data['code'],
                'name' => strtoupper($data['name']),
                'faculty_id' => $data['faculty_id'],
            ]);
        };
    }
}
