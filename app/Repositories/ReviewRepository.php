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
}