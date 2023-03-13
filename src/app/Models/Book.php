<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function discount()
    {
        return $this->hasOne(Discount::class)->withDefault([
            'discount_price' => 0,
        ]);
    }

    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeJoinReviewTable($query, $id = null, $select = "all"){
        return $query->Leftjoin('review', 'book.id', '=', 'review.book_id')
        ->when($select === "all", function ($query) {
            return $query->select(
                'book.*',
                'discount.discount_price',);
        })
        ->when($select !== "all", function ($query) {
            return $query->select(
                'book.id',
                'book.book_title',
                'book.book_cover_photo',
                'book.book_price',
                'book.author_id',
                'discount.discount_price',);;
        })
        ->when($id !== null, function ($query) use ($id) {
            return $query->where('book.id', $id);
        })
        ->groupBy('book.id', 'discount.discount_price');
    }

    public function scopeFinalPrice($query){
        return $query->
        selectRaw('case
            when discount.discount_price is null then book.book_price 
            else discount.discount_price
            end as final_price');
    }

    public static function selectFinalPrice($query){
        return $query->
        selectRaw('case
            when discount.discount_price is null then book.book_price 
            else discount.discount_price
            end as final_price');
    }

    public static function getFinalBookPrice($bookId){
        $finalBookPrice = Book::leftJoin('discount', 'discount.book_id', '=', 'book.id')
        ->where('book.id', '=', $bookId);
        $finalBookPrice = Book::selectFinalPrice($finalBookPrice);
        return $finalBookPrice->first()->final_price;
    }

    public function scopeSubPrice($query){
        return $query->
            selectRaw('case
            when discount.discount_price is null then 0 
            else book.book_price - discount.discount_price
            end as sub_price');
    }

    public function scopeFinalBookPrice($bookId){

        $finalBookPrice = Book::leftJoin('discount', 'discount.book_id', '=', 'book.id')
        ->where('book.id', '=', $bookId);
        $finalBookPrice = Book::selectFinalPrice($finalBookPrice);
        return $finalBookPrice->first()->final_price;
    }

    public function scopeJoinDiscountTable($query){
        return $query->
        leftJoin('discount', function($join){
            $join->on('book.id', '=', 'discount.book_id');
            $join->on('discount.discount_start_date', '<=', DB::raw('now()'));
            $join->on(function($query){
                $query->on('discount.discount_end_date', '>=', DB::raw('now()'))
                ->orWhereRaw('discount.discount_end_date is null');
            });
        });
    }

    public function scopeAvgRatingStar($query){
        return $query->selectRaw('avg(review.rating_start) as avg_rating_star');
    }
        
    public function scopeCountReview($query){
        return $query->selectRaw('count(review.book_id) as count_review');
    }
}
