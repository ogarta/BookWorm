<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'addresses';

    protected $fillable = [
        'user_id',
        'default',
        'name',
        'phone',
        'type_address',
        'number_address',
        'district',
        'street',
        'city',
    ];

    public $timestamps = true;
}
