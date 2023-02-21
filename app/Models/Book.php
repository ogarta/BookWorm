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

    public static function getFinalBookPrice($bookId){

        $finalBookPrice = Book::leftJoin('discount', 'discount.book_id', '=', 'book.id')
        ->where('book.id', '=', $bookId);
        $finalBookPrice = Book::selecFinalPrice($finalBookPrice);
        return $finalBookPrice->first()->final_price;
    }

    public static function selecFinalPrice($query){
        return $query->
        selectRaw('case
            when discount.discount_price is null then book.book_price 
            else discount.discount_price
            end as final_price');
    }

    public static function joinDiscountTable($query){
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

    public static function selectSubPrice($query){
        return $query->
            selectRaw('case
            when discount.discount_price is null then 0 
            else book.book_price - discount.discount_price
            end as sub_price');
    }
}
