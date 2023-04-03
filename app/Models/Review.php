<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';

    protected $fillable = [
        'book_id',
        'review_title',
        'review_details',
        'rating_start',
        'review_date',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

}
