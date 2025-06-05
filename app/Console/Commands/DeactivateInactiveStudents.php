<?php

namespace App\Console\Commands;

use App\Models\EbpLetter;
use Illuminate\Console\Command;
use App\Models\Student;
use Carbon\Carbon;

class DeactivateInactiveStudents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'students:deactivate-inactive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deactivate students who have been inactive for more than 6 months';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $dateOneYearAgo = Carbon::now()->subYear(1);

        Student::where('is_active', true)
            ->where('created_at', '<', $dateOneYearAgo)
            ->update(['is_active' => false]);

        EbpLetter::where('id', 1)->update(['reference_number' => 0]);

        $this->info('Inactive students have been deactivated.');
    }
}
