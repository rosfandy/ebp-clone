<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function form()
    {
        try {
            $user = Session::get('user');
            $faculties = \App\Models\Faculty::all();
            $departments = \App\Models\Department::all();
            $degrees = \App\Models\Degree::all();

            return Inertia::render('Dashboard/Student/Register/Index', [
                'user' => $user,
                'faculties' => $faculties,
                'departments' => $departments,
                'degrees' => $degrees
            ]);
        } catch (\Throwable $th) {
            Log::info($th);
        }
    }


    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required',
                'degree_id' => 'required',
                'department_id' => 'required',
                'faculty_id' => 'required',
                'final_project' => 'required',
            ]);

            DB::beginTransaction();

            $student = \App\Models\Student::create([
                'id' => \Illuminate\Support\Str::uuid(),
                'user_id' => $request->user_id,
                'degree_id' => $request->degree_id,
                'department_id' => $request->department_id,
                'faculty_id' => $request->faculty_id,
                'final_project' => strtoupper($request->final_project),
            ]);

            \App\Models\EbpLetter::where('id', 1)->increment('reference_number');

            DB::commit();

            Session::put('student', $student);
            return redirect()->to('/dashboard')->with('success', 'Successfully logged in');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->validator)->withInput();
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with([
                'error' => 'An unexpected error occurred. Please try again.',
            ]);
        }
    }

    public function update_status(Request $request, $studentId)
    {
        try {
            $session = Session::get('user');

            $messages = [
                'verification_status_id.required' => 'Status verifikasi wajib diisi.',
                'is_reject.required' => 'Status penolakan wajib diisi.',
            ];

            $request->validate([
                'verification_status_id' => 'required',
                'is_reject' => 'required'
            ], $messages);

            DB::beginTransaction();

            $status = $request->is_reject
                ? $request->verification_status_id - 1
                : $request->verification_status_id + 1;

            $staff = \App\Models\Staff::where('user_id', $session['id'])->first();

            \App\Models\Student::where('id', $studentId)->update([
                'verification_status_id' => $status == 0 ? 1 : $status
            ]);

            \App\Models\LogVerification::create([
                'id' => \Illuminate\Support\Str::uuid(),
                'staff_id' => $staff->id,
                'student_id' => $studentId,
                'verification_status_id' => $request->verification_status_id,
                'verification_date' => Carbon::now(),
                'message' => $request->message ?? '',
                'is_rejected' => $request->is_reject,
            ]);

            DB::commit();

            $response = $request->is_reject
                ? ['error' => 'Status verifikasi berhasil ditolak']
                : ['success' => 'Status verifikasi berhasil diubah'];

            return back()->with($response);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("Validation error: " . json_encode($e->errors()));

            $errorMessages = implode(' ', array_map(fn($messages) => implode(' ', $messages), $e->errors()));

            return back()->with([
                'error' => $errorMessages,
            ]);
        } catch (\Throwable $th) {
            Log::error("Unexpected error: " . $th->getMessage());

            return back()->with([
                'error' => 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.',
            ]);
        }
    }
}
