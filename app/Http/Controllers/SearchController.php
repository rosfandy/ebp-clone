<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class SearchController extends Controller
{
    function member_search(Request $request)
    {
        $search = $request->search;
        Session::put('search', $search);
        return to_route('member');
    }

    function verification_search(Request $request)
    {
        $student = $request->search;
        $department_id = $request->department_id;
        $verification_status_id = $request->verification_status_id;

        Session::put('student', $student);
        Session::put('department_id', $department_id);
        Session::put('verification_status_id', $verification_status_id);

        return to_route('verification');
    }

    function acedemic_search(Request $request)
    {
        $search = $request->search;
        Session::put('search', $search);
        return to_route('academic');
    }
}
