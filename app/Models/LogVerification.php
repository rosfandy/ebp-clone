<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogVerification extends Model
{
    use HasFactory;

    protected $table = 'log_verifications';

    protected $fillable = [
        'staff_id',
        'student_id',
        'verification_status_id',
        'verification_date',
        'message',
        'is_rejected',
    ];

    protected $hidden = [];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function verificationStatus()
    {
        return $this->belongsTo(Verification::class, 'verification_status_id');
    }
}
