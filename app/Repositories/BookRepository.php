<?php
namespace App\Repositories;
use App\Models\Book;
use DB;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;

class BookRepository{

    public function getTopDiscount(){
        $listTopDisCount = $this->detailBook()
        ->orderBy('sub_price', 'DESC')
        ->limit(env('LIMIT_TOP_DISCOUNT'));
        return $listTopDisCount;
    }

    public function getTopRecommend(){
        $listTopRecommend = $this->detailBook()
        ->orderBy('avg_rating_star','DESC')
        ->orderBy('final_price', 'ASC')
        ->limit(env('LIMIT_TOP_RECOMMEND'));
        return $listTopRecommend;
    }

    public function getTopPopular(){
        $listTopPopular = $this->detailBook()
        ->orderBy('count_review','DESC')
        ->orderBy('final_price', 'ASC')
        ->limit(env('LIMIT_TOP_POPULAR'));
        return $listTopPopular;
    }

    public function detailBook($id=null){
        $detailBook = Book::Leftjoin('category', 'book.category_id', '=', 'category.id')
        ->Leftjoin('review', 'book.id', '=', 'review.book_id')
        ->Leftjoin('author', 'book.author_id', '=', 'author.id')
        ->Leftjoin('discount','book.id', '=', 'discount.book_id')
        ->select(
            'book.id',
            'book.book_title', 
            'book.book_price',
            'book.book_cover_photo',
            'category.category_name',
            'author.author_name', 
            DB::raw('avg(review.rating_start) as avg_rating_star'),
            DB::raw('count(review.book_id) as count_review'),
            DB::raw('case
					when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then discount.discount_price
					else book.book_price
					end as final_price'),
            DB::raw('case
                    when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then book.book_price - discount.discount_price
                    else 0
                    end as sub_price'))
        ->when($id !== null, function ($query) use ($id) {
            return $query->where('book.id', $id);
        })
        ->groupBy('book.id',
            'discount.discount_start_date',
            'discount.discount_end_date',
            'discount.discount_price',
            'author.author_name',
            'review.book_id',
            'review.rating_start',
            'category.category_name');
        return $detailBook;
    }

    public static function getFinalBookPrice($bookId){
        $finalBookPrice = Book::leftJoin('discount','discount.book_id', '=', 'book.id')
        ->selectRaw('case
                    when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then discount.discount_price
                    else book.book_price
                    end as final_price')
        ->where('book.id', '=', $bookId)
        ->first()->final_price;
        return $finalBookPrice;
    }
}