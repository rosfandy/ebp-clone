<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/access-denied', [App\Http\Controllers\HomeController::class, 'access_denied'])->name('access_denied');

Route::middleware(['auth.roles:Administrator,Mahasiswa,Tendik'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/letter', [App\Http\Controllers\DashboardController::class, 'letter'])->name('letter');
    // Route::get('/letter/download', [App\Http\Controllers\LetterController::class, 'generate_pdf'])->name('verification.generate_pdf');
});

Route::middleware(['auth.roles:Mahasiswa'])->prefix('student')->group(function () {
    Route::get('/register', [App\Http\Controllers\StudentController::class, 'form'])->name('student.form');
    Route::post('/register', [App\Http\Controllers\StudentController::class, 'store'])->name('student.store');
});

Route::middleware(['auth.roles:Administrator,Tendik'])->group(function () {
    Route::prefix('verification')->group(function () {
        Route::get('/', [App\Http\Controllers\DashboardController::class, 'verification'])->name('verification');
        Route::post('/search', [App\Http\Controllers\SearchController::class, 'verification_search'])->name('verification.search');
        Route::post('/update/status/{studentId}', [App\Http\Controllers\StudentController::class, 'update_status'])->name('verification.update');
    });
    Route::prefix('api')->group(function () {
        Route::get('/authority/staff/{id}', [App\Http\Controllers\AuthorityController::class, 'get_staff_authority']);
        // Route::get('/log/staff/{id}', [App\Http\Controllers\AuthorityController::class, 'get_staff_logs'])->name('log.staff');
    });
});

Route::middleware(['auth.roles:Administrator'])->group(function () {
    Route::prefix('letter')->group(function () {
        Route::put('/edit', [App\Http\Controllers\LetterController::class, 'edit_letter'])->name('letter.edit');
        Route::post('/upload/ttd', [App\Http\Controllers\LetterController::class, 'upload_ttd'])->name('letter.ttd');
        Route::post('/upload/header', [App\Http\Controllers\LetterController::class, 'upload_header'])->name('letter.header');
    });

    Route::prefix('member')->group(function () {
        Route::get('/', [App\Http\Controllers\DashboardController::class, 'member'])->name('member');
        Route::post('/search', [App\Http\Controllers\SearchController::class, 'member_search'])->name('member.search');
        Route::put('/update/{id}', [App\Http\Controllers\StaffController::class, 'update_staff_authority']);
    });
    Route::prefix('academic')->group(function () {
        Route::get('/', [App\Http\Controllers\DashboardController::class, 'academic'])->name('academic');
        Route::post('/store/{type}', [App\Http\Controllers\AcademicController::class, 'store_academic']);
        Route::put('/update/{type}/{id}', [App\Http\Controllers\AcademicController::class, 'update_academic']);
        Route::delete('/delete/{type}/{id}', [App\Http\Controllers\AcademicController::class, 'delete_academic']);
    });
});

Route::fallback(function () {
    return Inertia::render('Errors/404');
})->name('not_found');

require __DIR__ . '/auth.php';
