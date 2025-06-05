<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    function index()
    {
        return Inertia::render('Home/Page');
    }

    function access_denied()
    {
        return Inertia::render('Errors/403');
    }

    function not_found()
    {
        return Inertia::render('Errors/404');
    }
}
