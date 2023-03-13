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
        'order_date',
        'order_status',
        'payment_method',
        'address_id',
    ];

    public function itemOrder()
    {
        return $this->hasMany(ItemOrder::class);
    }

    public function bookOrderDetail()
    {
        return $this->hasManyThrough(Book::class, ItemOrder::class, 'order_id', 'id', 'id', 'book_id');
    }

    public function addressOrderDetail()
    {
        return $this->hasOne(Address::class, 'id', 'address_id');
    }
}
