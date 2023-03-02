<?php

namespace App\Repositories\Book;

use App\Models\Book;
use App\Models\Review;
use App\Helper\Constant;
use App\Repositories\BaseRepository;
use App\Http\Resources\Book\BookCollection;
use App\Repositories\Book\BookRepositoryInterface;

class BookRepository extends BaseRepository implements BookRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return Book::class;
    }

        /**
     * Get list top discount.
     *
     * @return array top discount
     */
    public function getTopDiscount()
    {
        $listTopDisCount = $this->model->JoinReviewTable(
            null,
            'detail'
        )
            ->JoinDiscountTable()
            ->FinalPrice()
            ->SubPrice()
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
        $listTopRecommend = $this->model->JoinReviewTable(
            null,
            'detail'
        )->JoinDiscountTable()
            ->FinalPrice()
            ->avgRatingStar()
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
        $listTopPopular = $this->model->JoinReviewTable(
            null,
            'detail'
        )->JoinDiscountTable()
            ->FinalPrice()
            ->countReview()
            ->havingRaw('count(review.book_id) > 0')
            ->orderBy('count_review', 'DESC')
            ->orderBy('final_price', 'ASC')
            ->limit(Constant::LIMIT_TOP_POPULAR)
            ->get();
        $listTopPopular = new BookCollection($listTopPopular);
        return $listTopPopular;
    }

    public function getBookDetail($id)
    {
        $bookDetail = $this->model->JoinReviewTable(
            $id,
            'all'
        )->JoinDiscountTable()
            ->FinalPrice()
            ->SubPrice()
            ->countReview()
            ->avgRatingStar()
            ->first();
        return $bookDetail;
    }
}
