<?php
namespace App\Repositories;
use App\Models\Book;
use DB;

class BookRepository{
    public function getTopDisCount(){
        $listTopDisCount = Book::join('author', 'book.author_id', '=', 'author.id')
        ->Leftjoin('discount','book.id', '=', 'discount.book_id')
        ->select('book.id',
            'book.book_title', 
            'book.book_price',
            'book.book_cover_photo',
            'author.author_name', 
            DB::raw('case
					when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then book.book_price - discount.discount_price
					else book.book_price
					end as final_price'))
        ->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price', 'author.author_name')
        ->orderBy('final_price', 'ASC')
        ->limit(env('LIMIT_TOP_DISCOUNT'))
        ->get();
        return $listTopDisCount;

    }

    public function getTopRecommend(){
        $listTopRecommend = Book::join('review', 'book.id', '=', 'review.book_id')
        ->join('author', 'book.author_id', '=', 'author.id')
        ->Leftjoin('discount','book.id', '=', 'discount.book_id')
        ->select('book.id',
            'book.book_title', 
            'book.book_price',
            'book.book_cover_photo',
            'author.author_name', 
            DB::raw('avg(review.rating_start) as avg_rating_star'),
            DB::raw('case
					when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then book.book_price - discount.discount_price
					else book.book_price
					end as final_price'))
        ->groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price', 'author.author_name')
        ->orderBy('avg_rating_star','DESC')
        ->orderBy('final_price', 'ASC')
        ->limit(env('LIMIT_TOP_RECOMMEND'))
        ->get();
        return $listTopRecommend;
    }
}