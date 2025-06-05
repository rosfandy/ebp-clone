<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AcademicController extends Controller
{
    protected $tables = [
        'degree' => 'degrees',
        'faculty' => 'faculties',
        'department' => 'departments',
    ];

    public function store_academic(Request $request, $type)
    {
        $table = $this->tables[$type] ?? null;
        if (!$table) return back()->with('error', 'Invalid type');

        $payload = Arr::except($request->all(), ['id']);

        try {
            DB::table($table)->insert($payload);
            return back()->with('success', 'Data created successfully');
        } catch (\Throwable $th) {
            Log::error('Insert failed: ' . $th->getMessage());
            return back()->with('error', 'Data insert failed');
        }
    }

    public function update_academic(Request $request, $type, $id)
    {
        $table = $this->tables[$type] ?? null;
        if (!$table) return back()->with('error', 'Invalid type');

        $data = $request->only(['name', 'code']);

        try {
            DB::table($table)->where('id', $id)->update($data);
            return back()->with('success', 'Data updated successfully');
        } catch (\Throwable $th) {
            Log::error('Update failed: ' . $th->getMessage());
            return back()->with('error', 'Data update failed');
        }
    }

    public function delete_academic($type, $id)
    {
        $table = $this->tables[$type] ?? null;
        if (!$table) return back()->with('error', 'Invalid type');

        try {
            DB::table($table)->where('id', $id)->delete();
            return back()->with('success', 'Data deleted successfully');
        } catch (\Throwable $th) {
            Log::error('Delete failed: ' . $th->getMessage());
            return back()->with('error', 'Data delete failed');
        }
    }
}
