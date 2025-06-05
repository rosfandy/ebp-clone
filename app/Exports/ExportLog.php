<?php

namespace App\Exports;

use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExportLog implements FromCollection, WithHeadings
{
    protected $staff, $logs;

    public function __construct($logs)
    {
        $this->logs = $logs;
        $this->staff = $logs[0]->staff;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $data = $this->logs->map(function ($log) {
            return [
                'nama' => $log->student->user->name,
                'nrp' => $log->student->user->username,
                'judul_ta' => $log->student->final_project,
                'repository' => $log->student->repository_code ?? '-',
                'email' => $log->student->user->email,
                'telp' => $log->student->user->telp,    
                'jenjang' => $log->student->degree->name,
                'fakultas' => $log->student->faculty->code,
                'departemen' => $log->student->department->name,
                'tindakan' => strtoupper($log->verificationStatus->name),
                'penolakan' => !empty($log->message) ? $log->message : 'Diterima',
                'tanggal' => $log->verification_date,
            ];
        });
        return $data;
    }

    /**
     * Define the headings for the Excel sheet.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'Nama',
            'NRP',
            'Judul TA',
            'Repository',
            'Email',
            'Telp',
            'Jenjang',
            'Fakultas',
            'Departemen',
            'Tindakan',
            'Penolakan',
            'Tanggal'
        ];
    }
}
