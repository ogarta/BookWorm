<?php
namespace App\Repositories;

use App\Models\Review;
use DB;

class ReviewRepository
{

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
                return $query->where('review.rating_start', $request->rating);
            })
            ->orderBy('review.review_date', $request->sort ?? 'desc');

        return $listReview->paginate($request->num_item);
    }

    /**
     * Add review of book.
     *
     * @param  \Illuminate\Http\CreateReviewRequest  $request
     * @return array Details of the newly created book review.
     */
    public function createReview($request)
    {
        $createReview = Review::create([
            'book_id' => $request->id,
            'review_title' => $request->title,
            'review_details' => $request->details,
            'rating_start' => $request->rating_start,
            'review_date' => date('Y-m-d H:i:s'),
        ]);
        return $createReview;
    }

}
