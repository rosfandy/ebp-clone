<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    use HasFactory;

    protected $table = 'verifications';

    protected $fillable = [
        'name',
    ];

    protected $hidden = [];

    public function logVerifications()
    {
        return $this->hasMany(LogVerification::class);
    }
}
