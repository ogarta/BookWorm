<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'order';

    protected $fillable = [
        'user_id',
        'order_amount',
        'order_date'
    ];

    public function itemOrder()
    {
        return $this->hasMany(ItemOrder::class);
    }
}
