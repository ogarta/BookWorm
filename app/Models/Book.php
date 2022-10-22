<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public static function getFinalPrice($parameter){
        if(is_int($parameter)){
            $bookId = $parameter;
            $finalBookPrice = Book::leftJoin('discount', 'discount.book_id', '=', 'book.id')
            ->selectRaw('case
                    when now() >= discount.discount_start_date
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then discount.discount_price
                    else book.book_price
                    end as final_price')
            ->where('book.id', '=', $bookId)
            ->first()->final_price;
        return $finalBookPrice;
        }else{
            $query = $parameter;
            return $query->
            selectRaw('case
                when now() >= discount.discount_start_date
                and (discount.discount_end_date is null
                or now() <=discount.discount_end_date) then discount.discount_price
                else book.book_price
                end as final_price');
        }
    }

    public static function selectSubPrice($query){
        return $query->
            selectRaw('case
                when now() >= discount.discount_start_date
                and (discount.discount_end_date is null
                or now() <= discount.discount_end_date) then book.book_price - discount.discount_price
                end as sub_price');
    }
}
