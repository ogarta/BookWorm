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

    public function bookOrderDetail()
    {
        // use id of order table as foreign key of item_order table get quantity and use 
        return $this->hasManyThrough(Book::class, ItemOrder::class, 'order_id', 'id', 'id', 'book_id');
    }
}
