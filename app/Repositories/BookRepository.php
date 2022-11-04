<?php
namespace App\Repositories;

use App\Models\Book;
use App\Models\Review;
use DB;
use App\Http\Resources\Book\BookResource;
use App\Http\Resources\Book\BookCollection;
use App\Helper\Constant;

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
            ->whereNotNull('discount.discount_price')
            ->orderBy('sub_price','DESC')
            ->limit(Constant::LIMIT_TOP_DISCOUNT)
            ->get();
        $listTopDisCount = new BookCollection($listTopDisCount);
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
            ->havingRaw('AVG(rating_start) is not null')
            ->orderBy('avg_rating_star','DESC')
            ->orderBy('final_price', 'ASC')
            ->limit(Constant::LIMIT_TOP_RECOMMEND)
            ->get();
        $listTopRecommend = new BookCollection($listTopRecommend);
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
            ->havingRaw('count(review.book_id) > 0')
            ->orderBy('count_review', 'DESC')
            ->orderBy('final_price', 'ASC')
            ->limit(Constant::LIMIT_TOP_POPULAR)
            ->get();
        $listTopPopular = new BookCollection($listTopPopular);
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
            ->select(
                'book.*',
                'discount.discount_price',)
            ->when($id !== null, function ($query) use ($id) {
                return $query->where('book.id', $id);
            })
            ->groupBy('book.id', 'discount.discount_price');
        
        // Handle join discount table
        $detailBook = Book::joinDiscountTable($detailBook);
        
        // Handle Select specific field
        $detailBook = Book::selecFinalPrice($detailBook);
        $detailBook = Review::selectAvgRatingStar($detailBook);
        $detailBook = Review::selectCountReview($detailBook);
        $detailBook = Book::selectSubPrice($detailBook);
        
        return $detailBook;
    }
}
