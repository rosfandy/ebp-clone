<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::get('/', [App\Http\Controllers\AuthController::class, 'auth']);
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::get('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
});
