<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\IdBookRequest;
use App\Http\Requests\ReviewRequest;
use App\Http\Requests\CreateReviewRequest;
use App\Repositories\ReviewRepository;
use App\Http\Resources\Review\ReviewCollection;

class ReviewController extends Controller
{
    private ReviewRepository $reviewRepository;
    public function __construct(ReviewRepository $reviewRepository){
        $this->reviewRepository=$reviewRepository;
    }
    
    public function getDetailRating(IdBookRequest $request){
        $listDetailRating =  $this->reviewRepository->getDetailRating($request->id);
        return $listDetailRating->isNotEmpty()? 
        response()->json(["data" =>$listDetailRating], 200) : 
        response()->json(['message' => 'Not Rating For Book'], 404);
    }

    public function getDetailReview(ReviewRequest $request){
        $listDetailReview =  $this->reviewRepository->getDetailReview($request);
        return $listDetailReview->count() !== 0 ? 
        response()->json(new ReviewCollection($listDetailReview), 200) : 
        response()->json(['message' => 'Not found'], 404);
    }

    public function createReview(CreateReviewRequest $request){
        return $this->reviewRepository->createReview($request);
    }
}
