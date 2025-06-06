<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Authority extends Model
{
    use HasFactory;

    protected $table = 'authorities';

    protected $fillable = [
        'name',
    ];

    protected $hidden = [];

    public function staff()
    {
        return $this->hasMany(StaffAuthority::class);
    }
}
