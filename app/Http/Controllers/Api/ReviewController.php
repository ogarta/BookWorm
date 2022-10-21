<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\IdBookRequest;
use App\Http\Requests\ReviewRequest;
use App\Http\Requests\CreateReviewRequest;
use App\Repositories\ReviewRepository;
use App\Http\Resources\ReviewCollection;

class ReviewController extends Controller
{
    private ReviewRepository $reviewRepository;
    public function __construct(ReviewRepository $reviewRepository){
        $this->reviewRepository=$reviewRepository;
    }
    
    public function getDetailRating(IdBookRequest $request){
        $listDetailRating =  $this->reviewRepository->getDetailRating($request->id);
        return response()->json(new ReviewCollection($listDetailRating),200);
    }

    public function getDetailReview(ReviewRequest $request){
        $listDetailReview =  $this->reviewRepository->getDetailReview($request);
        return response()->json(new ReviewCollection($listDetailReview),200);
    }

    public function createReview(CreateReviewRequest $request){
        return $this->reviewRepository->createReview($request);
    }
}
