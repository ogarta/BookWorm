<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reciver extends Model
{
    use HasFactory;

    protected $table = 'reciver';

    protected $fillable = [
        'name',
        'phone',
        'address_id',
        'is_default',
        'user_id',
    ];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
