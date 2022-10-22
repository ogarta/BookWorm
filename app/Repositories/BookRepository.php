<?php
namespace App\Repositories;

use App\Models\Book;
use DB;
use App\Http\Resources\Book\BookResource;

class BookRepository
{

    /**
     * Get list top discount.
     *
     * @return array top discount
     */
    public function getTopDiscount()
    {
        $listTopDisCount = $this->detailBook()
            ->orderBy('discount_price','DESC')
            ->limit(env('LIMIT_TOP_DISCOUNT'));
        return $listTopDisCount;
    }

    /**
     * Get list top Recommend: most rating star.
     *
     * @return array top discount
     */
    public function getTopRecommend()
    {
        $listTopRecommend = $this->detailBook()
            ->orderBy('avg_rating_star')
            ->orderBy('final_price', 'ASC')
            ->limit(env('LIMIT_TOP_RECOMMEND'));
        return $listTopRecommend;
    }

    /**
     * Get list top Popular: most reviews - total number review of a book and lowest final price.
     *
     * @return array top discount
     */
    public function getTopPopular()
    {
        $listTopPopular = $this->detailBook()
            ->orderBy('count_review', 'DESC')
            ->orderBy('final_price', 'ASC')
            ->limit(env('LIMIT_TOP_POPULAR'));
        return $listTopPopular;
    }

    /**
     * Get Detail Book.
     *
     * @param int $id of book
     * @return query detail book
     */
    public function detailBook($id = null)
    {
        $detailBook = Book::Leftjoin('review', 'book.id', '=', 'review.book_id')
            ->Leftjoin('discount', 'book.id', '=', 'discount.book_id')
            ->select(
                'book.*',
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
                'review.book_id',);
        return $detailBook;
    }

    public static function getFinalBookPrice($bookId)
    {
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
    }

}
