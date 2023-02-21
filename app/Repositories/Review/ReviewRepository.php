<?php

namespace App\Repositories\Review;

use Illuminate\Support\Facades\DB;
use App\Models\Review;
use App\Repositories\BaseRepository;
use App\Repositories\Review\ReviewRepositoryInterface;

class ReviewRepository extends BaseRepository implements ReviewRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return Review::class;
    }

        /**
     * Get detail a number of rating_start each star.
     *
     * @param  int $id of book
     * @return array of detail rating
     */
    public function getDetailRating($bookId)
    {
        $listRatingStart = Review::Where('review.book_id', $bookId)
            ->select(
                'review.rating_start',
                DB::raw('count(review.rating_start) as count_rating_star'),
            )
            ->groupBy('review.rating_start');
            // dd($listRatingStart->get());
        return $listRatingStart->get();
    }

    /**
     * Get list review by book_id ,filter by rating_star and sort by review date.
     *
     * @param  \Illuminate\Http\ReviewRequest  $request
     * @return array Reviews sorted by ascending descending and filtered by number of stars.
     */
    public function getDetailReview($request)
    {
        $listReview = Review::Where('review.book_id', $request->id)
            ->select(
                'review.rating_start',
                'review.review_title',
                'review.review_details',
                'review.rating_start',
                'review.review_date'
            )
            ->when($request->rating_star !== null, function ($query) use ($request) {
                return $query->where('review.rating_start', '>=' ,$request->rating_star);
            })
            ->orderBy('review.review_date', $request->sort === 'desc' ? 'desc' : 'asc');

        return $listReview->paginate($request->num_item);
    }

    /**
     * Add review of book.
     *
     * @param  \Illuminate\Http\CreateReviewRequest  $request
     * @return array Details of the newly created book review.
     */
}
