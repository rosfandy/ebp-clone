<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $table = 'faculties';

    protected $fillable = [
        'code',
        'name',
    ];

    protected $hidden = [];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }
}
