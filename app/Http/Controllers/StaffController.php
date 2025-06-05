<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StaffController extends Controller
{
    function update_staff_authority(Request $request, $id)
    {
        try {
            $payload = $request->all();
            Log::info('payload: ' . json_encode($payload));
            DB::beginTransaction();
            \App\Models\Staff::where('id', $id)->update([
                'authority' => isset($payload['authority']) ? json_encode($payload['authority']) : json_encode([]),
                'is_admin' => isset($payload['is_admin']) ? $payload['is_admin'] : 0
            ]);
            DB::commit();
            return back()->with('success', 'Data updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::info('Transaction failed:' . $th->getMessage());

            return back()->with('error', 'Data update failed');
        }
    }
}
