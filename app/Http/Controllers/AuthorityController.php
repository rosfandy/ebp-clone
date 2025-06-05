<?php

namespace App\Http\Controllers;

use App\Exports\ExportLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class AuthorityController extends Controller
{
    function get_staff_authority($id)
    {
        try {
            $verifications = DB::table('verifications')->get();

            return response()->json([
                'status' => 'success',
                'verifications' => $verifications,
            ]);
        } catch (\Throwable $th) {
            Log::error('Failed to retrieve verifications: ' . $th->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve verifications: ' . $th->getMessage()
            ]);
        }
    }


    function get_staff_logs(Request $request, $id)
    {
        $status_id = $request->query('status_id');
        $today = Carbon::today();

        try {
            $query = \App\Models\LogVerification::with([
                'staff.user',
                'student.user',
                'student.degree',
                'student.faculty',
                'student.department',
                'verificationStatus'
            ])
                ->where('staff_id', $id)
                ->whereDate('verification_date', '<=', $today);

            if (!empty($status_id)) {
                $query->where('verification_status_id', $status_id);
            }

            $logs = $query->get();

            if ($logs->isEmpty()) {
                return back()->with('error', 'No logs found');
            }

            $staffName = Str::slug($logs[0]->staff->user->name ?? 'unknown');
            $verification = \App\Models\Verification::find($status_id);
            $verification_name = 'Log' . ($verification ? "_{$verification->name}" : '');
            $filename = "{$verification_name}_{$staffName}_{$today->format('d-m-Y')}.xlsx";

            return Excel::download(new ExportLog($logs), $filename);
        } catch (\Throwable $th) {
            Log::error('Transaction failed: ' . $th->getMessage());
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
}
