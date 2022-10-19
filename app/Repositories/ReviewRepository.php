<?php
namespace App\Repositories;
use App\Models\Review;
use DB;

class ReviewRepository{
    public function getDetailRating($book_id){
        $listRatingStart = Review::Where('review.book_id',$book_id)
        ->select(
            'review.rating_start', 
            DB::raw('count(review.rating_start) as count_rating_star'),
        )
        ->groupBy('review.rating_start');
        return $listRatingStart->get();
    }
    
    // get list review by book_id ,filter by rating_star and sort by review date
    public function getDetailReview($request){
        $listReview = Review::Where('review.book_id',$request->id)
        ->select(
            'review.rating_start',
            'review.review_title',
            'review.review_details',
            'review.rating_start',
            'review.review_date'
        )
        ->when($request->rating_star !== null , function ($query) use ($request) {
            return $query->where('review.rating_start', $request->rating_star);
        })
        ->orderBy('review.review_date',$request->sort ?? 'desc');
        return $listReview->get();
    } 
}