<?php
namespace App\Repositories;
use App\Models\Review;
use DB;
use Validator;

class ReviewRepository{
    public function validateIdBook($id){
        $input = [
            'id' => $id,
        ];
        
        $validator = Validator::make($input,[
            'email' => 'email address',
        ]);
        
        return $validator;
    }
    public function getDetailRating($bookId){
        $listRatingStart = Review::Where('review.book_id',$bookId)
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

        return $listReview->paginate($request->num_item);
    } 

    // create reivew book 
    public function createReview($request){
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