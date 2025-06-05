<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbpLetter extends Model
{
    use HasFactory;

    protected $table = 'ebp_letters';
    public $incrementing = false;

    protected $fillable = [
        'reference_number',
        'reference_id',
        'name_of_head',
        'nip_of_head',
    ];

    protected $hidden = [];
}
