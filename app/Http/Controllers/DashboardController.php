<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $sessionUser;

    public function __construct()
    {
        $this->sessionUser = Session::get('user');
    }

    function index()
    {
        try {
            DB::beginTransaction();

            $session = Session::get('user');
            $role = $session['role'];
            $userId = $session['id'];

            $pages = 'Dashboard/Admin/Index';
            $data = ['user' => $session];

            if ($role === 'student') {
                if (!$this->studentExist($session)) {
                    return redirect()->route('student.form');
                }

                $pages = 'Dashboard/Student/Index';
                $student = \App\Models\Student::where('user_id', $userId)->first();

                $data += [
                    'student' => [
                        'department' => $student->department->name,
                        'faculty' => $student->faculty->name,
                        'degree' => $student->degree->name,
                        'final_project' => $student->final_project,
                        'verification' => $student->verificationStatus,
                    ],
                    'notifications' => \App\Models\LogVerification::with(['staff.user', 'student', 'verificationStatus'])
                        ->where('student_id', (string) $student->id)
                        ->orderBy('verification_date', 'desc')
                        ->get(),
                ];
            } else {
                $userStaff = \App\Models\Staff::where('user_id', $userId)->first();

                $data += [
                    'user' => $this->mapUserStaffData($userStaff),
                    'students' => \App\Models\Student::where('is_active', true)->with(['department', 'faculty'])->get(),
                    'total_student' => \App\Models\Student::where('is_active', true)->count(),
                    'verifications' => \App\Models\Verification::all(),
                    'faculties' => \App\Models\Faculty::all(),
                    'departments' => \App\Models\Department::all(),
                ];
            }
            DB::commit();
            return Inertia::render($pages, $data);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Error in index: ' . $th->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan. Silakan coba lagi.');
        }
    }


    function profile()
    {
        $user = Session::get('user');
        return Inertia::render('Profile/Page', [
            'user' => $user
        ]);
    }

    function verification(Request $request)
    {
        $searchableFields = ['name', 'username', 'email', 'phone'];
        $session = Session::get('user');
        $search = $request->query('search');
        $department_id = $request->query('department_id');
        $verification_status_id = $request->query('status_id');
        $page = $request->query('page', 1);
        $limit = 20;

        DB::beginTransaction();


        try {
            $userStaff = \App\Models\Staff::where('user_id', $session['id'])->first();

            $faculties = \App\Models\Faculty::all();
            $departments = \App\Models\Department::all();
            $verifications = \App\Models\Verification::all();
            $query = Student::query();

            if ($department_id) {
                $query->whereHas('department', function ($query) use ($department_id) {
                    $query->where('id', $department_id);
                });
            }
            if ($verification_status_id) {
                $query->where('verification_status_id', $verification_status_id);
            }

            $studentQuery = $this->usersQuery($query, $search, $searchableFields);
            $students = $studentQuery->paginate($limit, ['*'], 'page', $page);
            $mappedStudentData = $this->mapStudentData($students->items());
            $mappedUserData = $this->mapUserStaffData($userStaff);

            $pagination = $this->getPaginationDetails($students, $limit);

            DB::commit();
            Session::forget('student');

            \Log::info('students: ' . json_encode($mappedStudentData));

            return Inertia::render('Dashboard/Admin/Verification', [
                'user' => $mappedUserData,
                'students' => $mappedStudentData,
                'pagination' => $pagination,
                'faculties' => $faculties,
                'departments' => $departments,
                'verifications' => $verifications
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
        }
    }

    public function member(Request $request)
    {
        $session = Session::get('user');
        $search = Session::get('search');
        $page = $request->query('page', 1);
        $limit = 20;

        DB::beginTransaction();

        try {
            $searchableFields = ['name', 'username', 'email', 'phone'];
            $query = Staff::query()
                ->join('users', 'users.id', '=', 'staff.user_id')
                ->where('users.sso_role', '!=', 'Administrator')
                ->select('staff.*');

            $staffQuery = $this->usersQuery($query, $search, $searchableFields);
            $staff = $staffQuery->paginate($limit, ['*'], 'page', $page);
            $mappedStaffData = $this->mapStaffData($staff->items());
            $pagination = $this->getPaginationDetails($staff, $limit);
            $userStaff = \App\Models\Staff::where('user_id', $session['id'])->first();

            DB::commit();
            Session::forget('search');

            return Inertia::render('Dashboard/Admin/Member', [
                'user' => $this->mapUserStaffData($userStaff),
                'staff' => $mappedStaffData,
                'pagination' => $pagination,
            ]);
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
        }
    }

    function academic()
    {
        $session = Session::get('user');

        DB::beginTransaction();

        try {
            $degrees = \App\Models\Degree::all();
            $departments = \App\Models\Department::all();
            $faculties = \App\Models\Faculty::all();
            $userStaff = \App\Models\Staff::where('user_id', $session['id'])->first();

            return Inertia::render('Dashboard/Admin/Academic', [
                'user' => $this->mapUserStaffData($userStaff),
                'degrees' => $degrees,
                'departments' => $departments,
                'faculties' => $faculties
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
        }
    }

    function letter()
    {
        $session = Session::get('user');
        $role = $session['role'];
        $verifications = \App\Models\Verification::all();

        if ($role == 'student') {
            $student = \App\Models\Student::where('user_id', $session['id'])->with('user')->first();
            return Inertia::render('Dashboard/Student/Letter', [
                'user' => $session,
                'student' => [
                    'id' => $student->id,
                    'department' => $student->department->name,
                    'faculty' => $student->faculty->name,
                    'degree' => $student->degree->name,
                    'final_project' => $student->final_project,
                    'verification_status_id' => $student->verification_status_id
                ],
                'verifications' => $verifications
            ]);
        }

        $userStaff = \App\Models\Staff::where('user_id', $session['id'])->first();
        $letter = \App\Models\EbpLetter::all();

        return Inertia::render('Dashboard/Admin/Letter', [
            'user' => $this->mapUserStaffData($userStaff),
            'letter' => $letter
        ]);
    }

    private function studentExist($user)
    {
        $student = \App\Models\Student::where('user_id', $user['id'])->first();
        return $student !== null && isset($student->id);
    }

    private function usersQuery($query, $search, array $searchableFields = ['name', 'username', 'email', 'phone'])
    {
        $query->with(['user']);


        if ($search) {
            $query->whereHas('user', function ($query) use ($search, $searchableFields) {
                $query->where(function ($q) use ($search, $searchableFields) {
                    foreach ($searchableFields as $field) {
                        $q->orWhere($field, 'like', "%{$search}%");
                    }
                });
            });
        }

        $query->orderBy('created_at', 'desc');

        return $query;
    }

    private function mapUserStaffData($user)
    {
        return [
            'id' => $user->id,
            'name' => $user->user->name,
            'username' => $user->user->username,
            'email' => $user->user->email,
            'phone' => $user->user->phone,
            'role' => $user->is_admin ? 'admin' : 'staff',
            'authority' => $user->authority,
            'picture' => $user->user->picture
        ];
    }

    private function mapStudentData($datas)
    {
        return collect($datas)->map(function ($data) {
            return [
                'id' => $data->id,
                'name' => $data->user->name,
                'username' => $data->user->username,
                'email' => $data->user->email,
                'phone' => $data->user->phone,
                'department' => $data->department->name,
                'department_id' => $data->department_id,
                'faculty' => $data->faculty->name,
                'faculty_id' => $data->faculty_id,
                'faculty_code' => $data->faculty->code,
                'verification_status' => $data->verificationStatus,
                'verification_status_id' => $data->verification_status_id,
                'final_project' => $data->final_project
            ];
        });
    }
    private function mapStaffData($staffData)
    {
        return collect($staffData)->map(function ($staffMember) {
            return [
                'id' => $staffMember->id,
                'name' => $staffMember->user->name,
                'username' => $staffMember->user->username,
                'email' => $staffMember->user->email,
                'phone' => $staffMember->user->phone,
                'role' => $staffMember->is_admin ? 'admin' : 'staff',
                'authority' => $staffMember->authority
            ];
        });
    }
    private function getPaginationDetails($staff, $limit)
    {
        $startSlot = ($staff->currentPage() - 1) * $limit + 1;
        $endSlot = min($startSlot + $limit - 1, $staff->total());

        return [
            'current_page' => $staff->currentPage(),
            'last_page' => $staff->lastPage(),
            'per_page' => $staff->perPage(),
            'total' => $staff->total(),
            'start_slot' => $startSlot,
            'end_slot' => $endSlot,
        ];
    }
}
