<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class LetterController extends Controller
{
    public function generate_pdf(Request $request)
    {
        $session = Session::get('user');
        $studentId = $request->query('studentId');
        $userData = [];

        if ($session['role'] == 'student') {
            $userData = $session;
        } else {
            $staff = \App\Models\Staff::where('user_id', $session['id'])->with('user')->first();
            $userData = [
                'id' => $staff->id,
                'name' => $staff->user->name,
                'username' => $staff->user->username,
                'picture' => $staff->user->picture,
                'email' => $staff->user->email,
                'role' => $staff->is_admin ? 'admin' : 'staff',
            ];
        }

        $student = \App\Models\Student::where('id', $studentId)->with('user', 'department')->first();
        $letter = \App\Models\EbpLetter::all();

        if ($student->verification_status_id != 6) return redirect('dashboard')->with('error', 'Unable to generate file. Status is incomplete');


        return Inertia::render('LetterPreview', [
            'user' => $userData,
            'student' => [
                'name' => $student->user->name,
                'email' => $student->user->email,
                'nrp' => $student->user->username,
                'final_project' => $student->final_project,
                'department' => $student->department->name,
            ],
            'letter' => $letter
        ]);
    }

    public function edit_letter(Request $request)
    {
        $payload = $request->all();

        try {
            \App\Models\EbpLetter::updateOrCreate(
                ['id' => 1],
                $payload
            );

            return back()->with([
                'success' => 'Data updated successfully'
            ]);
        } catch (\Throwable $th) {
            Log::error('Transaction failed: ' . $th->getMessage());
            return back()->with([
                'error' => 'Data update failed'
            ]);
        }
    }


    public function upload_header(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|image|mimes:jpeg,png,jpg',
            ]);

            $filename = 'header_main.jpg';
            $filePath = public_path('img/' . $filename);

            if (File::exists($filePath)) {
                File::delete($filePath);
            }

            $file = $request->file('file');
            $file->move(public_path('img'), $filename);

            return back()->with([
                'success' => 'Data updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("error: " . $e->validator->getMessageBag());
            return back()->with([
                'error' => 'Data update failed'
            ]);
        } catch (\Throwable $th) {
            Log::error('Transaction failed: ' . $th->getMessage());
            return back()->with([
                'error' => 'Data update failed'
            ]);
        }
    }

    public function upload_ttd(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|image|mimes:jpeg,png,jpg',
            ]);

            $filename = 'ttd_main.jpg';
            $filePath = public_path('img/' . $filename);

            if (File::exists($filePath)) {
                File::delete($filePath);
            }

            $file = $request->file('file');
            $file->move(public_path('img'), $filename);

            return back()->with([
                'success' => 'Data updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("error: " . $e->validator->getMessageBag());
            return back()->with([
                'error' => 'Data update failed'
            ]);
        } catch (\Throwable $th) {
            Log::error('Transaction failed: ' . $th->getMessage());
            return back()->with([
                'error' => 'Data update failed'
            ]);
        }
    }
}
