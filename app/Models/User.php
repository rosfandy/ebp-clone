<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // HARUS INI
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory;

    protected $table = 'users';
    protected $keyType = 'uuid';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'username',
        'gender',
        'role',
        'birthdate',
        'email',
        'password',
        'email_verified',
        'alternate_email',
        'alternate_email_verified',
        'phone',
        'phone_verified',
        'zoneinfo',
        'locale',
        'picture',
        'updater',
    ];

    protected $hidden = [
        'password',
        'email_verified',
        'alternate_email_verified',
        'phone_verified',
        'updater',
    ];

    protected $casts = [
        'id' => 'string',
        'birthdate' => 'datetime',
        'email_verified' => 'boolean',
        'alternate_email_verified' => 'boolean',
        'phone_verified' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->id)) {
                $user->id = (string) Str::uuid();
            }
        });
    }
}
