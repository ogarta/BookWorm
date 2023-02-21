<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\IdBookRequest;
use App\Http\Requests\ReviewRequest;
use App\Http\Requests\CreateReviewRequest;
use App\Repositories\ReviewRepository;
use App\Http\Resources\Review\ReviewCollection;
use App\Http\Resources\Review\RatingCollection;
use App\Services\Review\ReviewService;

class ReviewController extends Controller
{
    private ReviewService $reviewService;
    public function __construct(ReviewService $reviewService){
        $this->reviewService=$reviewService;
    }
    
    public function getDetailRating(IdBookRequest $request){
        $listDetailRating =  $this->reviewService->getDetailRating($request->id);
        return response()->json(new RatingCollection($listDetailRating), 200);
    }

    public function getDetailReview(ReviewRequest $request){
        $listDetailReview =  $this->reviewService->getDetailReview($request);
        return response()->json(new ReviewCollection($listDetailReview), 200);
    }

    public function createReview(CreateReviewRequest $request){
        return $this->reviewService->create($request);
    }
}
